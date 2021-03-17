import React from "react";

import { AddNoteView } from './AddNoteView';
import { NoteView } from './NoteView';
import { Search } from './Search';
export default class Note extends React.Component {
    constructor() {
        super();
        this.state = {
            query: "",
            note: { id: -1, title: "", description: "", isUpdate: false },
            noteArray: [],
        };
    }

    handleNoteChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    mutateNote = (event) => {
        let newNote = this.state.note;
        newNote[event.target.name] = event.target.value;
        this.setState({
            note: newNote,
        });
    };

    handleAddNote = (event) => {
        event.preventDefault();
        if (this.state.note.title !== "" && this.state.note.description !== "") {
            let isDulicate = false;
            this.state.noteArray.forEach((note) => {
                if (note.title === this.state.note.title) {
                    alert("Duplicate Note..!!");
                    isDulicate = true;
                }
            });
            if (!isDulicate) {
                if (this.state.note.isUpdate) {
                    let allNotes = this.state.noteArray;
                    allNotes[this.state.note.id] = this.state.note;
                    this.setState({
                        noteArray: allNotes,
                        note: { id: -1, title: "", description: "", isUpdate: false },
                    });
                } else {
                    let newNote = this.state.note;
                    if (this.state.noteArray.length !== 0) {
                        newNote.id =
                            this.state.noteArray[this.state.noteArray.length - 1].id + 1;
                    } else {
                        newNote.id = 0;
                    }
                    this.setState({ note: newNote }, () => {
                        this.setState({
                            noteArray: [...this.state.noteArray, this.state.note],
                            note: { id: -1, title: "", description: "", isUpdate: false },
                        });
                    });
                }
            } else {
                this.setState({
                    note: { id: -1, title: "", description: "", isUpdate: false },
                });
            }
        }
    };

    handleEdit = (title) => {
        let noteToEdit = null;
        this.state.noteArray.forEach((note) => {
            if (note.title === title) {
                noteToEdit = Object.assign({}, note);
            }
        });

        noteToEdit.isUpdate = true;
        this.setState({
            note: noteToEdit,
        });
    };

    handleDelete = (title) => {
        let allNotes = this.state.noteArray.filter((item) => item.title !== title);
        this.setState({
            noteArray: allNotes,
            note: { id: -1, title: "", description: "", isUpdate: false },
        });
    };

    render() {
        let showingNotes;
        if (this.state.query) {
            showingNotes = this.state.noteArray.filter((note) => {
                if (note.title.includes(this.state.query)) return true;
                return false;
            });
        } else {
            showingNotes = this.state.noteArray;
        }

        return (
            <div className="noteContainer">
                <div>
                    <AddNoteView description={this.state.note.description} title={this.state.note.title} handleAddNote={this.handleAddNote} mutateNote={this.mutateNote} />

                    <Search query={this.state.query} handleNoteChange={this.handleNoteChange} />

                    <div>
                        {this.state.noteArray.length === 0 ? (
                            <h3>No Notes to Display</h3>
                        ) : (
                                <div>
                                    <div className="displayNotes">
                                        {showingNotes.map((element, id) => {
                                            return (
                                                <NoteView key={element.title} element={element} id={id} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}
