import React, { useContext } from 'react';
import Notes from './Notes';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';

export default function Home() {
  const { note } = useContext(NoteContext)

  return (
    <>
      <Notes />
      <AddNote />

    </>
  )
}