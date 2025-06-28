import React, { useEffect, useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState({ children }) {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // -----------Get all notes from database/mongodb---------------------->
  const getNotes = async () => {
    // API call
    try {
      const response = await fetch(`http://localhost:5000/api/notes/getNotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      setNotes(jsonResponse);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // ---------ADD a note------------------------>
  const addNote = async (title, description, tag) => {
    const data = { title, description, tag };

    try {
      const response = await fetch(`http://localhost:5000/api/notes/addNotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        setNotes([...notes, jsonResponse]); // Add real note from server
      } else {
        console.log("Request status:", response.status);
      }

    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  // ----------DELETE a note------------------------>
  const deleteNote = async (id) => {
    // API call
    try {
      await fetch(`http://localhost:5000/api/notes/deletenotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
// logic
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // -----------EDIT a note------------------------>
  const editNote = async (id, title, description, tag) => {
    const data = { title, description, tag };

    // API call
    try {
      const response = await fetch(`http://localhost:5000/api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
      } else {
        console.error('Error updating note:', response.status);
      }
// logic
      const updatedNotes = notes.map(note =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);

    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, setNotes, editNote, deleteNote, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
}