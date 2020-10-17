import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import '../Styles/modal.css'
import 'react-datepicker/dist/react-datepicker.css';
export default class BrandFoodModal extends React.Component {

    state = {
        modal: false,
        startDate: '', 
        journal: ''
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
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
              this.setState({ journal })
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.addEntry(e.target.category.value, e.target.servings.value)
        this.props.successMessage()
        this.toggle()
    }

    addEntry = (category, servings) => {
        // Need to create a meal before an entry can be created
        this.createMeal(this.props.food)
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

    render() {
        return (
            <div className="brand-food-modal">
                <Button className="add-brand-meal-button" onClick={this.toggle}>
                <i class="fas fa-utensils"></i>{' '}
                Add Meal</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="brandFoodModal">
                    <ModalHeader toggle={this.toggle}>Add Food Entry to Journal</ModalHeader>
                    <ModalBody>
                        <DatePicker isClearable placeholderText="Select a Journal Date" selected={this.state.startDate} onChange={date => this.handleChange(date)} />
                        <div>
                            <h3>{this.props.food.name}</h3>
                            <span>Serving Size: {this.props.food.serving_qty} {this.props.food.serving_unit}</span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <form onSubmit={this.handleSubmit}>
                            <select className="no-outline" name="category">
                                <option value="" defaultValue hidden>Select Meal</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select><br/>
                            <label>Servings: </label>{' '}
                            <input name="servings"></input><br/>
                            <button className="no-outline button" type="submit" >Add</button>
                        </form>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}