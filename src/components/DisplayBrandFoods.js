import React from 'react';
import BrandFood from './BrandFood'

export default function DisplayBrandFoods(props) {
    let i = 0;
    return (
        <div className="food-display">
            {props.foods.map(food => {
                i++
                return <BrandFood key={i} food={food} user={props.user}/>
            })}
        </div>
    )
}

