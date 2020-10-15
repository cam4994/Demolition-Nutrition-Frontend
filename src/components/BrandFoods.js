import React from 'react';

export default class BrandFoods extends React.Component {

    render() {
        const {name, calories, carbs, protein, fat, serving_qty, serving_unit, restaurant, 
            address, city, state, distance, phone, zip} = this.props.food
        return (
            <div className="food">
                <h3>{name}</h3>
                <h4>In {serving_qty} {serving_unit}</h4>
                <div className="brandNutrition">
                        <span className="brandCalories">{calories} kcal</span><br/>
                        <span className="brandCarbs"> {carbs}g of carbs</span><br/>
                        <span className="brandProtein"> {protein}g of protein</span><br/>
                        <span className="brandFfat"> {fat}g of fat</span>
                </div>
                <h5>{restaurant}</h5>     
                <h6>{address}, {city}, {state}, {zip}</h6>
                <p>{parseFloat(distance / 1.6).toPrecision(3)} miles away</p>
                <p>Phone Number: {phone}</p>
            </div>
        )
    }
}
        