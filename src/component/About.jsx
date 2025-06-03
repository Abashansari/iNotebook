import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


export default function About() {
  const {user} = useContext(NoteContext)
  return (
    <div> This is, {user}</div>
  )
}
