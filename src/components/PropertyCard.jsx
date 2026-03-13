import React from "react";
import { Link } from "react-router-dom";
import { Bath, BedDouble, MapPin, Star, Users } from "lucide-react";
import { Badge, Button, Card } from "./ui";
import { useLanguage } from "../context/LanguageContext";

export default function PropertyCard({ property }) {
  const { t } = useLanguage();

  return (
    <Card>
      <div className="property-card">
        <img src={property.image} alt={property.name} />
        <div className="meta-row" style={{ marginTop: 16 }}>
          <Badge>{property.category}</Badge>
          <Badge variant="outline">{property.status}</Badge>
        </div>
        <h3 style={{ marginTop: 16, marginBottom: 6 }}>{property.name}</h3>
        <div className="inline-actions muted"><MapPin size={16} /> {property.location}</div>
        <p className="muted" style={{ lineHeight: 1.6 }}>{property.description}</p>
        <div className="metrics-grid" style={{ marginTop: 16 }}>
          <div className="metric-box"><BedDouble size={16} /><div style={{ fontWeight: 700 }}>{property.bedrooms}</div></div>
          <div className="metric-box"><Bath size={16} /><div style={{ fontWeight: 700 }}>{property.bathrooms}</div></div>
          <div className="metric-box"><Users size={16} /><div style={{ fontWeight: 700 }}>{property.guests}</div></div>
          <div className="metric-box"><Star size={16} /><div style={{ fontWeight: 700 }}>{property.rating}</div></div>
        </div>
        <div className="price-row" style={{ marginTop: 20 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>${property.rate}</div>
            <div className="muted" style={{ fontSize: 12 }}>{t("perNight")}</div>
          </div>
          <div className="header-actions">
            <Link to={`/property/${property.slug}`}><Button variant="light">View</Button></Link>
            <Link to={`/booking/${property.slug}`}><Button>Reserve</Button></Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
