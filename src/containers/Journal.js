import React from 'react';
import DatePicker from "react-datepicker";
import FoodModal from '../components/FoodModal'
import MealsTable from '../components/MealsTable.js'
import ExercisesTable from '../components/ExercisesTable'
import ExerciseModal from '../components/ExerciseModal';
import MacrosProgress from '../components/MacrosProgress'
import CaloriesProgress from '../components/CaloriesProgress'
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/journal.css'

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
        burned: 0, 
        deleted: false
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        fetch('http://localhost:3001/exercises', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(exercises => {
                this.setState({ exercises })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        // fetch all entries if a journal date is selected or if a new entry is made
        if (prevState.journal !== this.state.journal || prevState.newEntry !== this.state.newEntry || prevState.newWorkout !== this.state.newWorkout || prevState.deleted !== this.state.deleted) {
            // fetch all entries then calculate the total nutrition 
            this.fetchEntries()
                .then(() => this.calculateNutrition())
            // fetch all workouts then calculate the burned calories
            this.fetchWorkouts()
                .then(() => this.calculateBurnedCalories())
        }
    }

    handleChange = (date) => {
        this.setState({ startDate: date })
        // Convert the date to a useable format
        let altered_date = JSON.stringify(date).split('T')[0].slice(1)
        this.fetchOrCreateJournal(altered_date)
    }

    fetchOrCreateJournal = (date) => {
        const token = localStorage.getItem("token")
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                date: date,
                user_id: this.props.user.id
            })
        }
        fetch('http://localhost:3001/journals', configObj)
            .then(resp => resp.json())
            .then(journal => {
                this.setState({ journal })
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
        const token = localStorage.getItem("token")
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
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
        const token = localStorage.getItem("token")
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
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
                this.setState({ newEntry: entry })
            })
    }

    fetchEntries = () => {
        const token = localStorage.getItem("token")
        return fetch(`http://localhost:3001/journals/${this.state.journal.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(entries => {
                this.setState({ meals: entries })
            })
    }

    deleteEntry = (entry) => {
        const token = localStorage.getItem("token")
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(`http://localhost:3001/entries/${entry.entry_id}`, configObj)
        setTimeout(() => {
            this.setState({ deleted: !this.state.deleted })
        }, 100);   
    }

    calculateNutrition = () => {
        let calories, carbs, fat, protein
        calories = carbs = fat = protein = 0
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
        this.setState({ consumed })
    }

    addWorkout = (exercise_id, duration, calories) => {
        const token = localStorage.getItem("token")
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json", 
                "Authorization": `Bearer ${token}`
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
                this.setState({ newWorkout: workout })
            })
    }

    fetchWorkouts = () => {
        const token = localStorage.getItem("token")
        return fetch(`http://localhost:3001/journals/${this.state.journal.id}/workouts`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(workouts => {
                this.setState({ workouts })
            })
    }

    deleteWorkout = (workout) => {
        const token = localStorage.getItem("token")
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(`http://localhost:3001/workouts/${workout.workout_id}`, configObj)
        setTimeout(() => {
            this.setState({ deleted: !this.state.deleted })
        }, 100);   
    }

    calculateBurnedCalories = () => {
        let burned = 0
        this.state.workouts.forEach(workout => burned = burned + workout.calories)
        this.setState({ burned })
    }

    render() {
        // Even with exercise, protein amount remains same. Split burned calories 25% fat 75% carbs and add to goal
        let caloriesGoal = this.props.userNutrition.calories + this.state.burned
        let carbsGoal = this.props.userNutrition.carbs + parseInt(this.state.burned * 0.75 / 4)
        let proteinGoal = this.props.userNutrition.protein
        let fatGoal = this.props.userNutrition.fat + parseInt(this.state.burned * 0.25 / 9)
        return (
            <div className="journal">
                <div className="calendar">
                    <DatePicker isClearable placeholderText="Select a Journal Date" id="calendar-datepicker" className="no-outline" selected={this.state.startDate} onChange={date => this.handleChange(date)} />
                </div>
                {this.state.journal ? (
                    <div className="modal-buttons">
                        <div className="buttons">
                            <FoodModal addEntry={this.addEntry} />
                            <ExerciseModal addWorkout={this.addWorkout} user={this.props.user} exercises={this.state.exercises} exerciseNames={this.state.exercises.map(exercise => exercise.name)} />
                        </div>
                    </div>
                ) : null}
                <div className="meals-table-container">
                    <div className="meals-table gradient-border">
                        <h2 className="meals-table-title">Meal Entries</h2>
                        <MealsTable deleteEntry={this.deleteEntry} meals={this.state.meals} />
                    </div>
                </div>
                <div className="exercise-table-container ">
                    <div className="exercises-table gradient-border">
                        <h2 className="exercises-table-title">Workouts</h2>
                        <ExercisesTable deleteWorkout={this.deleteWorkout} workouts={this.state.workouts} />
                    </div>
                </div>
                {this.state.journal ? (
                    <div className="journal-nutrition-summary">
                        <div className="calories-summary">
                            <h2 id="calories-summary-title">Calories Summary</h2>
                            <span>Target Calories: <span className="teal-green">{caloriesGoal} kcal</span></span><br />
                            <span>Calories Burned: <span className="teal-green">{this.state.burned} kcal</span></span><br />
                            <span>{caloriesGoal >= this.state.consumed.calories ? (
                                `Deficit of ${caloriesGoal - this.state.consumed.calories} kcal`
                            ) : (
                                    `Surplus of ${this.state.consumed.calories - caloriesGoal} kcal`
                                )}</span><br />
                            <CaloriesProgress caloriesGoal={caloriesGoal} consumedCalories={this.state.consumed.calories} />
                        </div>
                        <div className="macros-summary">
                            <h2 id="macros-summary-title" >Macronutrient Summary</h2>
                            <span>Target Carbs: <span className="teal-green">{carbsGoal} g</span></span><br />
                            <span>Target Protein: <span className="teal-green">{proteinGoal} g</span></span><br />
                            <span>Target Fat: <span className="teal-green">{fatGoal} g</span></span>
                            <MacrosProgress carbsGoal={carbsGoal} proteinGoal={proteinGoal} fatGoal={fatGoal} consumed={this.state.consumed} />
                        </div>
                    </div>
                ) : <h3 className="journal-message">Select a Journal date!</h3>}
            </div>
        )
    }
}
