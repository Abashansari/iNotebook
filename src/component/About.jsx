import React from 'react'
import {NoteState} from '../context/notes/NoteState'

export default function About() {
  const a = NoteState()
  return (
    <div> This is, {a.user}</div>
  )
}
