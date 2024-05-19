// src/components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  term:string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch,term }) => {
  const [value, setValue] = useState(term);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // placeholder="Search movies..."
        className="flex-grow p-2 border rounded-l-lg"
      />
      <button type="submit" className="p-2 bg-blue-600 text-white rounded-r-lg">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
