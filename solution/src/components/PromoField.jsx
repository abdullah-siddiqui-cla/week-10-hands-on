import { useEffect, useRef } from "react";

/**
 * Promo input with useRef + focus on mount (imperative DOM demo).
 */
function PromoField() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex-1">
      <label
        htmlFor="promo-code"
        className="mb-1 block text-xs font-semibold uppercase tracking-wide text-amber-800/80"
      >
        Promo code (demo ref + focus)
      </label>
      <input
        id="promo-code"
        ref={inputRef}
        type="text"
        placeholder="Try BREAK"
        className="w-full rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2 text-sm text-amber-950 outline-none ring-amber-400 focus:ring-2"
        autoComplete="off"
      />
    </div>
  );
}

export default PromoField;
