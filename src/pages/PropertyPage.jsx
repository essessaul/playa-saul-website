import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Badge, Button, Card } from "../components/ui";
import { getPropertyBySlug } from "../services/propertyService";

export default function PropertyPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    getPropertyBySlug(slug).then(setProperty);
  }, [slug]);

  if (!property) {
    return <section className="section"><div className="container">Loading property...</div></section>;
  }

  return (
    <section className="section">
      <div className="container">
        <Link to="/listings" className="muted">← Back to listings</Link>

        <div className="two-col" style={{ marginTop: 24 }}>
          <Card>
            <div className="property-card">
              <img src={property.image} alt={property.name} style={{ height: 360 }} />
              <div className="meta-row" style={{ marginTop: 16 }}>
                <Badge>{property.category}</Badge>
                <Badge variant="outline">{property.status}</Badge>
                <span className="inline-actions muted"><Star size={16} /> {property.rating} guest rating</span>
              </div>
              <h1 style={{ marginTop: 16 }}>{property.name}</h1>
              <div className="inline-actions muted"><MapPin size={16} /> {property.location}</div>
              <p className="muted" style={{ lineHeight: 1.7 }}>{property.description}</p>
              <div className="metrics-grid">
                <div className="metric-box"><div className="muted">Nightly Rate</div><div style={{ fontWeight: 700, fontSize: 22 }}>${property.rate}</div></div>
                <div className="metric-box"><div className="muted">Cleaning</div><div style={{ fontWeight: 700, fontSize: 22 }}>${property.cleaning_fee}</div></div>
                <div className="metric-box"><div className="muted">Bedrooms</div><div style={{ fontWeight: 700, fontSize: 22 }}>{property.bedrooms}</div></div>
                <div className="metric-box"><div className="muted">Guests</div><div style={{ fontWeight: 700, fontSize: 22 }}>{property.guests}</div></div>
              </div>

              <h3 style={{ marginTop: 24 }}>Amenities</h3>
              <div className="meta-row">
                {property.amenities.map((item) => (
                  <Badge key={item} variant="outline">{item}</Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="summary-card">
              <h3>Reserve this property</h3>
              <p className="muted">Continue to the booking page with this property pre-selected.</p>
              <div className="grid" style={{ marginTop: 20 }}>
                <input placeholder="Check-in" />
                <input placeholder="Check-out" />
                <input placeholder="Guests" />
              </div>
              <div className="notice" style={{ marginTop: 16 }}>
                Next step in production: connect availability checks against the bookings table before confirming dates.
              </div>
              <Link to={`/booking/${property.slug}`}><Button style={{ width: "100%", marginTop: 16 }}>Continue to Booking</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
