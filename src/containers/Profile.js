import React from 'react';

class Profile extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault()
        // Check to see if the weight, bodyfat or goal were altered 
        let weight = !!e.target.weight.value ? parseFloat(e.target.weight.value) : this.props.user.value
        let bodyfat = !!e.target.bodyfat.value ? parseFloat(e.target.bodyfat.value) : this.props.user.bodyfat
        console.log(weight)
        console.log(bodyfat)
        
    }


    render() {
        const {username, sex, weight, height, bodyfat, age, goal, image} = this.props.user
        console.log(goal == "Maintenance")
        const base_calories = sex === "Male" ? 
            parseInt((88.362 + (13.397 * weight / 2.205) + (4.799 * height / 0.394) - (5.677 * age))) 
            : parseInt((447.593 + (9.247 * weight / 2.205) + (3.098 * height / 0.394) - (4.330 * age)))
        let calories
        if (goal === "Weight Loss") {
            calories = base_calories - 500
        } else if (goal === "Maintenance") {
            calories = base_calories
        } else if (goal === "Weight Gain") {
            calories = base_calories + 500
        }
        let protein = parseInt(weight * 0.9)
        let fat = parseInt(calories * 0.25 / 9)
        let carbs = parseInt((calories - (protein * 4) - (fat * 9))/4)

        return (
            <div className="profile-page">
                <h1>Profile</h1>
                <div className="general-information">
                    <h3>General Information</h3>
                    <div className="general-image">
                        <img src="" alt="profile picture" width="500" height="600" />
                    </div>
                    <div className="general-1">
                        <label>Username</label>
                        <input value={username}/>
                        <label>Age</label>
                        <input value={age} />
                    </div>
                    <div className="general-2">
                        <label>Height</label>
                        <input value={height} />
                        <label>Sex</label>
                        <input value={sex} />
                    </div>
                </div>
                <div className="body-type">
                    <h3>Your Body</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label>Weight</label>
                        <input name="weight" placeholder={weight}/> <label>lbs</label><br/>
                        <label>Body Fat Percentage</label>
                        <input name="bodyfat" placeholder={bodyfat} /><label>%</label><br/>
                        <label>Current Goal</label>
                        <select name="goal" id="goal">
                            {goal === "Weight Loss" ? (
                            <option value="Weight Loss" selected>Weight Loss</option>) : (
                            <option value="Weight Loss" >Weight Loss</option>
                            )}
                            {goal === "Maintenance" ? (
                            <option value="Maintenance" selected>Maintenance</option>) : (
                            <option value="Maintenance" >Maintenance</option>
                            )}
                            {goal === "Weight Gain" ? (
                            <option value="Weight Gain" selected>Weight Gain</option>) : (
                            <option value="Maintenance" >Weight Gain</option>
                            )}
                        </select><br />
                        <button type="submit">Update</button>
                    </form>
                </div>
                <div className="nutrition-summary">
                    <h3>Calories and Macronutrient Summary</h3>
                    <label>Daily Calories Goal: {calories} kcal</label>
                    <label>Daily Carbohydrates Goal: {carbs} g</label>
                    <label>Daily Protein Goal: {protein} g</label>
                    <label>Daily Fat Goal: {fat} g</label>
                </div>
                
            </div>
        )
    }
}

export default Profile;

