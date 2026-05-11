import React, { useCallback } from "react";
import TrackList from "./TrackList";

function Playlist({ playlistName, playlistTracks, onNameChange, onRemove, onSave }) {
  const handleNameChange = useCallback(
    (event) => {
      onNameChange(event.target.value);
    },
    [onNameChange]
  );

  return (
    <div className="Playlist">
      <h2>Playlist</h2>
      <input value={playlistName} onChange={handleNameChange} />
      <TrackList
        tracks={playlistTracks}
        isRemoval={true}
        onRemove={onRemove}
      />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
