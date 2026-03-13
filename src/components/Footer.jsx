import React from "react";
import { Mail, Phone, Waves } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner" style={{ padding: "2rem 0", borderTop: "1px solid #e2e8f0", marginTop: "2rem" }}>
        <div>
          <img src={logo} alt="Playa Escondida Vacation Homes" style={{ height: 54, objectFit: "contain", marginBottom: ".5rem" }} />
          <div className="muted">Next-level scaffold with booking, auth, Supabase, Stripe, branded emails, and statements.</div>
        </div>
        <div className="header-actions">
          <span className="inline-actions"><Mail size={16} /> reservations@playaescondidavacationhomes.com</span>
          <span className="inline-actions"><Phone size={16} /> +507 0000-0000</span>
          <span className="inline-actions"><Waves size={16} /> Playa Escondida, Panama</span>
        </div>
      </div>
    </footer>
  );
}
