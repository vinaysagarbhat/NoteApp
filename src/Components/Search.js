import React from "react";
export function Search({
  handleNoteChange,
  query
}) {
  return <div className="note_search">
    <input type="text" name="query" onChange={handleNoteChange} placeholder="search notes" value={query} />
  </div>;
}
