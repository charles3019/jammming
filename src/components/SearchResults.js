import React from "react";
import TrackList from "./TrackList";


function SearchResults({ searchResults, onAdd, isSearching }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {isSearching ? (
        <div className="loading">Searching...</div>
      ) : searchResults.length > 0 ? (
        <TrackList tracks={searchResults} onAdd={onAdd} />
      ) : (
        <div className="no-results">No results found. Try a different search term.</div>
      )}
    </div>
  );
};

export default SearchResults;
