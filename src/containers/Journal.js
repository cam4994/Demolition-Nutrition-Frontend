import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FoodModal from '../components/FoodModal'

class Journal extends React.Component {

    state = {
        startDate: '', 
        journal: ''
    }

    componentDidMount() {
        // Get the entries and workouts 
    }

    handleChange = (date) => {
        // Convert the date to a useable format
        this.setState({startDate: date})
        let altered_date = JSON.stringify(date).split('T')[0].slice(1)
        // let year = parseInt(altered_date[0])
        // let month = parseInt(altered_date[1])
        // let day = parseInt(altered_date[2])
        this.fetchOrCreateJournal(altered_date)
    }

    fetchOrCreateJournal = (date) => {
        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              date: date,
              user_id: this.props.user.id
            })
          }
          fetch('http://localhost:3001/journals', configObj)
            .then(resp => resp.json())
            .then(journal => {
              console.log(journal) 
              this.setState({journal})
            })
    }

    newEntry = (food, category, servings) => {
        this.createMeal(food)
            .then((meal) => {
                console.log(meal)
                this.createEntry(meal.id, category, parseFloat(servings))
              })
    }

    createMeal = (food) => {
        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              user_id: this.props.user.id, 
              name: food.name, 
              calories: food.calories, 
              carbs: food.carbs, 
              protein: food.protein,
              fat: food.fat
            })
          }
          return fetch('http://localhost:3001/meals', configObj)
            .then(resp => resp.json())
    }

    createEntry = (meal_id, category, servings) => {
        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              meal_id,
              journal_id: this.state.journal.id, 
              category,
              servings
            })
          }

          fetch('http://localhost:3001/entries', configObj)
            .then(resp => resp.json())
            .then(entry => {
              console.log(entry) 
            })
    }

    render() {
        return (
            <div className="journal">
                <h3>Journal Date</h3>
                <div className="calendar">
                    <DatePicker isClearable placeholderText="Select a Journal Date" selected={this.state.startDate} onChange={date => this.handleChange(date)} />
                </div>
                <FoodModal newEntry={this.newEntry}/>
                <div className="meals-table">

                </div>
                <button>Add Exercise</button>
                <div className="exercise-table">

                </div>

            </div>
        )
    }
}

export default Journal;