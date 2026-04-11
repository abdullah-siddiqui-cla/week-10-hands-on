import { Link, useNavigate, useParams } from "react-router";
import LocationHint from "../components/LocationHint.jsx";
import Navigation from "../components/Navigation.jsx";
import PromoField from "../components/PromoField.jsx";
import Timer from "../components/timer/Timer.jsx";
import { PAGE_INNER, PAGE_OUTER } from "../constants/pageFrame.js";
import { getTreatById } from "../data/treats.js";

function TreatDetailPage({ orderCount, setOrderCount }) {
  const { treatId } = useParams();
  const navigate = useNavigate();
  const treat = treatId ? getTreatById(treatId) : undefined;

  function handleAddToOrder() {
    setOrderCount((previous) => previous + 1);
  }

  function handlePlaceOrder() {
    if (!treat) return;
    navigate("/thanks", {
      state: {
        orderCount,
        treatName: treat.name,
      },
    });
  }

  const mainContent = !treat ? (
    <div className="rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-xl font-semibold text-amber-950">Treat not found</h1>
      <p className="mt-2 text-amber-800">
        No treat matches{" "}
        <span className="font-mono">{treatId ?? "(missing)"}</span>.
      </p>
      <Link
        to="/menu"
        className="mt-6 inline-block text-sm font-medium text-amber-700 underline-offset-4 hover:underline"
      >
        Back to menu
      </Link>
    </div>
  ) : (
    <article className="rounded-xl border border-amber-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700/80">
        Treat detail
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-amber-950">
        {treat.name}
      </h1>
      <p className="mt-2 text-lg text-amber-800">${treat.price.toFixed(2)}</p>
      <p className="mt-4 text-amber-900/90">{treat.description}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="cursor-pointer rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition hover:bg-amber-50"
        >
          Back to menu
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cursor-pointer rounded-lg border border-dashed border-amber-300 px-4 py-2 text-sm font-medium text-amber-800/90 transition hover:bg-amber-50"
        >
          Go back (history)
        </button>
        <button
          type="button"
          onClick={handleAddToOrder}
          className="cursor-pointer rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
        >
          Add to order
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="cursor-pointer rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-700"
        >
          Place demo order
        </button>
      </div>
    </article>
  );

  return (
    <div className={PAGE_OUTER}>
      <div className={PAGE_INNER}>
        <LocationHint />

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-amber-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <PromoField />
          <Timer />
        </div>

        <Navigation />

        {mainContent}
      </div>
    </div>
  );
}

export default TreatDetailPage;
