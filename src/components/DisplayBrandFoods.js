import React from 'react';
import BrandFoods from './BrandFoods'

export default function DisplayBrandFoods(props) {
    let i = 0;
    return (
        <div className="food-display">
            {props.foods.map(food => {
                i++
                return <BrandFoods key={i} food={food} />
            })}
        </div>
    )
}

