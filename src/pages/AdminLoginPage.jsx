import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button, Card } from "../components/ui";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

export default function AdminLoginPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    setBusy(true);
    setStatus("");
    try {
      const user = await signIn({ email, password });
      const role = user?.user_metadata?.role || (user?.email?.includes("owner") ? "owner" : "admin");
      navigate(role === "owner" ? "/owner-services" : "/admin");
    } catch (error) {
      setStatus(error.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "min(460px, 100%)" }}>
          <div className="summary-card">
            <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 72, objectFit: "contain", marginBottom: "1rem" }} />
            <div className="brand-mark" style={{ width: 52, height: 52, borderRadius: 18 }}><Settings size={20} /></div>
            <h1 style={{ marginTop: 18 }}>{t("adminLogin")}</h1>
            <p className="muted">Secure Supabase authentication for master admin, listing manager, sales manager, and owner access.</p>
            <div className="grid" style={{ marginTop: 18 }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("email")} />
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            </div>
            <Button style={{ width: "100%", marginTop: 16 }} onClick={handleLogin} disabled={busy}>
              {busy ? "Signing in..." : t("signIn")}
            </Button>
            {status ? <p style={{ marginTop: 12, color: "#b91c1c", fontWeight: 600 }}>{status}</p> : null}
            <p className="muted" style={{ marginTop: 12, fontSize: 13 }}>
              Use a Supabase user with user_metadata.role set to one of: master_admin, listing_manager, sales_manager, owner.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
