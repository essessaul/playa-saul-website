import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card } from "../components/ui";
import logo from "../assets/logo.png";
import saulMarketing from "../assets/saul-marketing.jpg";
import { useLanguage } from "../context/LanguageContext";

const saleListings = [
  {
    id: "SALE-AP801",
    name: "Unit AP-801",
    type: "Beachfront Apartment",
    price: "$450,000",
    location: "Playa Escondida Resort & Marina",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    description: "Premium beachfront unit with strong lifestyle appeal and attractive long-term value."
  },
  {
    id: "SALE-VILLA12",
    name: "Villa 12",
    type: "Luxury Villa",
    price: "$895,000",
    location: "Playa Escondida Resort & Marina",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    description: "Spacious villa concept for buyers seeking ownership, privacy, and resort access."
  },
  {
    id: "SALE-PH3",
    name: "Marina Penthouse PH-3",
    type: "Penthouse",
    price: "$1,250,000",
    location: "Playa Escondida Resort & Marina",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    description: "High-end penthouse offering panoramic views and premium positioning for resale or personal use."
  }
];

export default function SaleListingsPage() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <div className="container">
        <div className="brand-banner">
          <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 84, objectFit: "contain" }} />
        </div>

        <div style={{ maxWidth: 840 }}>
          <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>
            {t("forSale")}
          </div>
          <h1 className="page-title" style={{ color: "#0f172a" }}>{t("salesTitle")}</h1>
          <p className="muted" style={{ lineHeight: 1.7 }}>
            {t("salesText")}
          </p>
        </div>

        <div className="marketing-grid" style={{ marginTop: 24, marginBottom: 24 }}>
          <Card>
            <div className="summary-card">
              <span className="ribbon">{t("betterCallSaul")}</span>
              <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>Sales page with personality.</h2>
              <p className="muted" style={{ lineHeight: 1.8 }}>
                This section blends serious real-estate listings with a recognizable direct-sales voice.
              </p>
              <div className="grid" style={{ marginTop: "1rem" }}>
                {[
                  "Direct developer sales positioning",
                  "Broker personality built into the page",
                  "Stronger brand recall for social traffic",
                  "Clearer path from ad to inquiry"
                ].map((item) => (
                  <div key={item} className="metric-box" style={{ textAlign: "left" }}>{item}</div>
                ))}
              </div>
            </div>
          </Card>
          <Card>
            <div className="summary-card">
              <img src={saulMarketing} alt="Saul marketing for sale section" className="marketing-photo" />
            </div>
          </Card>
        </div>

        <div className="module-grid" style={{ marginTop: 24 }}>
          {saleListings.map((item) => (
            <Card key={item.id}>
              <div className="property-card">
                <img src={item.image} alt={item.name} />
                <div className="meta-row" style={{ marginTop: 16 }}>
                  <Badge>{item.type}</Badge>
                  <Badge variant="outline">{t("forSale")}</Badge>
                </div>
                <h3 style={{ marginTop: 16, marginBottom: 6 }}>{item.name}</h3>
                <div className="muted">{item.location}</div>
                <p className="muted" style={{ lineHeight: 1.6 }}>{item.description}</p>
                <div className="price-row" style={{ marginTop: 20 }}>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{item.price}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{t("askingPrice")}</div>
                  </div>
                  <Link to="/leads">
                    <Button>{t("requestInfo")}</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
