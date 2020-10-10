import React from 'react';
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Profile from './containers/Profile'
import Journal from './containers/Journal'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  
  state = {
    user: '',
  }

  componentDidMount() {
    this.fetchUser()
  }

  fetchUser = () => {
    fetch('http://localhost:3001/current')
      .then(resp => resp.json())
      .then(user => console.log(user))
  }

  signUp = (e) => {
    e.preventDefault()
    let height = parseInt(e.target.height_ft.value) * 12 + parseInt(e.target.height_in.value)
    console.log(e.target.image.files)
    let image = URL.createObjectURL(e.target.image.files[0])
 
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        password_confirmation: e.target.password_confirmation.value,
        weight: e.target.weight.value, 
        height: height,
        bodyfat: parseFloat(e.target.bodyfat.value), 
        age: parseInt(e.target.age.value), 
        sex: e.target.sex.value, 
        goal: e.target.goal.value, 
        image: image
      })
    }
    fetch('http://localhost:3001/users', configObj)
      .then(resp => resp.json())
      .then(user => {
        console.log(user)
        this.setState({user})
      })
  }

  logIn = (e) => {
    e.preventDefault()
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      })
    }
    fetch('http://localhost:3001/login', configObj)
      .then(resp => resp.json())
      .then(user => {
        console.log(user) 
        this.setState({user})
      })
  }

  updateUser = (weight, bodyfat, goal) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        weight,
        bodyfat,
        goal
      })
    }

    fetch(`http://localhost:3001/users/${this.state.user.id}`, configObj)
      .then(resp => resp.json())
      .then(user => {
        console.log(user)
        this.setState({user})
      })
  }


  render() { 
    return (
      <div className="App">
        <Journal user={this.state.user}/>
        <Profile user={this.state.user} updateUser={this.updateUser}/>
        <SignUp signUp={this.signUp}/>
        <LogIn logIn={this.logIn}/>
      </div>
    );
  }

}

export default App;
