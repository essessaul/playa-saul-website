import React, { useState } from "react";
import { Button, Card } from "../components/ui";
import { createLead } from "../services/leadService";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

const initial = {
  rentals: { name: "", email: "", phone: "", message: "" },
  sales: { name: "", email: "", phone: "", message: "" },
  owners: { name: "", email: "", phone: "", message: "" }
};

export default function LeadCenterPage() {
  const { t } = useLanguage();
  const [forms, setForms] = useState(initial);
  const [status, setStatus] = useState("");

  function update(section, field, value) {
    setForms((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  }

  async function submit(section) {
    const result = await createLead({ pipeline: section, ...forms[section] });
    setStatus(`${section} ${t("leadSaved")}: ${result.leadId}`);
  }

  const blocks = [
    ["rentals", t("vacationRentalInquiry"), "For guests looking to reserve short stays or vacation rentals."],
    ["sales", t("propertyBuyerInquiry"), "For people interested in purchasing units or properties."],
    ["owners", t("ownerServicesInquiry"), "For owners interested in statements, management, and support."]
  ];

  return (
    <section className="section section-white">
      <div className="container">
        <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 70, objectFit: "contain", marginBottom: "1rem" }} />
        <div style={{ maxWidth: 840 }}>
          <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>{t("leads")}</div>
          <h1 className="page-title" style={{ color: "#0f172a" }}>{t("leadCenterTitle")}</h1>
          <p className="muted" style={{ lineHeight: 1.7 }}>This page gives each audience a dedicated pipeline so inquiries are cleaner and easier to follow up.</p>
        </div>

        <div className="lead-grid" style={{ marginTop: "1.5rem" }}>
          {blocks.map(([key, title, text]) => (
            <Card key={key}>
              <div className="summary-card">
                <h3>{title}</h3>
                <p className="muted">{text}</p>
                <div className="grid" style={{ marginTop: "1rem" }}>
                  <input value={forms[key].name} onChange={(e) => update(key, "name", e.target.value)} placeholder={t("fullName")} />
                  <input value={forms[key].email} onChange={(e) => update(key, "email", e.target.value)} placeholder={t("email")} />
                  <input value={forms[key].phone} onChange={(e) => update(key, "phone", e.target.value)} placeholder={t("phone")} />
                  <textarea value={forms[key].message} onChange={(e) => update(key, "message", e.target.value)} placeholder={t("message")} />
                </div>
                <Button style={{ marginTop: "1rem" }} onClick={() => submit(key)}>{t("saveLead")}</Button>
              </div>
            </Card>
          ))}
        </div>

        {status ? <p style={{ marginTop: "1rem", fontWeight: 700 }}>{status}</p> : null}
      </div>
    </section>
  );
}
