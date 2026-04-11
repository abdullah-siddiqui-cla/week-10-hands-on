import { Link, useLocation } from "react-router";
import LocationHint from "../components/LocationHint.jsx";
import Navigation from "../components/Navigation.jsx";
import PromoField from "../components/PromoField.jsx";
import Timer from "../components/timer/Timer.jsx";
import { PAGE_INNER, PAGE_OUTER } from "../constants/pageFrame.js";

function ThanksPage() {
  const location = useLocation();

  console.log(location.pathname);
  const state = location.state;

  const mainContent =
    !state || typeof state.orderCount !== "number" ? (
      <div className="rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-amber-950">
          Nothing to show yet
        </h1>
        <p className="mt-2 text-amber-800">
          Open a treat and use <strong>Place demo order</strong> to land here
          with data in <span className="font-mono">location.state</span>.
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-block text-sm font-medium text-amber-700 underline-offset-4 hover:underline"
        >
          Go to menu
        </Link>
      </div>
    ) : (
      <div className="rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-amber-950">Thanks!</h1>
        <p className="mt-4 text-amber-900/90">
          Your demo order included{" "}
          <strong>
            {state.orderCount} item{state.orderCount === 1 ? "" : "s"}
          </strong>
          {state.treatName ? (
            <>
              {" "}
              (last detail: <strong>{state.treatName}</strong>)
            </>
          ) : null}
          .
        </p>
        <Link
          to="/menu"
          className="mt-8 inline-block rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
        >
          Order more treats
        </Link>
      </div>
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

export default ThanksPage;
