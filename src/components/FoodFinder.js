import React from 'react';
import Geocode from "react-geocode";
import DisplayBrandFoods from './DisplayBrandFoods';

export default class FoodFinder extends React.Component {

    state = {
        foods: [], 
        sortMethod: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let food = e.target.food.value
        let calories = e.target.calories.value
        Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`);
        Geocode.fromAddress(e.target.address.value).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                this.fetchLocation(lat, lng, food, calories)
            },
            error => {
                console.error(error);
            }
        );

        e.target.food.value = ''
    }

    fetchLocation = (lat, lng, food, calories) => {
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
                this.fetchFoods(brand_ids, food, calories, response.locations)
            })
    }

    fetchFoods = (brand_ids, food, calories, locations) => {
        let brands = JSON.stringify(brand_ids)
        let upper = parseInt(calories) + 150
        let lower = parseInt(calories) - 150

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
                "full_nutrients": {
                    "208": {
                        "gte": lower,
                        "lte": upper
                    },
                }
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
        console.log(foods)
        let alteredFoods = foods.map(food => {
            let location = locations.find(location => location.brand_id === food.nix_brand_id)
            return {
                name: food.food_name,
                calories: food.nf_calories,
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

    render() {
        console.log(this.state.foods)
        return (
            <div className="search">
                <h1>Find Food Nearby</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="address" placeholder="Insert Address" />
                    <input type="text" name="food" placeholder="Insert Food" />
                    <input type="text" name="calories" placeholder="Calories" />
                    <select name="sort" onChange={this.handleChange}>
                        <option value="" defaultValue hidden>Sort Method</option>
                        <option value="distance">Distance</option>
                        <option value="calories">Calories</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
                    <div>
                        <DisplayBrandFoods foods={this.state.sortMethod === "distance" ? (
                            this.state.foods.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
                        ) : (
                            this.state.foods.sort((a, b) => (a.calories > b.calories) ? 1 : -1)
                        )} />
                    </div>
            </div>
        )
    }
}