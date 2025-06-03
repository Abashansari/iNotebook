import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

export default function NoteState({ children }) {
    const [user, setUser] = useState("Abash Ansari")

    return (
        <NoteContext.Provider value={{ user, setUser }}>
            {children}
        </NoteContext.Provider>
    )
}