import { useState } from "react";
import Header from "./components/Header.jsx";
import TreatCard from "./components/TreatCard.jsx";

const TREATS = [
  { id: "brownie", name: "Chocolate Brownie", price: 3.5 },
  { id: "cookie", name: "Lemon Cookie", price: 2.0 },
  { id: "muffin", name: "Berry Muffin", price: 4.25 },
];

function App() {
  const shopTitle = "Treat Menu";
  const shopSubtitle = "Small bites for your break — add what you like below.";

  const [orderCount, setOrderCount] = useState(0);

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
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-50/60 px-4 py-10 text-left md:px-8">
      <div className="mx-auto max-w-3xl">
        <Header title={shopTitle} subtitle={shopSubtitle} />

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

export default App;
