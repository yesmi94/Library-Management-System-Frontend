// components/SearchBar.tsx

import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
}) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder={placeholder}
      className="w-full md:w-1/2 px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

