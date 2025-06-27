import React, { useState } from 'react';

export default function Register() {

  const [credentials, setCredentials] = useState({ userName: "", email: "", password: "", confirmPassword: ""
  });

  const register = async (e) => {

    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      alert("Password did not match! Try again");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: credentials.userName, email: credentials.email, password: credentials.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (json && json.authtoken) {
        localStorage.setItem('token', json.authtoken);
        alert("Congratulations! You have successfully created an account.");
      } else {
        alert("Something went wrong! Try again. kuch vi");
      }
    } catch (error) {
      console.log({ 'Registration error': error.message });
    }
  };


  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]: e.target.value});
  };

  return (
    <div>
      
      <form onSubmit={register}>
        
        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" id="name" name="userName" onChange={onChange}/>
        </div>
      
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
       
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onChange}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
