import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "../components/ui";
import { getPropertyBySlug } from "../services/propertyService";
import { createBooking } from "../services/bookingService";
import { startStripeCheckout } from "../services/paymentService";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

export default function BookingPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    check_in: "",
    check_out: "",
    guests: 2,
    notes: ""
  });
  const [bookingResult, setBookingResult] = useState("");
  const [paymentResult, setPaymentResult] = useState("");

  useEffect(() => {
    getPropertyBySlug(slug).then(setProperty);
  }, [slug]);

  const nights = useMemo(() => 4, []);

  if (!property) {
    return <section className="section"><div className="container">Loading booking...</div></section>;
  }

  const subtotal = property.rate * nights;
  const cleaning = property.cleaning_fee;
  const total = subtotal + cleaning;

  function updateField(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function handleCreateBooking() {
    const result = await createBooking({
      property_slug: property.slug,
      guest_name: `${form.first_name} ${form.last_name}`.trim(),
      guest_email: form.email,
      guest_phone: form.phone,
      check_in: form.check_in,
      check_out: form.check_out,
      guests: Number(form.guests),
      notes: form.notes,
      total_amount: total,
      status: "pending_payment"
    });

    setBookingResult(`Booking draft created: ${result.bookingId}`);
    const payment = await startStripeCheckout({ bookingId: result.bookingId, total });
    setPaymentResult(payment.message);
  }

  return (
    <section className="section">
      <div className="container two-col">
        <Card>
          <div className="summary-card">
            <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 76, objectFit: "contain", marginBottom: "1rem" }} />
            <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>{t("booking")}</div>
            <h1 style={{ marginTop: 12 }}>{t("completeReservation")}</h1>
            <p className="muted">This page now creates a booking draft and prepares the payment step.</p>

            <div className="two-col" style={{ marginTop: 20 }}>
              <input name="first_name" value={form.first_name} onChange={updateField} placeholder={t("firstName")} />
              <input name="last_name" value={form.last_name} onChange={updateField} placeholder={t("lastName")} />
              <input name="email" value={form.email} onChange={updateField} placeholder={t("email")} />
              <input name="phone" value={form.phone} onChange={updateField} placeholder={t("phone")} />
              <input name="check_in" value={form.check_in} onChange={updateField} placeholder={t("checkInDate")} />
              <input name="check_out" value={form.check_out} onChange={updateField} placeholder={t("checkOutDate")} />
              <input name="guests" value={form.guests} onChange={updateField} placeholder={t("guests")} />
              <input placeholder={t("promoCode")} />
            </div>
            <textarea name="notes" value={form.notes} onChange={updateField} placeholder={t("specialRequests")} style={{ marginTop: 16 }} />
            <div className="header-actions" style={{ marginTop: 16 }}>
              <Link to={`/property/${property.slug}`}><Button variant="light">{t("backToProperty")}</Button></Link>
              <Button onClick={handleCreateBooking}>{t("createBookingPayment")}</Button>
            </div>
            {bookingResult ? <p style={{ marginTop: 16, fontWeight: 700 }}>{bookingResult}</p> : null}
            {paymentResult ? <p className="muted" style={{ marginTop: 8 }}>{paymentResult}</p> : null}
          </div>
        </Card>

        <Card>
          <div className="summary-card">
            <h3>{t("reservationSummary")}</h3>
            <div className="inline-actions" style={{ alignItems: "flex-start", marginTop: 18 }}>
              <img src={property.image} alt={property.name} style={{ width: 96, height: 96, borderRadius: 18, objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 700 }}>{property.name}</div>
                <div className="muted" style={{ marginTop: 4 }}>{property.location}</div>
                <div className="muted" style={{ marginTop: 8 }}>{nights} nights • {property.guests} guests max</div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div className="price-row"><span className="muted">{t("accommodation")}</span><span style={{ fontWeight: 600 }}>${subtotal}</span></div>
              <div className="price-row" style={{ marginTop: 10 }}><span className="muted">{t("cleaningFee")}</span><span style={{ fontWeight: 600 }}>${cleaning}</span></div>
              <div className="price-row" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}><span style={{ fontWeight: 700 }}>{t("total")}</span><span style={{ fontWeight: 700, fontSize: 22 }}>${total}</span></div>
            </div>
            <div className="notice" style={{ marginTop: 20 }}>
              When you add your Stripe key, this is ready for the next step: real Checkout Session creation.
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
