import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../services/propertyService";
import { useLanguage } from "../context/LanguageContext";

export default function ListingsPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) =>
      [p.name, p.category, p.location, ...(p.amenities || [])].join(" ").toLowerCase().includes(query.toLowerCase())
    );
  }, [query, properties]);

  return (
    <section className="section">
      <div className="container">
        <div className="price-row" style={{ alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>{t("listings")}</div>
            <h1 className="page-title" style={{ color: "#0f172a" }}>{t("listings")}</h1>
            <p className="muted" style={{ maxWidth: 760, lineHeight: 1.7 }}>
              This page is already wired to a property service, so moving from mock data to Supabase is straightforward.
            </p>
          </div>
          <div style={{ width: "min(360px, 100%)", position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search listings" style={{ paddingLeft: 42 }} />
          </div>
        </div>

        <div className="module-grid">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
