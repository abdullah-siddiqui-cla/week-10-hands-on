import { useLocation } from "react-router";

function pageLabel(pathname) {
  if (pathname === "/") return "Home";
  if (pathname === "/menu") return "Menu";
  if (pathname.startsWith("/treat/")) return "Treat detail";
  if (pathname === "/thanks") return "Thank you";
  return "Treat Menu";
}

/** Breadcrumb-style hint using useLocation (no layout wrapper — use inside a page). */
function LocationHint() {
  const { pathname } = useLocation();
  const label = pageLabel(pathname);

  return (
    <p
      className="mb-4 text-xs font-medium uppercase tracking-wide text-amber-800/70"
      aria-live="polite"
    >
      You are here: <span className="text-amber-950">{label}</span>
      <span className="mx-2 text-amber-400">·</span>
      <span className="font-mono text-amber-900/80">{pathname}</span>
    </p>
  );
}

export default LocationHint;
