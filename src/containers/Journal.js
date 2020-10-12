import React from 'react';
import DatePicker from "react-datepicker";
import FoodModal from '../components/FoodModal'
import MealsTable from '../components/MealsTable.js'
import ExercisesTable from '../components/ExercisesTable'
import ExerciseModal from '../components/ExerciseModal';
import "react-datepicker/dist/react-datepicker.css";

export default class Journal extends React.Component {

    state = {
        startDate: '', 
        journal: '', 
        newEntry: '',
        newWorkout: '',
        meals: [],
        exercises: [],
        workouts: [],
        consumed: '', 
        burned: ''
    }

    componentDidMount() {
        fetch('http://localhost:3001/exercises')
        .then(resp => resp.json())
        .then(exercises => {
          this.setState({exercises})
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // fetch all entries if a journal date is selected or if a new entry is made
        if (prevState.journal !== this.state.journal || prevState.newEntry !== this.state.newEntry || prevState.newWorkout !== this.state.newWorkout) {
            // fetch all entries then calculate the total nutrition 
            this.fetchEntries()
                .then(() => this.calculateNutrition())
            // fetch all workouts then calculate the burned calories
            this.fetchWorkouts()
                .then(() => this.calculateBurnedCalories())
        }
      }

    handleChange = (date) => {
        this.setState({startDate: date})
        // Convert the date to a useable format
        let altered_date = JSON.stringify(date).split('T')[0].slice(1)
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
            calories: Math.round(calories),
            carbs: Math.round(carbs),
            fat: Math.round(fat),
            protein: Math.round(protein)
        }
        this.setState({consumed})
    }

    addWorkout = (exercise_id, duration, calories) => {
        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
                exercise_id, 
                journal_id: this.state.journal.id, 
                duration: parseFloat(duration), 
                calories: parseFloat(calories)
            })
          }

          fetch('http://localhost:3001/workouts', configObj)
            .then(resp => resp.json())
            .then(workout => {
                this.setState({newWorkout: workout})
            })
    }

    fetchWorkouts = () => {
        return fetch(`http://localhost:3001/journals/${this.state.journal.id}/workouts`)
         .then(resp => resp.json())
         .then(workouts => {
             this.setState({ workouts })
         })
     }

    calculateBurnedCalories = () => {
        let burned = 0
        this.state.workouts.forEach(workout => burned = burned + workout.calories)
        this.setState({ burned })
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
                    <h2>Today's Meal Entries</h2>
                    <MealsTable meals={this.state.meals}/>
                </div>
                <ExerciseModal addWorkout={this.addWorkout} user={this.props.user} exercises={this.state.exercises} exerciseNames={this.state.exercises.map(exercise => exercise.name)}/>
                <div className="exercise-table-container">
                    <h2>Today's Workouts</h2>
                    <ExercisesTable workouts={this.state.workouts}/>
                </div>
                <div className="journal-nutrition-summary">
                    <h2>Calories Summary</h2>
                    <span>Consumed: {this.state.consumed.calories}</span><br />
                    <span>Goal: {this.props.userNutrition.calories}</span><br />
                    <span>Burned: {this.state.burned}</span><br />
                    <h2>Macronutrient Summary</h2>
                    <span>Carbs: {this.state.consumed.carbs}</span> 
                    <span> Goal: {this.props.userNutrition.carbs}</span><br />
                    <span>Protein: {this.state.consumed.protein}</span>
                    <span> Goal: {this.props.userNutrition.protein}</span><br />
                    <span>Fat: {this.state.consumed.fat}</span>
                    <span> Goal: {this.props.userNutrition.fat}</span>
                </div>

            </div>
        )
    }
}
