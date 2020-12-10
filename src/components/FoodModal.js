import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Search from './Search'
import FoodDisplay from '../containers/FoodDisplay'
import '../Styles/modal.css'

export default class FoodModal extends React.Component {

    state = {
        modal: false,
        foods: [],
        selectedFood: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            foods: [],
            selectedFood: ''
        })
    }

    foodSearch = (name) => {
        let configObj = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-app-id": `${process.env.REACT_APP_NUTRITION_API_ID}`,
                "x-app-key": `${process.env.REACT_APP_NUTRITION_API_KEY}`,
                "x-remote-user-id": "0",
            }
        }

        fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${name}`, configObj)
            .then(resp => resp.json())
            .then(foods => {
                this.storeFoods(foods.common.slice(0, 3))
            })
    }

    storeFoods = (foods) => {
        let foods_array = []
        foods.forEach(food => {
            this.getNutrition(food)
                .then(newFood => foods_array.push(newFood))
            // let configObj = {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Accept": "application/json",
            //         "x-app-id": `${process.env.REACT_APP_NUTRITION_API_ID}`,
            //         "x-app-key": `${process.env.REACT_APP_NUTRITION_API_KEY}`,
            //         "x-remote-user-id": "0"
            //     },
            //     body: JSON.stringify({
            //         "query": food.food_name
            //     })
            // }

            // fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', configObj)
            //     .then(resp => resp.json())
            //     .then(food => {
            //         let newFood = {
            //             name: food.foods[0].food_name,
            //             serving_qty: food.foods[0].serving_qty,
            //             serving_unit: food.foods[0].serving_unit,
            //             calories: food.foods[0].nf_calories,
            //             protein: food.foods[0].nf_protein,
            //             carbs: food.foods[0].nf_total_carbohydrate,
            //             fat: food.foods[0].nf_total_fat
            //         }
            //         foods_array.push(newFood)
            //     })
        })
        console.log("When does this hit")
        console.log(foods_array)
        this.setState({ foods: foods_array })
    }

    getNutrition = async(eachFood) => {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-app-id": `${process.env.REACT_APP_NUTRITION_API_ID}`,
                "x-app-key": `${process.env.REACT_APP_NUTRITION_API_KEY}`,
                "x-remote-user-id": "0"
            },
            body: JSON.stringify({
                "query": eachFood.food_name
            })
        }

        let resp = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', configObj)
        let food = await resp.json()
        let newFood = {
            name: food.foods[0].food_name,
            serving_qty: food.foods[0].serving_qty,
            serving_unit: food.foods[0].serving_unit,
            calories: food.foods[0].nf_calories,
            protein: food.foods[0].nf_protein,
            carbs: food.foods[0].nf_total_carbohydrate,
            fat: food.foods[0].nf_total_fat
        }
        return newFood
    }

    selectItem = (food) => {
        //Food that was selected from the search feature
        this.setState({ selectedFood: food })
        //Scroll down after selecting to footer where you can select amount of servings and meal type
        setTimeout(()=>{
            let foodModal = document.getElementById('food-modal-footer')
            foodModal.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }, 100)
        
    }

    handleSubmit = (e) => {
        //Once add is clicked on the food modal, this function will trigger
        e.preventDefault()
        this.props.addEntry(this.state.selectedFood, e.target.category.value, e.target.servings.value)
        this.toggle()
    }

    render() {
        return (
            <div className="food-modal">
                <Button id="add-meal-modal-button" onClick={this.toggle}>
                    <i className="fas fa-utensils"></i>{' '}
                Add Meal</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="foodModal">
                    <ModalHeader toggle={this.toggle}>Add Food Entry to Journal</ModalHeader>
                    <ModalBody>
                        <Search foodSearch={this.foodSearch} />
                        <FoodDisplay selectItem={this.selectItem} foods={this.state.foods} />
                    </ModalBody>
                    <ModalFooter>
                        <div id="food-modal-footer" className="food-modal-footer">
                            {this.state.selectedFood !== '' ? (
                                <div>
                                    <h3 className="food-name capitalize">{this.state.selectedFood.name}</h3>
                                    <span>Serving Size: {this.state.selectedFood.serving_qty} {this.state.selectedFood.serving_unit}</span>
                                    <form onSubmit={this.handleSubmit}>
                                        <label>Servings: </label>{'  '}
                                        <input className="no-outline" name="servings"></input><br />
                                        <select className="food-modal-category no-outline" name="category">
                                            <option value="" defaultValue hidden>Select Meal</option>
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                            <option value="Snack">Snack</option>
                                        </select><br />
                                        <Button className="add-button button no-outline" type="submit" color="primary" >Add Meal</Button>
                                    </form>
                                </div>
                            ) : null}
                        </div>
                    </ModalFooter>

                </Modal>
            </div>
        );
    }
}