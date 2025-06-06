import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NotesItems from './NotesItems'

export default function Notes() {
  const {notes,addNote} = useContext(NoteContext)
  return (
    <div className="row my-3">
      {notes.map(note =>{
        return <NotesItems key={note._id} note={note} />
      })}
    </div>
  )
}
