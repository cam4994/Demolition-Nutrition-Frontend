import React from 'react';
import '../Styles/profile.css'

export default class Profile extends React.Component {

    state = {
        updated: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.updated !== this.state.updated) {
            let form = document.querySelector('.profile-form')
            let p = document.createElement('p')
            p.textContent = "Update Successful"
            p.setAttribute('class', 'teal-green profile-success-message')
            form.append(p)
            this.fade(p)
      }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ updated: !this.state.updated })
        // Check to see if the weight, bodyfat or goal were altered 
        let weight = !!e.target.weight.value ? parseFloat(e.target.weight.value) : this.props.user.value
        let bodyfat = !!e.target.bodyfat.value ? parseFloat(e.target.bodyfat.value) : this.props.user.bodyfat
        let goal = e.target.goal.value !== this.props.user.goal ? e.target.goal.value : this.props.user.goal
        this.props.updateUser(weight, bodyfat, goal)

    }

    fade = (element) => {
        // initial opacity
        let opac = 1
        let fadeTimer = setInterval(function () {
            if (opac <= 0.1) {
                clearInterval(fadeTimer);
                element.style.display = 'none';
            }
            element.style.opacity = opac;
            element.style.filter = 'alpha(opacity=' + opac * 100 + ")";
            opac -= opac * 0.1;
        }, 90);
    }

    render() {
        const { calories, carbs, protein, fat } = this.props.userNutrition
        const { username, sex, weight, height, bodyfat, age, goal} = this.props.user
        return (
            <div className="profile-page">
                <h1 className="profile-title">Profile</h1>
                <div className="whole-profile">
                    <div className="general-information">
                        <h3 className="general-information-title">General Information</h3>
                        <label className="label-1 teal-green">Username </label>{' '}
                        <input className="input-1 no-outline" value={username} readOnly />
                        <label className="label-2 teal-green">Age </label>{' '}
                        <input className="input-2 no-outline" value={age} readOnly />
                        <label className="label-3 teal-green">Height </label>{' '}
                        <input className="input-3 no-outline" value={`${Math.floor(height/12)}' ${height % 12}"`} readOnly />
                        <label className="label-4 teal-green">Sex </label>{' '}
                        <input className="input-4 no-outline" value={sex} readOnly />
                    </div>
                    <div className="body-type">
                        <h3>Your Body</h3>
                        <form className="profile-form" onSubmit={this.handleSubmit}>
                            <label className="form-1 teal-green">Weight</label>
                            <input className="form-2 no-outline" name="weight" placeholder={`${weight} lbs`} autocomplete="off" />
                            <label className="form-3 teal-green">Body Fat Percentage</label>
                            <input className="form-4 no-outline" name="bodyfat" placeholder={`${bodyfat} %`} autocomplete="off" />
                            <label className="form-5">Current Goal</label>
                            <select className="form-6 no-outline" name="goal" >
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
                                        <option value="Weight Gain" >Weight Gain</option>
                                    )}
                            </select><br />
                            <button className="form-7 no-outline" type="submit">Update</button>
                        </form>
                    </div>
                    <div className="nutrition-summary">
                        <h3>Calories and Macronutrient Summary</h3>
                        <label className="macros-calories">Daily Calories Goal: {calories} kcal</label>
                        <label className="macros-carbs">Daily Carbohydrates Goal: {carbs} g</label>
                        <label className="macros-protein">Daily Protein Goal: {protein} g</label>
                        <label className="macros-fat">Daily Fat Goal: {fat} g</label><br />
                        <span className="note-1">*Note that these values are estimates and that everybody's body is different.</span><br />
                        <span className="note-2">*These values are based off your basal metabolic rate, or the number of calories required to keep your body functioning at rest.</span>
                    </div>
                </div>
            </div>
        )
    }
}