import React from 'react';
import Food from '../components/Food'

const FoodDisplay = (props) => {
    console.log(props.foods.length)
    props.foods.forEach(food => console.log(food))
    let i = 0;
    return (
        <div className="food-display">
            {props.foods.map(food => {
                i++
                return <Food key={i} item={food} />
            })}
        </div>
    )
}

export default FoodDisplay;

