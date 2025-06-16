import React from 'react'
import { Link,useLocation } from 'react-router-dom'


export default function Navbar (){
    let location = useLocation()
    return (
      <>
        <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary ">
          <div className="container-fluid">

            <Link className="navbar-brand" to="">iNoteBook</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item"><Link className={`nav-link ${location.pathname == "/home" ? "active" : ""}`} aria-current="page" to="/">Home</Link></li>
                <li className="nav-item"><Link className={`nav-link ${location.pathname == "/home" ? "active" : ""}`} aria-current="page" to="/about">About</Link></li>
                          
              </ul>
            </div>
          </div>
          <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-dark"><strong>Register</strong></a>
          <Link className="button is-light" to="/login">Sign in</Link>
        </div>
        </div>
    </div>
        </nav>
      </>
    )
  }