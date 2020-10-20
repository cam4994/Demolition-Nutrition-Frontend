import React from 'react';
import { Table } from 'reactstrap';


export default function ExercisesTable(props) {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>MET (Metabolic Equivalent for Task)</th>
                    <th>Duration</th>
                    <th>Calories Burned</th>
                    <th className="th-delete-button"></th>
                </tr>
            </thead>
            <tbody>
                {props.workouts.map(workout =>
                    (
                        <tr>
                            <td>{workout.name}</td>
                            <td>{workout.met}</td>
                            <td>{workout.duration}</td>
                            <td>{workout.calories}</td>
                            <td>
                                <button className="delete-entry-button" onClick={() => props.deleteWorkout(workout)}>
                                    <i className="fas fa-times-circle"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}