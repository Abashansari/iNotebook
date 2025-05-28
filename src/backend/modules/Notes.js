import mongoose from 'mongoose'
// import userSchema from './Schema'

const NoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: String,
    description: String,
    tag: String,
    date: { type: Date, default: Date.now }
  });

export default NoteSchema