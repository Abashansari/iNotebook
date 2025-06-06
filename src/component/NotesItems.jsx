import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import NoteContext from '../context/notes/NoteContext';

export default function NotesItems({ note }) {

  const {deleteNote,editNote} = useContext(NoteContext)

  return (
    <div className="card" style={{width: "18rem"}}>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <a href="#" className="btn btn-primary">{note.tag}</a>
        <div className="mt-2">
{/* -----------------------------Adding icons--------------------------------------------------------------------------------- */}
          <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={()=>deleteNote(note._id)}/>
          <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: 'pointer' }} onClick={()=> editNote(note._id,note.title,note.description,note.tag)}/>
        </div>
      </div>
    </div>
  );
}
