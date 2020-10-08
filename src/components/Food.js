import React from 'react';

class Food extends React.Component {

    state = {
        showNutrition: false
    }

    handleClick = () => {
        this.setState({showNutrition: !this.state.showNutrition})
    }
    render() {
        let food = this.props.item
        return (
            <div className="food">
                <h3>{food.name}</h3>
                <span>Serving Size: {food.serving_qty} {food.serving_unit} </span>
                <button onClick={this.handleClick}>{this.state.showNutrition ? "Hide Nutrition" : "View Nutrition"}</button>
                {this.state.showNutrition ? (
                    <div className="nutrition">
                        <span className="calories">{food.calories} kcal</span><br/>
                        <span className="carbs"> {food.carbs}g of carbs</span><br/>
                        <span className="protein"> {food.protein}g of protein</span><br/>
                        <span className="fat"> {food.fat}g of fat</span>
                    </div>
                ): null}
            </div>
        )
    }
}

export default Food;

