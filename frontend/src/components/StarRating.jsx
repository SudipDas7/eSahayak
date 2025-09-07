import { useState } from "react";

/** Accessible star rating (1–5). */
export default function StarRating({ label, value, onChange }) {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="mb-3">
      <div className="text-sm font-medium text-slate-700 mb-1">{label}</div>
      <div className="flex items-center gap-2">
        {stars.map((n) => {
          const active = (hover || value) >= n;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => onChange?.(n)}
              className="p-0.5"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                className={active ? "fill-amber-400" : "fill-slate-300"}
              >
                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.402 8.168L12 18.896 4.664 23.165l1.402-8.168L.132 9.211l8.2-1.193L12 .587z"/>
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
