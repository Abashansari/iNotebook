import React, { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState({ children }) {
  const initialNotes = [
    {
      _id: "683fe7fc1484545b5b21ba56",
      user: "683ae0203f23d6a97c2b7dff",
      title: "Love in the Time of Cholera",
      description: "A note about the book.",
      tag: "Book",
      date: "2025-06-04T06:30:20.854Z",
    },
    {
        _id: "683fe7fc1484545b5b21ba57",
        user: "683ae0203f23d6a97c2b7dfg",
        title: " Time of Cholera",
        description: "A note about the book.",
        tag: "Book",
        date: "2025-06-04T06:30:20.854Z",
      },
      {
        _id: "683fe7fc1484545b5b21ba58",
        user: "683ae0203f23d6a97c2b7dfh",
        title: "Love in Test",
        description: "A note about the book.",
        tag: "Book",
        date: "2025-06-04T06:30:20.854Z",
      },
  ];

  const [notes, setNotes] = useState(initialNotes);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
}
