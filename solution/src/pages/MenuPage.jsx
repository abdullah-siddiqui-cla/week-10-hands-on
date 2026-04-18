import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import LocationHint from "../components/LocationHint.jsx";
import Navigation from "../components/Navigation.jsx";
import PromoField from "../components/PromoField.jsx";
import Timer from "../components/timer/Timer.jsx";
import TreatCard from "../components/TreatCard.jsx";
import { PAGE_INNER, PAGE_OUTER } from "../constants/pageFrame.js";
import { useCartStore } from "../store/cartStore.js";

const PRODUCTS_URL = "https://dummyjson.com/products?limit=12";

function MenuPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartCount = useCartStore((s) => s.cartItems.length);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      try {
        const response = await fetch(PRODUCTS_URL);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setProducts(Array.isArray(data.products) ? data.products : []);
        }
      } catch (err) {
        console.error(err);
        alert("Could not load products.");
        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleAddProduct(product) {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
    });
  }

  let orderStatus;
  if (cartCount === 0) {
    orderStatus = (
      <p className="rounded-lg border border-dashed border-amber-300 bg-amber-50/80 px-4 py-3 text-amber-900">
        Your order is empty. Pick a product!
      </p>
    );
  } else if (cartCount === 1) {
    orderStatus = (
      <p className="rounded-lg border border-amber-200 bg-white px-4 py-3 text-amber-950">
        You have ordered <strong>1</strong> item.
      </p>
    );
  } else {
    orderStatus = (
      <p className="rounded-lg border border-amber-200 bg-white px-4 py-3 text-amber-950">
        You have ordered <strong>{cartCount}</strong> items.
      </p>
    );
  }

  const listContent = loading ? (
    <p className="text-amber-800" role="status">
      Loading products…
    </p>
  ) : (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <TreatCard
            treatId={product.id}
            name={product.title}
            price={product.price}
            imageUrl={product.thumbnail}
            onAdd={() => handleAddProduct(product)}
          />
        </li>
      ))}
    </ul>
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

        <Header
          title="Today's menu"
          subtitle="Products load from DummyJSON — add what you like below."
        />

        <section aria-label="Order summary" className="mb-8">
          {orderStatus}
        </section>

        <section aria-label="Product list">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-800/80">
            Products
          </h2>
          {listContent}
        </section>
      </div>
    </div>
  );
}

export default MenuPage;
