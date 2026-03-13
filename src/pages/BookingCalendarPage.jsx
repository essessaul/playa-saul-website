import React, { useEffect, useState } from "react";
import { Card } from "../components/ui";
import { getAvailabilityCalendar } from "../services/calendarService";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

export default function BookingCalendarPage() {
  const { t } = useLanguage();
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    getAvailabilityCalendar().then(setCalendar);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 70, objectFit: "contain", marginBottom: "1rem" }} />
        <div style={{ maxWidth: 840 }}>
          <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>Booking Calendar</div>
          <h1 className="page-title" style={{ color: "#0f172a" }}>{t("bookingCalendarTitle")}</h1>
          <p className="muted" style={{ lineHeight: 1.7 }}>This is the dedicated calendar page that will later be tied to real reservation overlap logic and channel sync.</p>
        </div>

        <Card style={{ marginTop: "1.5rem" }}>
          <div className="summary-card">
            <div className="calendar-grid">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <div key={d} className="calendar-header">{d}</div>)}
              {calendar.map((item) => (
                <div key={item.day} className={`calendar-day ${item.status}`}>{item.day}</div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
