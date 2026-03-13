import React from "react";
import { Briefcase } from "lucide-react";
import StatCard from "../components/StatCard";
import { Card } from "../components/ui";
import { ownerStats } from "../data/mockData";
import InvoicePreview from "../components/InvoicePreview";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

export default function OwnerPortalPage() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <div className="container">
        <div className="brand-banner">
          <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 84, objectFit: "contain" }} />
        </div>
        <div style={{ maxWidth: 760 }}>
          <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>{t("ownerServices")}</div>
          <h1 className="page-title" style={{ color: "#0f172a" }}>{t("ownerTitle")}</h1>
          <p className="muted" style={{ lineHeight: 1.7 }}>{t("ownerText")}</p>
        </div>

        <div className="stat-grid" style={{ marginTop: 24 }}>
          {ownerStats.map((item) => (
            <StatCard key={item.label} icon={Briefcase} title={item.label} value={item.value} />
          ))}
        </div>

        <div className="two-col" style={{ marginTop: 24 }}>
          <InvoicePreview />
          <Card>
            <div className="summary-card">
              <h3>{t("ownerActions")}</h3>
              <div className="grid" style={{ marginTop: 16 }}>
                {["Block owner stay dates","Review reservation history","Download monthly statement","See upcoming guest stays","Request maintenance","View payout history"].map((item) => (
                  <div key={item} className="metric-box" style={{ textAlign: "left" }}>{item}</div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
