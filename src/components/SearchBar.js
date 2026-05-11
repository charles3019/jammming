import React, { useState, useCallback } from "react";

function SearchBar({ onSearch, isSearching }) {
  const [term, setTerm] = useState("");

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;
    onSearch(trimmedTerm);
  }, [onSearch, term]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      search();
    }
  }, [search]);

  return (
    <div className="SearchBar">
      <input
        value={term}
        placeholder="Enter A Song Title"
        onChange={handleTermChange}
        onKeyPress={handleKeyPress}
        disabled={isSearching}
      />
      <button className="SearchButton" onClick={search} disabled={isSearching}>
        {isSearching ? 'Searching...' : 'SEARCH'}
      </button>
    </div>
  );
 
};

export default SearchBar;
