import React from 'react';

const LogIn = (props) => {
  return (
    <div className="login mdc-elevation--z8">
      <h2 className="login-title">Log In</h2>
      <form onSubmit={props.logIn}>
        <input placeholder="Username" name="username" /><br />
        <input type="password" placeholder="Password" name="password" /><br />
        <input type="submit" value="Log In" />
      </form>
    </div>
  )
}

export default LogIn

