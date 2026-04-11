import { Link, useLocation } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
];

function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav
      className="mb-6 flex flex-wrap items-center gap-4 border-b border-amber-200 pb-4"
      aria-label="Main"
    >
      {links.map(({ to, label }) => {
        const isActive =
          to === "/"
            ? pathname === "/"
            : pathname === to || pathname.startsWith(`${to}/`);

        return (
          <Link
            key={to}
            to={to}
            className={`rounded-md px-3 py-2 text-sm font-medium underline-offset-4 transition hover:underline ${
              isActive
                ? "bg-amber-100 text-amber-950"
                : "text-amber-900/80 hover:text-amber-950"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navigation;
