export const properties = [
  {
    id:"PEVH-101",
    slug:"ocean-view-condo-101",
    name:"Ocean View Condo 101",
    category:"Condo",
    location:"Playa Escondida Resort & Marina",
    rate:235,
    cleaning_fee:85,
    bedrooms:2,
    bathrooms:2,
    guests:6,
    rating:4.9,
    status:"Available",
    image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    amenities:["Pool access","Fast Wi‑Fi","Full kitchen","Private balcony","Parking"],
    description:"Bright beachfront residence with resort access, ideal for weekend escapes and mid-length stays."
  },
  {
    id:"PEVH-204",
    slug:"beach-tower-suite-204",
    name:"Beach Tower Suite 204",
    category:"Suite",
    location:"Playa Escondida Resort & Marina",
    rate:310,
    cleaning_fee:95,
    bedrooms:3,
    bathrooms:3,
    guests:8,
    rating:4.8,
    status:"Available",
    image:"https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    amenities:["Oceanfront terrace","Smart TV","Washer/Dryer","Resort pool","Concierge-ready"],
    description:"Spacious premium suite with generous social areas, ideal for families and executive stays."
  }
];

export const reservations = [
  { guest:"M. Gonzalez", property:"Ocean View Condo 101", dates:"Mar 15 – Mar 19", source:"Airbnb", total:"$940", status:"Confirmed" },
  { guest:"A. Levy", property:"Beach Tower Suite 204", dates:"Mar 18 – Mar 24", source:"Direct", total:"$1,860", status:"Paid" }
];

export const ownerStats = [
  { label:"Gross Revenue", value:"$42,860" },
  { label:"Occupancy", value:"74%" },
  { label:"Owner Payouts", value:"$26,300" },
  { label:"Open Tasks", value:"8" }
];
