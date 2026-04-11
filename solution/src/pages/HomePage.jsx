import { Link } from "react-router";
import Header from "../components/Header.jsx";
import LocationHint from "../components/LocationHint.jsx";
import Navigation from "../components/Navigation.jsx";
import PromoField from "../components/PromoField.jsx";
import Timer from "../components/timer/Timer.jsx";
import { PAGE_INNER, PAGE_OUTER } from "../constants/pageFrame.js";

function HomePage() {
  return (
    <div className={PAGE_OUTER}>
      <div className={PAGE_INNER}>
        <LocationHint />

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-amber-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <PromoField />
          <Timer />
        </div>

        <Navigation />

        <Header
          title="Treat Menu"
          subtitle="Welcome — browse seasonal bites without leaving the page."
        />
        <p className="mb-6 text-amber-900/90">
          This is a tiny demo shop. Head to the menu to pick treats, open details
          from each card, and try placing a sample order.
        </p>
        <Link
          to="/menu"
          className="inline-flex rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white underline-offset-4 transition hover:bg-amber-700 hover:underline"
        >
          View today&apos;s treats
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
