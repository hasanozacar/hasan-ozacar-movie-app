// YearFilter component

import React from "react";

interface YearFilterProps {
  onYearFilter: (selectedYear: string) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ onYearFilter }) => {
  const years = Array.from({ length: 2050 - 1930 + 1 }, (_, index) => (1930 + index).toString());

  return (
    <div>
      <label htmlFor="yearFilter" className="block mb-2 font-semibold">
        Select Year:
      </label>
      <select
        name="yearFilter"
        id="yearFilter"
        className="block w-full p-2 border rounded-lg"
        onChange={(e) => onYearFilter(e.target.value)}
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearFilter;
