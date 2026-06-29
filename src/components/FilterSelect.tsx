import type { FilterSelectProps } from "../types/types";

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  >
    <option value="">Select {label}</option>

    {options.map(
      (option) =>
        option && (
          <option key={option} value={option}>
            {option}
          </option>
        ),
    )}
  </select>
);

export default FilterSelect;
