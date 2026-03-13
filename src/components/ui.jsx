import React from "react";

export function Badge({ children, variant = "dark" }) {
  const className = variant === "outline" ? "badge badge-outline" : "badge badge-dark";
  return <span className={className}>{children}</span>;
}

export function Button({ children, variant = "dark", ...props }) {
  const className = variant === "light" ? "btn btn-light" : "btn btn-dark";
  return <button {...props} className={className}>{children}</button>;
}

export function Card({ children, className = "" }) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}
