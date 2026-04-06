function TreatCard({ name, price, onAdd }) {
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-medium text-amber-950">{name}</h2>
        <p className="mt-1 text-sm text-amber-700">{formattedPrice}</p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-auto cursor-pointer rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700 active:bg-amber-800"
      >
        Add to order
      </button>
    </article>
  );
}

export default TreatCard;
