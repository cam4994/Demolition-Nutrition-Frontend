import React from 'react';
import Food from '../components/Food'

export default function FoodDisplay(props) {
    let i = 0;
    return (
        <div className="food-display">
            {props.foods.map(food => {
                i++
                return <Food key={i} item={food} selectItem={props.selectItem} />
            })}
        </div>
    )
}

