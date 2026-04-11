import Header from "../components/Header.jsx";
import LocationHint from "../components/LocationHint.jsx";
import Navigation from "../components/Navigation.jsx";
import PromoField from "../components/PromoField.jsx";
import TreatCard from "../components/TreatCard.jsx";
import Timer from "../components/timer/Timer.jsx";
import { PAGE_INNER, PAGE_OUTER } from "../constants/pageFrame.js";
import { TREATS } from "../data/treats.js";

function MenuPage({ orderCount, setOrderCount }) {
  function handleAddTreat() {
    setOrderCount((previous) => previous + 1);
  }

  let orderStatus;
  if (orderCount === 0) {
    orderStatus = (
      <p className="rounded-lg border border-dashed border-amber-300 bg-amber-50/80 px-4 py-3 text-amber-900">
        Your order is empty. Pick a treat!
      </p>
    );
  } else if (orderCount === 1) {
    orderStatus = (
      <p className="rounded-lg border border-amber-200 bg-white px-4 py-3 text-amber-950">
        You have ordered <strong>1</strong> item.
      </p>
    );
  } else {
    orderStatus = (
      <p className="rounded-lg border border-amber-200 bg-white px-4 py-3 text-amber-950">
        You have ordered <strong>{orderCount}</strong> items.
      </p>
    );
  }

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
          title="Today's menu"
          subtitle="Small bites for your break — add what you like below."
        />

        <section aria-label="Order summary" className="mb-8">
          {orderStatus}
        </section>

        <section aria-label="Treat list">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-800/80">
            Today&apos;s treats
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TREATS.map((treat) => (
              <li key={treat.id}>
                <TreatCard
                  treatId={treat.id}
                  name={treat.name}
                  price={treat.price}
                  onAdd={handleAddTreat}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default MenuPage;
