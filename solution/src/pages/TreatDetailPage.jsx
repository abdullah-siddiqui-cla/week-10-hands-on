import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import LocationHint from "../components/LocationHint.jsx";
import Navigation from "../components/Navigation.jsx";
import PromoField from "../components/PromoField.jsx";
import Timer from "../components/timer/Timer.jsx";
import { PAGE_INNER, PAGE_OUTER } from "../constants/pageFrame.js";
import { useCartStore } from "../store/cartStore.js";

function TreatDetailPage() {
  const { treatId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const cartCount = useCartStore((s) => s.cartItems.length);

  useEffect(() => {
    if (!treatId) {
      setProduct(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const url = `https://dummyjson.com/products/${treatId}`;
    // https://dummyjson.com/products/1

    async function load() {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
        alert("Could not load this product.");
        if (!cancelled) {
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [treatId]);

  function handleAddToOrder() {
    if (!product) return;
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
    });
  }

  function handlePlaceOrder() {
    if (!product) return;
    navigate("/thanks", {
      state: {
        orderCount: cartCount,
        treatName: product.title,
      },
    });
  }

  const mainContent = loading ? (
    <p className="text-amber-800" role="status">
      Loading…
    </p>
  ) : product ? (
    <article className="rounded-xl border border-amber-200 bg-white p-8 shadow-sm">
      {product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt=""
          className="mb-4 h-48 w-full max-w-md rounded-lg object-cover"
        />
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-700/80">
        Product detail
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-amber-950">
        {product.title}
      </h1>
      <p className="mt-2 text-lg text-amber-800">
        ${Number(product.price).toFixed(2)}
      </p>
      <p className="mt-4 text-amber-900/90">{product.description}</p>

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
  ) : (
    <div className="rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-xl font-semibold text-amber-950">Product not found</h1>
      <p className="mt-2 text-amber-800">
        No product matches{" "}
        <span className="font-mono">{treatId ?? "(missing)"}</span>.
      </p>
      <Link
        to="/menu"
        className="mt-6 inline-block text-sm font-medium text-amber-700 underline-offset-4 hover:underline"
      >
        Back to menu
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

export default TreatDetailPage;
