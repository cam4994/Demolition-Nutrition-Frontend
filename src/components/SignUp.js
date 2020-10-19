import React from 'react';
import '../Styles/signup.css'

const SignUp = (props) => {
  return (
    <div className="signUp">
      <form onSubmit={props.signUp}>
        <h1 className="formTitle">Create Account</h1>
        <div id="username-password">
          <input className="no-outline" type="text" placeholder="Username" name="username" required/><br />
          <input className="no-outline" type="password" placeholder="Enter Password" name="password" required/><br />
          <input className="no-outline" type="password" placeholder="Confirm Password" name="password_confirmation" required/><br />
        </div>
        <div className='user-body-type'>
          <h2>Your Body</h2>
          <label>Weight:</label>{'  '}
          <input className="no-outline" type="text" name="weight" required/> lbs <br/>
          <label>Height: </label>{'  '}
          <select className="no-outline" name="height_ft">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>{'  ft'} 
          <select className="no-outline" name="height_in">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>{'  in'} <br/>
          <label>Age: </label>{'  '}
          <input className="no-outline" type="text" name="age" /><br/>
          <label>Body Fat % (optional): </label>{'  '}
          <input className="no-outline" type="text" name="bodyfat" /><br/> 
          <label>Current Goal: </label>{'  '}
          <select className="no-outline" name="goal" id="goal">
            <option value="" defaultValue hidden>Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Weight Gain">Weight Gain</option>
          </select><br />
          <label>Sex:</label>{'  '}
          <input className="no-outline" type="radio" id="male" name="sex" value="Male" />{'  '}
          <label>Male</label>{'  '}
          <input className="no-outline" type="radio" id="female" name="sex" value="Female" />{'  '}
          <label>Female</label>
          <br />
          <label>Select Image (Optional):</label>{'  '}
          <input className="no-outline" type="file" name="image" accept="image/*" /><br />
        </div><br/>
        <button className="no-outline" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;