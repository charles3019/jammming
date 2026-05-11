import React, { useCallback } from "react";
import TrackList from "./TrackList";

function Playlist({ playlistName, playlistTracks, onNameChange, onRemove, onSave, isSaving }) {
  const handleNameChange = useCallback(
    (event) => {
      onNameChange(event.target.value);
    },
    [onNameChange]
  );

  return (
    <div className="Playlist">
      <h2>Playlist</h2>
      <input value={playlistName} onChange={handleNameChange} placeholder="Enter playlist name" />
      {playlistTracks.length > 0 ? (
        <TrackList
          tracks={playlistTracks}
          isRemoval={true}
          onRemove={onRemove}
        />
      ) : (
        <div className="empty-playlist">Add some tracks to your playlist!</div>
      )}
      <button className="Playlist-save" onClick={onSave} disabled={isSaving || playlistTracks.length === 0}>
        {isSaving ? 'Saving...' : 'SAVE TO SPOTIFY'}
      </button>
    </div>
  );
};

export default Playlist;
