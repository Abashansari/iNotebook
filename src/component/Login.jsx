import { Try } from '@mui/icons-material'
import React from 'react'

export default function Login() {
  const handleSubmit = async () => {
    try {
      const response = await fetch(`localhost:5000/api/auth/login`,{
        Method:'POST',
        headers:{
          'Content-Type':'application/json'
        }
      })
      const json = await response.json()
      console.log(json)
    } catch (error) {
      console.log({ error: error.message })
    }
  }
  return (
    <div><Form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlfor="exampleInputEmail1" className="Form-label">Email address</label>
        <input type="email" className="Form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="htmlForm-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlfor="exampleInputPassword1" className="Form-label">Password</label>
        <input type="password" className="Form-control" id="exampleInputPassword1" />
      </div>

      <button type="submit" className="btn btn-primary" >Submit</button>
    </Form></div>
  )
}
