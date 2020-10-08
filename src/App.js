import React from 'react';
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import Search from './components/Search'
import FoodDisplay from './containers/FoodDisplay'
import './App.css';

class App extends React.Component {
  
  state = {
    userId: 0,
    foods: [] 
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
        image: e.target.image.value
      })
    }
    fetch('http://localhost:3001/users', configObj)
      .then(resp => resp.json())
      .then(user => {
        console.log(user)
        this.fetchUser()
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
        
      })
      setTimeout(()=> {
        this.fetchUser()
      }, 1000)
  }

  foodSearch = (name) => {
    // let food = this.state.foods.filter(food => food.name.startsWith(name))
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", 
        "x-app-id": "37aaef45",
        "x-app-key": "6371a284014275be2b901f9bcbe22d94", 
        "x-remote-user-id": "0", 
      }
    }

    fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${name}`, configObj)
      .then(resp => resp.json())
      .then(foods => this.storeFoods(foods.common.slice(0,3)))
  }

  storeFoods = (foods) => {
    let foods_array = []

    foods.forEach(food => {
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
          "x-app-id": "37aaef45",
          "x-app-key": "6371a284014275be2b901f9bcbe22d94",
          "x-remote-user-id": "0" 
        },
        body: JSON.stringify({
          "query": food.food_name
        })
      }
  
      fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', configObj)
        .then(resp => resp.json())
        .then(food => {
          let newFood = {
            name: food.foods[0].food_name, 
            serving_qty: food.foods[0].serving_qty, 
            serving_unit: food.foods[0].serving_unit, 
            calories: food.foods[0].nf_calories, 
            protein: food.foods[0].nf_protein, 
            carbs: food.foods[0].nf_total_carbohydrate, 
            fat: food.foods[0].nf_total_fat
          }
          foods_array.push(newFood)
          })
    })
    setTimeout(()=>this.setState({foods: foods_array}), 900)
  }

  render() { console.log(this.state.foods)
    return (
      <div className="App">
        <Search foodSearch={this.foodSearch}/>
        <FoodDisplay foods={this.state.foods}/>
        <SignUp signUp={this.signUp}/>
        <LogIn logIn={this.logIn}/>
      </div>
    );
  }

}

export default App;
