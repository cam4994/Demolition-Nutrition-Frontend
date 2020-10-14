import React from 'react';

export default class BrandFoods extends React.Component {

    render() {
        const {name, calories, serving_qty, serving_unit, restaurant, 
            address, city, state, distance, phone, zip} = this.props.food
        return (
            <div className="food">
                <h3>{name}</h3>
                <h4>Calories: {calories} kcal in {serving_qty} {serving_unit}</h4>
                <h5>{restaurant}</h5>     
                <h6>{address}, {city}, {state}, {zip}</h6>
                <p>{parseFloat(distance / 1.6).toPrecision(3)} miles away</p>
                <p>Phone Number: {phone}</p>
            </div>
        )
    }
}
        