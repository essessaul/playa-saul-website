import React, { useEffect, useMemo, useState } from "react";
import { Calendar, ClipboardList, DollarSign, LineChart, Briefcase, ShieldCheck } from "lucide-react";
import StatCard from "../components/StatCard";
import { Badge, Button, Card } from "../components/ui";
import { getAvailabilityCalendar } from "../services/calendarService";
import { getLeadPipelines } from "../services/leadService";
import { getDashboardStats, getOwnerPayouts, getReservations, getSalesLeads } from "../services/dashboardService";
import { useAuth } from "../hooks/useAuth";
import InvoicePreview from "../components/InvoicePreview";
import logo from "../assets/logo.png";

function downloadCSV(filename, rows) {
  const headers = Object.keys(rows[0] || {});
  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((h) => `"${String(row[h] ?? "").replaceAll('"', '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const { session } = useAuth();
  const [tab, setTab] = useState("reservations");
  const [calendar, setCalendar] = useState([]);
  const [pipelines, setPipelines] = useState({ rentals: [], sales: [], owners: [] });
  const [reservations, setReservations] = useState([]);
  const [salesRows, setSalesRows] = useState([]);
  const [ownerRows, setOwnerRows] = useState([]);
  const [stats, setStats] = useState({ cards: [] });

  const role = session?.role;

  const roleTabs = {
    master_admin: [["reservations", "Reservations"], ["calendar", "Calendar"], ["pricing", "Pricing"], ["reports", "Reports"], ["operations", "Operations"]],
    listing_manager: [["reservations", "Reservations"], ["calendar", "Calendar"], ["operations", "Operations"]],
    sales_manager: [["sales", "Sales CRM"], ["reports", "Reports"]],
  };

  const tabs = roleTabs[role] || [["reservations", "Reservations"]];

  useEffect(() => {
    async function load() {
      const [calendarData, pipelineData, reservationData, salesData, ownerData, dashboardData] = await Promise.all([
        getAvailabilityCalendar(),
        getLeadPipelines(),
        getReservations(),
        getSalesLeads(),
        getOwnerPayouts(),
        getDashboardStats(role),
      ]);
      setCalendar(calendarData);
      setPipelines(pipelineData);
      setReservations(reservationData);
      setSalesRows(salesData);
      setOwnerRows(ownerData);
      setStats(dashboardData);
    }
    load();
  }, [role]);

  useEffect(() => {
    if (!tabs.find(([key]) => key === tab)) {
      setTab(tabs[0][0]);
    }
  }, [role]);

  const reservationExportRows = useMemo(() => reservations.map((r) => ({
    guest: r.guest,
    property: r.property,
    dates: r.dates,
    source: r.source,
    total: r.total,
    status: r.status,
  })), [reservations]);

  return (
    <section className="section">
      <div className="container">
        <div className="brand-banner">
          <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 84, objectFit: "contain" }} />
        </div>

        <div style={{ maxWidth: 820 }}>
          <div className="muted" style={{ letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontSize: 13 }}>Admin Dashboard</div>
          <h1 className="page-title" style={{ color: "#0f172a" }}>Private management dashboard</h1>
          <p className="muted" style={{ lineHeight: 1.7 }}>
            Signed in as {session?.email || "guest"} — role: {role || "none"}.
          </p>
        </div>

        <div className="stat-grid" style={{ marginTop: 24 }}>
          {(stats.cards || []).map((card, idx) => {
            const icons = [Calendar, DollarSign, LineChart, ClipboardList, Briefcase, ShieldCheck];
            const Icon = icons[idx % icons.length];
            return <StatCard key={card.title} icon={Icon} title={card.title} value={card.value} />;
          })}
        </div>

        <div className="admin-tabs">
          {tabs.map(([key, label]) => (
            <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        {tab === "reservations" && (
          <>
            <div className="header-actions" style={{ marginBottom: 16 }}>
              <Button variant="light" onClick={() => downloadCSV("reservations-export.csv", reservationExportRows)}>Export CSV</Button>
            </div>
            <Card>
              <div className="table-wrap">
                <table className="table">
                  <thead><tr><th>Guest</th><th>Property</th><th>Dates</th><th>Source</th><th>Total</th><th>Status</th></tr></thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r.id || r.guest}>
                        <td>{r.guest}</td>
                        <td>{r.property}</td>
                        <td>{r.dates}</td>
                        <td>{r.source}</td>
                        <td>{r.total}</td>
                        <td><Badge variant="outline">{r.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {tab === "calendar" && (
          <Card>
            <div className="summary-card">
              <div className="calendar-grid">
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <div key={d} className="calendar-header">{d}</div>)}
                {calendar.map((item) => <div key={item.day} className={`calendar-day ${item.status}`}>{item.day}</div>)}
              </div>
            </div>
          </Card>
        )}

        {tab === "pricing" && (
          <div className="four-col">
            {["Base Rate","Weekend Uplift","Holiday Uplift","Weekly Discount"].map((label, index) => (
              <Card key={label}><div className="summary-card"><div className="muted">{label}</div><div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{["$275","+18%","+30%","-10%"][index]}</div></div></Card>
            ))}
          </div>
        )}

        {tab === "reports" && (
          <div className="two-col">
            {role !== "sales_manager" ? (
              <div>
                <div className="header-actions" style={{ marginBottom: 16 }}>
                  <Button variant="light" onClick={() => downloadCSV("owner-payouts.csv", ownerRows)}>Export Owner CSV</Button>
                </div>
                <InvoicePreview />
              </div>
            ) : (
              <Card>
                <div className="summary-card">
                  <h3>Sales Export</h3>
                  <div className="header-actions" style={{ marginTop: 12 }}>
                    <Button variant="light" onClick={() => downloadCSV("sales-export.csv", salesRows)}>Export Sales CSV</Button>
                  </div>
                  <div className="grid" style={{ marginTop: 16 }}>
                    {salesRows.map((row) => (
                      <div key={row.id || row.lead} className="metric-box" style={{ textAlign: "left" }}>
                        <strong>{row.lead}</strong><br />
                        {row.stage} • {row.budget} • {row.interest}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="summary-card">
                <h3>Report modules</h3>
                <div className="grid" style={{ marginTop: "1rem" }}>
                  {(role === "sales_manager"
                    ? ["Sales funnel", "Buyer response time", "Campaign source", "Property interest"]
                    : ["Revenue by Property","Occupancy","Booking Source Mix","Owner Statements","Tax summary","Payout schedule"]
                  ).map((label) => <div key={label} className="metric-box" style={{ textAlign: "left" }}>{label}</div>)}
                </div>
              </div>
            </Card>
          </div>
        )}

        {tab === "operations" && (
          role === "listing_manager" ? (
            <div className="three-col">
              {["Listing quality control","Photo and copy updates","Availability checks"].map((label) => (
                <Card key={label}><div className="summary-card"><h3>{label}</h3><p className="muted">Listing manager tools for property content and inventory readiness.</p></div></Card>
              ))}
            </div>
          ) : (
            <div className="crm-grid">
              <Card><div className="summary-card"><h3>Rental Pipeline</h3><div className="grid" style={{ marginTop: "1rem" }}>{pipelines.rentals.map((s) => <div key={s} className="metric-box" style={{ textAlign: "left" }}>{s}</div>)}</div></div></Card>
              <Card><div className="summary-card"><h3>Sales Pipeline</h3><div className="grid" style={{ marginTop: "1rem" }}>{pipelines.sales.map((s) => <div key={s} className="metric-box" style={{ textAlign: "left" }}>{s}</div>)}</div></div></Card>
              <Card><div className="summary-card"><h3>Owner Pipeline</h3><div className="grid" style={{ marginTop: "1rem" }}>{pipelines.owners.map((s) => <div key={s} className="metric-box" style={{ textAlign: "left" }}>{s}</div>)}</div></div></Card>
            </div>
          )
        )}

        {tab === "sales" && (
          <>
            <div className="header-actions" style={{ marginBottom: 16 }}>
              <Button variant="light" onClick={() => downloadCSV("sales-manager-export.csv", salesRows)}>Export CSV</Button>
            </div>
            <div className="three-col">
              {salesRows.map((row) => (
                <Card key={row.id || row.lead}>
                  <div className="summary-card">
                    <h3>{row.lead}</h3>
                    <p className="muted">{row.stage}</p>
                    <p><strong>{row.budget}</strong></p>
                    <p className="muted">{row.interest}</p>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
