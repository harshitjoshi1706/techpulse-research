import React from "react";
function SearchBar({ value, onChange, placeholder = 'Search articles by title' }) {
  return (
    <label className="search-bar">
      <span className="sr-only">Search articles</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export default SearchBar;
