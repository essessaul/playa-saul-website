import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "./ui";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const { session, loading, signOut } = useAuth();

  async function handleLogout() {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  }

  const role = session?.role;

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to="/" className="brand">
          <img src={logo} alt="Playa Escondida Vacation Homes" className="logo-image" />
        </Link>

        <nav className="nav-links">
          <NavLink to="/">{t("home")}</NavLink>
          <NavLink to="/listings">{t("listings")}</NavLink>
          <NavLink to="/for-sale">{t("forSale")}</NavLink>
          <NavLink to="/leads">{t("leads")}</NavLink>
          {!loading && (role === "owner" || role === "master_admin") ? (
            <NavLink to="/owner-services">{t("ownerServices")}</NavLink>
          ) : null}
          {!loading && ["master_admin", "listing_manager", "sales_manager"].includes(role) ? (
            <NavLink to="/admin">{t("admin")}</NavLink>
          ) : null}
        </nav>

        <div className="header-actions">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{ width: 130 }}
            aria-label={t("language")}
          >
            <option value="en">{t("english")}</option>
            <option value="es">{t("spanish")}</option>
          </select>

          {!loading && !session ? (
            <Link to="/admin/login"><Button variant="light">{t("adminLogin")}</Button></Link>
          ) : null}

          {!loading && session ? (
            <Button variant="light" onClick={handleLogout}>Logout</Button>
          ) : null}

          <Link to="/listings"><Button>{t("bookNow")}</Button></Link>
        </div>
      </div>
    </header>
  );
}
