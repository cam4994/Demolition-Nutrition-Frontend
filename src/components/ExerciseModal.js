import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Table } from 'reactstrap';
import '../Styles/modal.css'

export default class ExerciseModal extends React.Component {

    state = {
        modal: false,
        filteredExercises: [], 
        selectedExercise: '', 
        caloriesBurned: 0
    }

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal, 
            selectedExercise: '' 
        })
    }

    handleChange = (e) => {
        //Sort the exercises alphabetically then filter based on the search. 
        // Make case insensitive by putting the exercises and search as lower case
        let filteredExercises = this.props.exerciseNames.sort().filter(name => name.toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState({ filteredExercises })
    }

    handleClick = (e) => {
        //Use the exercise name that is clicked to find the exercise object using .filter
        let selectedExercise = this.props.exercises.filter(exercise => exercise.name === e.target.textContent)
        this.setState({ 
            filteredExercises: [], 
            selectedExercise: selectedExercise[0]
        })
        //Erase whatever was typed into the exercise search but only after an exercise has been selected
        document.querySelector('.exercise-input').value=''
    }

    durationChange = (e) => {
        // Calculate the calories burned based on the duration and add it as a key to selectedExercise in state
        // Total calories burned = Duration (in minutes)*(MET*3.5*weight in kg)/200
        let caloriesBurned = Math.round(parseFloat(e.target.value) * this.state.selectedExercise.met * 3.5 * (this.props.user.weight / 2.2) / 200)
        this.setState({ caloriesBurned })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addWorkout(this.state.selectedExercise.id, e.target.duration.value, e.target.calories.value )
        this.setState({caloriesBurned: 0})
        this.toggle()
    }

    render() { 
        return (
            <div className="exercise-modal">
                <Button id="exercise-modal-button" onClick={this.toggle}>
                <i className="fas fa-running"></i>{' '}
                 Add Exercise</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="foodModal">
                    <ModalHeader toggle={this.toggle}>Add Workout to Journal</ModalHeader>
                    <ModalBody>
                        <div className="search-exercises">
                            <h2>Search Exercises</h2>
                            <input className="exercise-input no-outline" onChange={this.handleChange} autocomplete="off" type="text" name="search" placeholder="Enter Exercise Type" /><br />
                        </div>
                        {this.state.filteredExercises.length > 0 ? (
                                    <Table className="exercises-table" hover>
                                    <thead>
                                        <tr>
                                            <th>Select Exercise Type From Below</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.filteredExercises.map(exercise =>
                                            (
                                                <tr>
                                                    <td onClick={this.handleClick}>{exercise}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                        ) : null}
                    </ModalBody>
                    {this.state.selectedExercise !== '' ? (
                        <ModalFooter className="exercise-modal-footer">
                            <form onSubmit={this.handleSubmit}>
                                <h3 id="exercise-modal-exercise">{this.state.selectedExercise.name}</h3>
                                Exercise Duration: <input className="no-outline input-style" onChange={this.durationChange} autocomplete="off" name="duration"/> min<br/>
                                Calories Burned: <input className="no-outline input-style" name="calories" value={this.state.caloriesBurned}/> kcal <br/>
                                <Button id="exercise-modal-add-button" className="no-outline" type="submit" color="primary" >Add Exercise</Button>
                            </form>
                        </ModalFooter>
                     ) : null}
                </Modal>
            </div>
        );
    }
}