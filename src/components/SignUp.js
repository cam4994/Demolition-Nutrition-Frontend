import React from 'react';

const SignUp = (props) => {
  return (
    <div className="signUp">
      <form onSubmit={props.signUp}>
        <h1 className="formTitle">Create Account</h1>
        <input placeholder="Username" name="username" required/><br />
        <input type="password" placeholder="Enter Password" name="password" required/><br />
        <input type="password" placeholder="Confirm Password" name="password_confirmation" required/><br />
        <div className='body-type'>
          <h2>Your Body</h2>
          <label>Weight: </label>
          <input name="weight" required/> lbs <br/>
          <label>Height: </label>
          <select name="height_ft">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>ft 
          <select name="height_in">
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
          </select>in <br/>
          <label>Age: </label>
          <input name="age" /><br/>
          <label>Body Fat % (optional): </label>
          <input name="bodyfat" /><br/> 
          <label>Current Goal: </label>
          <select name="goal" id="goal">
            <option value="" defaultValue hidden>Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Weight Gain">Weight Gain</option>
          </select><br />
          <label>Sex: </label>
          <input type="radio" id="male" name="sex" value="Male" />
          <label>Male</label>
          <input type="radio" id="female" name="sex" value="Female" />
          <label>Female</label>
          <br />
          <label>Select Image (Optional): </label>
          <input type="file" name="image" /><br />
        </div><br/>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}

export default SignUp;