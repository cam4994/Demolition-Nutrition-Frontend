import React from 'react';

export default class BrandFoods extends React.Component {

    render() {
        const {name, calories, carbs, protein, fat, serving_qty, serving_unit, restaurant, 
            address, city, state, distance, phone, zip} = this.props.food
        return (
            <div className="brandFood">
                <div className="each-brandFood">
                    <h3 className="teal-green">{name}</h3>
                    <span>Serving size: {serving_qty} {serving_unit}</span>
                    <div className="brandNutrition">
                            <span><span className="teal-green">{calories}</span> kcal</span><br/>
                            <span><span className="teal-green">{carbs}</span> g of carbs</span><br/>
                            <span><span className="teal-green">{protein}</span> g of protein</span><br/>
                            <span><span className="teal-green">{fat}</span> g of fat</span>
                    </div>
                    <h4>{restaurant}</h4>
                    <ul>
                        <li>
                        {address}, {city}, {state}, {zip}
                        </li>
                        <li>
                            {parseFloat(distance / 1.6).toPrecision(3)} miles away
                        </li>
                        <li>
                            {phone.replace('+1', '')}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
        