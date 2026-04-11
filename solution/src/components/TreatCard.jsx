import { Link } from "react-router";

function TreatCard({ treatId, name, price, onAdd }) {
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-medium text-amber-950">{name}</h2>
        <p className="mt-1 text-sm text-amber-700">{formattedPrice}</p>
      </div>
      <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-center">
        <Link
          to={`/treat/${treatId}`}
          className="inline-flex justify-center rounded-lg border border-amber-300 bg-amber-50/80 px-4 py-2 text-center text-sm font-medium text-amber-900 underline-offset-4 transition hover:bg-amber-100 hover:underline"
        >
          View details
        </Link>
        <button
          type="button"
          onClick={onAdd}
          className="cursor-pointer rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700 active:bg-amber-800"
        >
          Add to order
        </button>
      </div>
    </article>
  );
}

export default TreatCard;
