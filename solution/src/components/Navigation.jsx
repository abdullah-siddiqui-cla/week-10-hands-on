import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";
import { useCartStore } from "../store/cartStore.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/login", label: "Log in" },
  { to: "/signup", label: "Sign up" },
];

function Navigation() {
  const { pathname } = useLocation();
  const { isLoggedIn, userName, logout } = useContext(AuthContext);
  const cartCount = useCartStore((s) => s.cartItems.length);

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
      <span className="text-sm text-amber-800" aria-live="polite">
        Cart: <strong>{cartCount}</strong>
      </span>
      {isLoggedIn ? (
        <span className="flex flex-wrap items-center gap-2 text-sm text-amber-900">
          <span>
            Hi, <strong>{userName}</strong>
          </span>
          <button
            type="button"
            onClick={logout}
            className="cursor-pointer rounded-md border border-amber-300 px-2 py-1 text-amber-900 hover:bg-amber-50"
          >
            Log out
          </button>
        </span>
      ) : null}
    </nav>
  );
}

export default Navigation;
