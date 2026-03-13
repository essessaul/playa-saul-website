import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList, CreditCard, Link2, Search, Settings, UserCircle2 } from "lucide-react";
import { Badge, Button, Card } from "../components/ui";
import logo from "../assets/logo.png";
import saulMarketing from "../assets/saul-marketing.jpg";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  const quickTabs = [
    [t("listings"), "/listings", t("vacationRentalInquiry")],
    [t("forSale"), "/for-sale", t("propertyBuyerInquiry")],
    [t("ownerServices"), "/owner-services", t("ownerServicesInquiry")],
  ];

  const modules = [
    [Search, t("listings"), "Searchable guest-ready inventory.", "/listings"],
    [CreditCard, "Booking + Payment", "Booking draft creation with payment scaffold.", "/listings"],
    [Settings, t("admin"), "Reservations, pricing, reporting, and operations.", "/admin"],
    [UserCircle2, t("ownerServices"), "Statements, payouts, and owner support.", "/owner-services"],
    [Link2, "Supabase Layer", "Ready to switch from mock data to live tables.", "/admin"],
    [ClipboardList, "Operations", "Housekeeping, maintenance, and workflow.", "/admin"]
  ];

  return (
    <>
      <section className="hero section">
        <div className="container hero-grid">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="brand-banner">
              <img src={logo} alt="Playa Escondida Vacation Homes" />
            </div>
            <Badge>{t("directBookings")}</Badge>
            <h1 className="page-title">{t("heroTitle")}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, maxWidth: 760 }}>
              {t("heroText")}
            </p>
            <div className="header-actions" style={{ marginTop: 24 }}>
              <Link to="/listings"><Button variant="light">{t("exploreListings")}</Button></Link>
              <Link to="/admin"><Button>{t("openDashboard")}</Button></Link>
            </div>
          </motion.div>

          <Card>
            <div className="module-card">
              <div className="muted">{t("mainSections")}</div>
              <h3>{t("threeLinesTitle")}</h3>
              <div className="grid" style={{ marginTop: 20 }}>
                {[
                  t("listings"),
                  t("forSale"),
                  t("ownerServices"),
                  "CRM",
                  "Bilingual"
                ].map((item) => (
                  <div key={item} className="metric-box" style={{ textAlign: "left" }}>
                    <span className="inline-actions"><CheckCircle2 size={16} /> {item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 860, marginBottom: "1.5rem" }}>
            <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>{t("mainSections")}</div>
            <h2 style={{ fontSize: "2rem", margin: ".5rem 0 1rem" }}>{t("threeLinesTitle")}</h2>
            <p className="muted" style={{ lineHeight: 1.7 }}>{t("threeLinesText")}</p>
          </div>
          <div className="three-col" style={{ marginBottom: "2rem" }}>
            {quickTabs.map(([title, link, text]) => (
              <Card key={title}>
                <div className="module-card">
                  <h3>{title}</h3>
                  <p className="muted" style={{ lineHeight: 1.6 }}>{text}</p>
                  <Link to={link}><Button variant="light">{t("openSection")}</Button></Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container two-col">
          <Card>
            <div className="summary-card">
              <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>Saul Mascot Section</div>
              <h2 style={{ fontSize: "2.2rem", margin: ".75rem 0 1rem" }}>A funnier front page with a floating Saul vibe.</h2>
              <p className="muted" style={{ lineHeight: 1.8 }}>
                This section keeps the site memorable and more personal while still supporting rentals, sales, and owner services.
              </p>
              <div className="kpi-strip">
                <div className="metric-box"><strong>{t("listings")}</strong><div className="small-note">Guest inquiries</div></div>
                <div className="metric-box"><strong>{t("forSale")}</strong><div className="small-note">Buyer pipeline</div></div>
                <div className="metric-box"><strong>{t("ownerServices")}</strong><div className="small-note">Owner support</div></div>
                <div className="metric-box"><strong>CRM</strong><div className="small-note">{t("leads")}</div></div>
              </div>
              <div className="header-actions" style={{ marginTop: "1.25rem" }}>
                <Link to="/leads"><Button>{t("leads")}</Button></Link>
                <Link to="/booking-calendar"><Button variant="light">Booking Calendar</Button></Link>
              </div>
            </div>
          </Card>

          <div className="mascot-wrap">
            <span className="mascot-badge">{t("betterCallSaul")}</span>
            <Card className="mascot-card">
              <img src={saulMarketing} alt="Saul mascot" className="mascot-image" />
              <div className="funny-bubble">Need rentals, sales, or owner help?</div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container module-grid">
          {modules.map(([Icon, title, text, link]) => (
            <Card key={title}>
              <div className="module-card">
                <div className="brand-mark" style={{ width: 48, height: 48, borderRadius: 18 }}><Icon size={20} /></div>
                <h3 style={{ marginTop: 20 }}>{title}</h3>
                <p className="muted" style={{ lineHeight: 1.6 }}>{text}</p>
                <Link to={link}><Button variant="light">{t("openSection")}</Button></Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
