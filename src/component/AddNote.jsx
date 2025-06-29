import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote() {
  const { addNote } = useContext(NoteContext)

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault();              // prevent form reload
    addNote(note.title, note.description, note.tag);
  }
  //  Validation conditions
  const isValid = note.title.trim().length >= 3 && note.description.trim().length >= 5

  return (
    <div className="container my-4">
      <h2>✍️ Add a Note</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" value={note.title} placeholder="Enter note title" onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={note.description} placeholder="Enter note description" onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input type="text" className="form-control" name="tag" value={note.tag} placeholder="Enter tag" onChange={onChange}
          />
        </div>

        {/*  Validation Message */}
        {!isValid && (
          <div className="text-danger">
            REMINDER : Title must be at least 3 characters and description at least 5 characters.
          </div>
        )}
        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={!isValid}>Add Note</button>
      </form>
    </div>
  )
}
