import { Password } from '@mui/icons-material'
import React, { useState } from 'react'

export default function Register() {

  const [credentials, setCredentials] = useState({userName:"", email:"", password:"",confirmPassword:""})

  const register = async ()=>{
    try {
      const response = await fetch(`http://localhost:5000/api/auth/createUser`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({userName:credentials.name, email:credentials.email, password:credentials.password})
      })
      const json = response.json()
      console.log(json)
      if(json){
        localStorage.setItem('token',auth-token)
        alert("Congratuation you have successfully created account")
      }else{
        alert("Something went wrong ! Try again.")
      }
    } catch (error) {
      console.log({error:error.message})
    }
  }
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <form onSubmit={register}>
      <div className="mb-3">
    <label forhtml="name" className="form-label">User Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='userName'onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label forhtml="Email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email'onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label forhtml="Password" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password'onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label forhtml="ConfirmPassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='confirmPassword'onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
