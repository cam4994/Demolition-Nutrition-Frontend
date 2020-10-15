import React from 'react';
import Geocode from "react-geocode";
import DisplayBrandFoods from './DisplayBrandFoods';
import Search from './Search';

export default class FoodFinder extends React.Component {

    state = {
        foods: [],
        sortMethod: '',
        sortMacro: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let food = e.target.food.value
        let macrosAmount = e.target.macros_value.value
        let macro = e.target.macro.value
        Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
        Geocode.fromAddress(e.target.address.value).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                this.fetchLocation(lat, lng, food, macrosAmount, macro)
            },
            error => {
                console.error(error);
            }
        );

        e.target.food.value = ''
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
                    "gte": parseInt(macrosAmount) - 20,
                    "lte": parseInt(macrosAmount) + 20
                }
            }
        } else if (macro === "protein") {
            full_nutrients = {
                "203": {
                    "gte": parseInt(macrosAmount) - 10,
                    "lte": parseInt(macrosAmount) + 10
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
                "x-app-id": `${process.env.REACT_APP_NUTRITION_API_ID2}`,
                "x-app-key": `${process.env.REACT_APP_NUTRITION_API_KEY2}`,
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
                console.log(response)
                //Take the locations and the foods from search and take only the needed information
                this.formatFood(response.branded, locations)
            })
    }

    formatFood = (foods, locations) => {
        console.log(foods)
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
        this.setState({ foods: alteredFoods })
    }

    handleChange = (e) => {
        this.setState({ sortMethod: e.target.value })
    }
    handleMacroChange = (e) => {
        this.setState({ sortMacro: e.target.value })
    }

    render() {
        console.log(this.state.foods)
        return (
            <div className="search">
                <h1>Find Food Nearby</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="address" placeholder="Insert Address" />
                    <input type="text" name="food" placeholder="Insert Food" autocomplete="off" />
                    <input type="text" name="macros_value" placeholder={this.state.sortMacro ? this.state.sortMacro : "Select a Macro"} autocomplete="off" />
                    <select name="macro" onChange={this.handleMacroChange}>
                        <option value="" defaultValue hidden>Search by</option>
                        <option value="calories">Calories</option>
                        <option value="carbs">Carbs</option>
                        <option value="protein">Protein</option>
                        <option value="fat">Fat</option>
                    </select>
                    <select name="sort" onChange={this.handleChange}>
                        <option value="" defaultValue hidden>Sort Method</option>
                        <option value="distance">Distance</option>
                        <option value="calories">Calories</option>
                        <option value="carbs">Carbs</option>
                        <option value="protein">Protein</option>
                        <option value="fat">Fat</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
                <div>
                    <DisplayBrandFoods foods={this.state.sortMethod === "distance" ? (
                        this.state.foods.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
                    ) : this.state.sortMethod === "calories" ? (
                            this.state.foods.sort((a, b) => (a.calories > b.calories) ? 1 : -1)
                        ) : this.state.sortMethod === "carbs" ? (
                            this.state.foods.sort((a, b) => (a.carbs > b.carbs) ? 1 : -1)
                        ) : this.state.sortMethod === "protein" ? (
                            this.state.foods.sort((a, b) => (a.protein > b.protein) ? -1 : 1)
                        ) : this.state.sortMethod === "fat" ? (
                            this.state.foods.sort((a, b) => (a.fat > b.fat) ? 1 : -1)
                        ) : this.state.foods} />
                </div>
            </div>
        )
    }
}