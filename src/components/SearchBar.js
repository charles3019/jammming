import React, { useState, useCallback } from "react";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;
    onSearch(trimmedTerm);
  }, [onSearch, term]);

  return (
    <div className="SearchBar">
      <input
        value={term}
        placeholder="Enter A Song Title"
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
 
};

export default SearchBar;
