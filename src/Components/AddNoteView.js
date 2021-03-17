import React from "react";
export function AddNoteView({
  mutateNote,
  handleAddNote,
  title,
  description
}) {
  return <form onSubmit={handleAddNote}>
    <input type="text" placeholder="title" name="title" value={title} onChange={mutateNote} />
    <textarea name="description" placeholder="description" onChange={mutateNote} value={description} />
    <button onClick={handleAddNote}>Add note</button>
  </form>;
}
