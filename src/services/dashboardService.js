import { supabase } from "../lib/supabaseClient";
import { reservations as mockReservations } from "../data/mockData";

export async function getReservations() {
  if (supabase) {
    const { data, error } = await supabase
      .from("bookings")
      .select("id, guest_name, property_slug, check_in, check_out, total_amount, status, created_at")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length) {
      return data.map((row) => ({
        id: row.id,
        guest: row.guest_name || "Guest",
        property: row.property_slug || "Property",
        dates: row.check_in && row.check_out ? `${row.check_in} → ${row.check_out}` : "Dates pending",
        source: "Direct",
        total: row.total_amount != null ? `$${row.total_amount}` : "$0",
        status: row.status || "pending"
      }));
    }
  }

  return mockReservations.map((r, index) => ({
    id: `mock-${index}`,
    guest: r.guest,
    property: r.property,
    dates: r.dates,
    source: r.source,
    total: r.total,
    status: r.status
  }));
}

export async function getSalesLeads() {
  if (supabase) {
    const { data, error } = await supabase
      .from("sales_leads")
      .select("id, full_name, stage, budget, property_interest, created_at")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length) {
      return data.map((row) => ({
        id: row.id,
        lead: row.full_name || "Lead",
        stage: row.stage || "New",
        budget: row.budget || "$0",
        interest: row.property_interest || "Not specified"
      }));
    }
  }

  return [
    { id: "sale-1", lead: "Beach Buyer 1", stage: "Contacted", budget: "$450,000", interest: "Unit AP-801" },
    { id: "sale-2", lead: "Investor 2", stage: "Site Visit", budget: "$1,250,000", interest: "Marina Penthouse PH-3" },
  ];
}

export async function getOwnerPayouts() {
  if (supabase) {
    const { data, error } = await supabase
      .from("owner_payouts")
      .select("id, owner_name, statement_month, gross_bookings, owner_payout, created_at")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length) {
      return data.map((row) => ({
        id: row.id,
        owner: row.owner_name || "Owner",
        month: row.statement_month || "Current Month",
        gross: row.gross_bookings != null ? `$${row.gross_bookings}` : "$0",
        payout: row.owner_payout != null ? `$${row.owner_payout}` : "$0"
      }));
    }
  }

  return [
    { id: "owner-1", owner: "Owner A", month: "March 2026", gross: "$18,420", payout: "$14,537" },
    { id: "owner-2", owner: "Owner B", month: "March 2026", gross: "$12,100", payout: "$9,630" },
  ];
}

export async function getDashboardStats(role = "master_admin") {
  const reservations = await getReservations();
  const salesLeads = await getSalesLeads();

  if (role === "sales_manager") {
    return {
      cards: [
        { title: "Sales Leads", value: String(salesLeads.length || 0) },
        { title: "Qualified Buyers", value: String(salesLeads.filter((x) => ["Qualified", "Site Visit", "Negotiation"].includes(x.stage)).length || 0) },
        { title: "Pipeline Value", value: salesLeads[0]?.budget || "$0" },
        { title: "Hot Deals", value: String(salesLeads.filter((x) => ["Negotiation", "Site Visit"].includes(x.stage)).length || 0) },
      ]
    };
  }

  return {
    cards: [
      { title: "Upcoming Arrivals", value: String(reservations.length || 0) },
      { title: "Pending Payments", value: reservations.find((x) => (x.status || "").toLowerCase().includes("pending"))?.total || "$0" },
      { title: "Reservations", value: String(reservations.length || 0) },
      { title: "Open Tasks", value: "8" },
    ]
  };
}
