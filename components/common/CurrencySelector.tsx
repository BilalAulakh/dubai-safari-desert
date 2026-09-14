"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setCurrency, SupportedCurrency } from "@/lib/redux/slices/uiSlice";
import { DollarSign } from "lucide-react";

export default function CurrencySelector() {
  const dispatch = useAppDispatch();
  const currentCurrency = useAppSelector((state) => state.ui.currency);

  const currencies: SupportedCurrency[] = ["AED", "USD", "EUR", "GBP", "SAR"];

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentCurrency}
        onChange={(e) => dispatch(setCurrency(e.target.value as SupportedCurrency))}
        aria-label="Select display currency"
        className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer uppercase transition-colors"
      >
        {currencies.map((c) => (
          <option key={c} value={c} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
