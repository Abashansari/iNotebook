import React, { useState } from 'react';

export default function Register() {

  const [credentials, setCredentials] = useState({
    userName: "", email: "", password: "", confirmPassword: ""
  });

  const register = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: credentials.userName,
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (json && json.authtoken) {
        localStorage.setItem('token', json.authtoken);
        alert("🎉 Account created successfully!");
      } else {
        alert("❌ Something went wrong! Please try again.");
      }
    } catch (error) {
      console.log({ 'Registration error': error.message });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-11 col-md-9 col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="text-center text-primary mb-2">myNoteBook</h2>
              <p className="text-center text-muted mb-4">Your notes on cloud ☁️</p>
              <p className="text-center mb-4">New to myNotebook? 👉 <h2 className="text-center text-primary fw-bold fs-3">Create a new account below</h2></p>

              <form onSubmit={register}>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">User Name</label>
                  <input type="text" className="form-control" id="name" name="userName" onChange={onChange} required placeholder="Enter your username"/>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" name="email" onChange={onChange} required placeholder="Enter your email"/>
                  <div className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" onChange={onChange} required placeholder="Enter password"/>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onChange} required placeholder="Re-enter password"/>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>

                <div className="text-center mt-3">
                  <a href="/login" className="text-decoration-none">
                    Already have an account? <u>Login</u>
                  </a>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
