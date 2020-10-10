import React from 'react';
import DatePicker from "react-datepicker";
import FoodModal from '../components/FoodModal'
import MealsTable from '../components/MealsTable.js'
import "react-datepicker/dist/react-datepicker.css";

class Journal extends React.Component {

    state = {
        startDate: '', 
        journal: '', 
        newEntry: '',
        meals: [],
        consumed: '', 

    }

    componentDidUpdate(prevProps, prevState) {
        // fetch all entries if a journal date is selected or if a new entry is made
        if (prevState.journal !== this.state.journal || prevState.newEntry !== this.state.newEntry) {
   
            // fetch all entries then calculate the total nutrition 
            this.fetchEntries()
                .then(() => this.calculateNutrition())
        }
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

    addEntry = (food, category, servings) => {
        // Need to create a meal before an entry can be created
        this.createMeal(food)
            .then((meal) => {
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
              this.setState({newEntry: entry})
            })
    }

    fetchEntries = () => {
       return fetch(`http://localhost:3001/journals/${this.state.journal.id}`)
        .then(resp => resp.json())
        .then(entries => {
            console.log(entries)
            this.setState({ meals: entries})
        })
    }

    calculateNutrition = () => {
        let calories, carbs, fat, protein
        calories = carbs = fat = protein  = 0
        this.state.meals.forEach(meal => {
            calories = calories + (meal.calories * meal.servings)
            carbs = carbs + (meal.carbs * meal.servings)
            fat = fat + (meal.fat * meal.servings)
            protein = protein + (meal.protein * meal.servings)
        })
        // Total consumed calories, carbs, fat and protein saved to state
        let consumed = {
            calories: parseInt(calories),
            carbs: parseInt(carbs),
            fat: parseInt(fat),
            protein: parseInt(protein)
        }
        this.setState({consumed})
    }

    render() {
        return (
            <div className="journal">
                <h3>Journal Date</h3>
                <div className="calendar">
                    <DatePicker isClearable placeholderText="Select a Journal Date" selected={this.state.startDate} onChange={date => this.handleChange(date)} />
                </div>
                <FoodModal addEntry={this.addEntry}/>
                <div className="meals-table-container">
                    <MealsTable meals={this.state.meals}/>
                </div>
                <button>Add Exercise</button>
                <div className="exercise-table">

                </div>
                <div className="journal-nutrition-summary">
                    <h2>Calories Summary</h2>
                    <span>Consumed: {this.state.consumed.calories}</span><br />
                    <h2>Macronutrient Summary</h2>
                    <span>Carbs: {this.state.consumed.carbs}</span><br />
                    <span>Protein: {this.state.consumed.protein}</span><br />
                    <span>Fat: {this.state.consumed.fat}</span>
                </div>

            </div>
        )
    }
}

export default Journal;