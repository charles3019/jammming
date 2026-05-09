import React, { useCallback } from "react";
import Tracklist from "./Tracklist";

function PlayList(props) {
  const handleNameChange = useCallback(
    (event) => {
      props.onNameChange(event.target.value);
    },
    [props.onNameChange]
  );

  return (
    <div className="Playlist">
      <h2>Playlist</h2>
      <input onChange={handleNameChange} defaultValue={"New Playlist"} />
      <Tracklist
        tracks={props.playlistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      <button className="Playlist-save" onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default PlayList;
