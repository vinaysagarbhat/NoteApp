import React from "react";
export function NoteView({
  element,
  id,
  handleEdit,
  handleDelete
}) {
  return <div className="singleRow">
    <span className="crop"> {element.title} </span>
    <span className="small green" onClick={event => handleEdit(element.title, id)}>Edit</span>
    <span className="small red" onClick={event => handleDelete(element.title)}>Delete</span>
  </div>;
}
