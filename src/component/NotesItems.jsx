import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function NotesItems({ note }) {
  return (
    <div className="card" style={{width: "18rem"}}>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <a href="#" className="btn btn-primary">{note.tag}</a>
        <div className="mt-2">
{/* -----------------------------Adding icons--------------------------------------------------------------------------------- */}
          <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', marginRight: '10px' }} />
          <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
}
