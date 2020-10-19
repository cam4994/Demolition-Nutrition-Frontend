import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const LogIn = (props) => {
  return (
    <div className="login">
      <h2 className="login-title">Log In</h2>
      <form onSubmit={props.logIn}>
        <input className="no-outline" placeholder="Username" name="username" autocomplete="no" /><br />
        <input className="no-outline" type="password" placeholder="Password" name="password" /><br />
        <button id="login-button" className="no-outline" type="submit">Log In</button>
      </form>
      {props.error ? <p style={{color:'red'}}>{props.error}</p> : null}
      <p>Not a member?</p>
      <button id="login-signup-button"><Nav.Link as={Link} to="/signup">Sign Up</Nav.Link></button>
    </div>
  )
}

export default LogIn

