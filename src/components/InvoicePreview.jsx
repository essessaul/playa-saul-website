import React from "react";
import logo from "../assets/logo.png";
import { Card } from "./ui";

export default function InvoicePreview() {
  return (
    <Card>
      <div className="summary-card">
        <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 68, objectFit: "contain", marginBottom: "1rem" }} />
        <h3>Owner Statement / Invoice Preview</h3>
        <div className="price-row" style={{ marginTop: "1rem" }}><span className="muted">Gross bookings</span><strong>$18,420</strong></div>
        <div className="price-row" style={{ marginTop: ".75rem" }}><span className="muted">Management fee</span><strong>$2,763</strong></div>
        <div className="price-row" style={{ marginTop: ".75rem" }}><span className="muted">Cleaning / ops</span><strong>$1,120</strong></div>
        <div className="price-row" style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e2e8f0" }}><span><strong>Owner payout</strong></span><strong>$14,537</strong></div>
      </div>
    </Card>
  );
}
