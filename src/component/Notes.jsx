import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NotesItems from './NotesItems';
import { useNavigate } from 'react-router-dom';

export default function Notes() {

  const Navigate = useNavigate()
  const { notes, getNotes, editNote } = useContext(NoteContext);

  const [note, setNote] = useState({ id: '', title: '', description: '', tag: '' });

  const modalOpenRef = useRef(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes(); // fetch notes from backend on mount
    }else{
      Navigate('/login')
    }
    
  },[getNotes,Navigate]);
  

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag
    });

    // open Bootstrap modal via hidden button
    modalOpenRef.current?.click();
  };

  const handleClickEdit = () => {
    editNote(note.id, note.title, note.description, note.tag);

    // setTimeout(()=>{
    //   setNote({ id: '', title: '', description: '', tag: '' }); //  reset form
    // },3000)
     };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  //  Validation conditions
  const isValid = note.title.trim().length >= 3 && note.description.trim().length >= 5

  return (
    <>
      {/* Hidden button to open Bootstrap modal */}
      <button ref={modalOpenRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">Open Modal</button>

      {/*--------------Display Notes list in Screen------------------------------------------ */}
      <div className="row my-3">
        {notes.map((noteItem) => (
          <NotesItems key={noteItem._id} note={noteItem} updateNote={updateNote} />
        ))}
      </div>

      {/* Edit Note Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <input type="text" className="form-control my-2" name="title" value={note.title} onChange={onChange} placeholder="Title"/>
              <textarea className="form-control my-2" name="description" value={note.description} onChange={onChange} placeholder="Description"/>
              <input type="text" className="form-control my-2" name="tag" value={note.tag} onChange={onChange} placeholder="Tag"/>
              {/*  Validation Message */}
              {!isValid && (
                <div className="text-danger">
                  Title must be at least 3 characters and description at least 5 characters.
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleClickEdit} data-bs-dismiss="modal" disabled={!isValid}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
