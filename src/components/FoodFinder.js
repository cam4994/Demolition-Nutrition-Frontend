import React from 'react';
import Geocode from "react-geocode";
import DisplayBrandFoods from './DisplayBrandFoods';
import '../Styles/foodfinder.css'

export default class FoodFinder extends React.Component {

    state = {
        foods: [],
        sortMethod: '',
        sortMacro: '', 
        showSort: false, 
        message: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.message !== this.state.message) {
            let title = document.querySelector('.find-food-title')
            title.scrollIntoView({behavior: "auto", block: "start", inline: "nearest"});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let food = e.target.food.value,
        macrosAmount = e.target.macros_value.value,
        macro = e.target.macro.value
        Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
        Geocode.fromAddress(e.target.address.value).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.fetchLocation(lat, lng, food, macrosAmount, macro)
            },
            error => {
                console.error(error);
            }
        );
        e.target.food.value = ''
        e.target.macro.value = ''
        e.target.macros_value.value = ''
    }

    fetchLocation = (lat, lng, food, macrosAmount, macro) => {
        let configObj = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-app-id": `${process.env.REACT_APP_NUTRITION_API_ID2}`,
                "x-app-key": `${process.env.REACT_APP_NUTRITION_API_KEY2}`,
                "x-remote-user-id": "0"
            },
        }

        fetch(`https://trackapi.nutritionix.com/v2/locations/?ll=${lat + ',' + lng}&distance=30km&limit=15`, configObj)
            .then(resp => resp.json())
            .then(response => {
                let brand_ids = response.locations.map(location => location.brand_id)
                this.fetchFoods(brand_ids, food, response.locations, macrosAmount, macro)
            })
    }

    fetchFoods = (brand_ids, food, locations, macrosAmount, macro) => {
        let brands = JSON.stringify(brand_ids)
        let full_nutrients
        if (macro === "calories") {
            full_nutrients = {
                "208": {
                    "gte": parseInt(macrosAmount) - 100,
                    "lte": parseInt(macrosAmount) + 100
                }
            }
        } else if (macro === "carbs") {
            full_nutrients = {
                "205": {
                    "gte": parseInt(macrosAmount) - 15,
                    "lte": parseInt(macrosAmount) + 15
                }
            }
        } else if (macro === "protein") {
            full_nutrients = {
                "203": {
                    "gte": parseInt(macrosAmount) - 15,
                    "lte": parseInt(macrosAmount) + 15
                }
            } 
        } else if (macro === "fat") {
            full_nutrients = {
                "204": {
                    "gte": parseInt(macrosAmount) - 15,
                    "lte": parseInt(macrosAmount) + 15
                }
            }
        }
        // in case no macro choice is entered in Search, default to search calories between 200 and 1500
        if (!macrosAmount) {
            full_nutrients = {
                "208": {
                    "gte": 200,
                    "lte": 1500
                }
            }
        } 
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "x-app-id": `${process.env.REACT_APP_NUTRITION_API_ID3}`,
                "x-app-key": `${process.env.REACT_APP_NUTRITION_API_KEY3}`,
            },
            body: JSON.stringify({
                "query": food,
                "common": false,
                "self": false,
                "branded": true,
                "brand_ids": brands,
                "detailed": true,
                "full_nutrients": full_nutrients
            })
        }

        fetch('https://trackapi.nutritionix.com/v2/search/instant', configObj)
            .then(resp => resp.json())
            .then(response => {
                //Take the locations and the foods from search and take only the needed information
                this.formatFood(response.branded, locations)
            })
    }

    formatFood = (foods, locations) => {
        let alteredFoods = foods.map(food => {
            let location = locations.find(location => location.brand_id === food.nix_brand_id)
            return {
                name: food.food_name,
                calories: food.nf_calories,
                carbs: food.full_nutrients.find(n => n.attr_id === 205).value, 
                protein: food.full_nutrients.find(n => n.attr_id === 203).value,
                fat: food.full_nutrients.find(n => n.attr_id === 204).value,
                serving_qty: food.serving_qty,
                serving_unit: food.serving_unit,
                restaurant: food.brand_name,
                address: location.address,
                city: location.city,
                state: location.state,
                distance: location.distance_km,
                phone: location.phone,
                zip: location.zip
            }
        })
        this.setState({ 
            foods: alteredFoods, 
            showSort: true, 
            message: ''
        })
    }

    handleChange = (e) => {
        this.setState({ sortMethod: e.target.value })
    }
    handleMacroChange = (e) => {
        this.setState({ sortMacro: e.target.value })
    }

    successMessage = (food, date) => {
        let altered_date = JSON.stringify(date).split('T')[0].slice(1)
        let message = `${food.name} added to ${altered_date} journal as a meal entry.`
        this.setState({ 
            foods: [],
            message
         })
    }

    render() {
        return (
            <div className="find-food">
                <h1 className="find-food-title">Find Food Nearby</h1>
                <form className="find-food-form" onSubmit={this.handleSubmit}>
                    <input className="no-outline" type="text" name="address" placeholder="Insert Address" autocomplete="off" required /><br/>
                    <input className="no-outline" type="text" name="food" placeholder="Insert Food" autocomplete="off" required /><br/>
                    <select className="no-outline" name="macro" onChange={this.handleMacroChange}>
                        <option value="" defaultValue hidden>Search by</option>
                        <option value="calories">Calories</option>
                        <option value="carbs">Carbs</option>
                        <option value="protein">Protein</option>
                        <option value="fat">Fat</option>
                    </select><br/>
                    <input className="no-outline" type="text" name="macros_value" placeholder={this.state.sortMacro ? `Amount of ${this.state.sortMacro}` : "Macro Target"} autocomplete="off" /><br/>
                    <button className="no-outline" type="submit">Search</button>
                </form>
                <div className="find-food-description">
                    <h2>Instructions</h2>
                    <ul>
                        <li>Search nearby foods by entering an address and a food type, with an option to put constraints on your search.</li>
                        <li>You may select between calories, carbs, protein and fat and specify the amount you are seeking to eat.</li>
                        <li>If a calorie amount is entered, the results will display all foods +/- 100 kcal.</li>
                        <li>If a carb, protein or fat amount is entered, the results will display all foods +/- 15 g of the selected macronutrient.</li>
                        <li>You can sort the results based on ascending calories, carbs and fat or descending protein.</li>
                    </ul>
                </div>
                {this.state.message ? <h3 className="teal-green food-success-message">{this.state.message}</h3> : null }
                {this.state.foods.length === 0 && this.state.showSort && !this.state.message ? (
                    <h2 className="display-brand-error" style={{color:'red'}}>Sorry, no matches found.</h2>
                    ) : this.state.showSort && this.state.foods.length > 0 ? (
                    <div className="display-brand-foods">
                        <select className="food-sort no-outline" name="sort" onChange={this.handleChange}>
                            <option value="" defaultValue hidden>Sort Method</option>
                            <option value="distance">Distance</option>
                            <option value="calories">Calories</option>
                            <option value="carbs">Carbs</option>
                            <option value="protein">Protein</option>
                            <option value="fat">Fat</option>
                        </select>
                        <DisplayBrandFoods successMessage={this.successMessage} user={this.props.user} foods={this.state.sortMethod === "distance" ? (
                            this.state.foods.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
                        ) : this.state.sortMethod === "calories" ? (
                                this.state.foods.sort((a, b) => (a.calories > b.calories) ? 1 : -1)
                            ) : this.state.sortMethod === "carbs" ? (
                                this.state.foods.sort((a, b) => (a.carbs > b.carbs) ? 1 : -1)
                            ) : this.state.sortMethod === "protein" ? (
                                // protein is sorted from highest to lowest
                                this.state.foods.sort((a, b) => (a.protein > b.protein) ? -1 : 1)
                            ) : this.state.sortMethod === "fat" ? (
                                this.state.foods.sort((a, b) => (a.fat > b.fat) ? 1 : -1)
                            ) : this.state.foods} />
                    </div>
                ) : null}
            </div>
        )
    }
}