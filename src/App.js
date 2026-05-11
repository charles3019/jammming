import React, { useState, useCallback } from "react";
import './css/App.css';

import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Spotify from "./util/Spotify";

function App() {
	const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback((term) => {
    setIsSearching(true);
    setError(null);
    Spotify.search(term).then((results) => {
      setSearchResults(results);
      setIsSearching(false);
    }).catch((err) => {
      console.error('Search error:', err);
      setError('Failed to search. Please try again.');
      setIsSearching(false);
    });
  }, []);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    if (!playlistName.trim() || playlistTracks.length === 0) {
      setError('Please enter a playlist name and add some tracks.');
      return;
    }

    setIsSaving(true);
    setError(null);
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
      setIsSaving(false);
      alert('Playlist saved successfully!');
    }).catch((err) => {
      console.error('Save error:', err);
      setError('Failed to save playlist. Please check your Spotify connection.');
      setIsSaving(false);
    });
  }, [playlistName, playlistTracks]);

  return (
    
    <div className="App">
      
      <header className="Header">
        <h1>Jammming</h1>
      </header>
      <div className="Banner">
        <p>YOUR FAVOURITE SONG PALACE</p>
        
      </div>
      <div className="SearchBar">
      <SearchBar onSearch={search} isSearching={isSearching} />
      {error && <div className="error-message">{error}</div>}
        
        
        </div>

      <div className="main-content">
        
        <SearchResults searchResults={searchResults} onAdd={addTrack} isSearching={isSearching} />
        <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
            isSaving={isSaving}
          />

      </div>

      <footer className="Footer">
        <p>Charles Agyemang</p>
      </footer>
    </div>

  );
}

export default App;
