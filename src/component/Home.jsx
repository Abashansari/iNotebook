import React, { useContext } from 'react';
import Notes from './Notes';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';

export default function Home() {
  const { note } = useContext(NoteContext);

  return (
    <>
      {/* Welcome Section */}
      <div className="container mt-6">
        <div className="box has-background-light p-6 has-shadow">
          <h1 className="title is-2 has-text-primary">myNoteBook</h1>
          <h3 className="subtitle is-5 has-text-grey-dark">
            Your notebook on cloud ☁️ – safe and secure
          </h3>
          <p className="mb-5">
            An online web platform where you can create, edit, upload, and delete your notes/information privately and securely without any disturbance.
            For more info, you can check out our <a href="/about" className="has-text-link">About Page</a>.
          </p>

          <AddNote />
        </div>
      </div>

      <div className="container mt-6">
        <div className="box has-background-white-ter p-5 has-shadow">
          <h2 className="title is-4 has-text-dark has-text-weight-semibold mb-4">
            📝 Your Notes :
          </h2>

          <Notes />
        </div>
      </div>
    </>
  );
}
