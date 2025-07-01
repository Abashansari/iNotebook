import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      })

      const json = await response.json()
      console.log(json)

      if (json && json.authtoken) {
        localStorage.setItem("token", json.authtoken)
        navigate('/')
      } else {
        alert("Invalid Credentials")
      }

    } catch (error) {
      console.log({ error: error.message })
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="text-center text-primary mb-2">myNoteBook</h2>
              <p className="text-center text-muted mb-4">Your notes on cloud ☁️</p>
              <p className="text-center mb-4">Login to continue using <h2 className="text-center text-primary fw-bold fs-3">myNoteBook</h2> 😊</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange} placeholder="Enter your email" required/>
                  <div className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} placeholder="Enter your password" required/>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>

                <div className="text-center mt-3">
                  <a href="/register" className="text-decoration-none">
                    Don’t have an account? <u>Sign Up</u>
                  </a>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
