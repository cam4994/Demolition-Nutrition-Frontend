import React from 'react';
import { Table } from 'reactstrap';


export default function MealsTable(props) {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Meal</th>
                    <th>Food</th>
                    <th>Servings</th>
                    <th>Calories Consumed</th>
                    <th className="th-delete-button"></th>
                </tr>
            </thead>
            <tbody>
                {props.meals.map(meal =>
                    (
                        <tr>
                            <td>{meal.category}</td>
                            <td>{meal.name}</td>
                            <td>{meal.servings}</td>
                            <td>{Math.round(meal.calories * meal.servings)}</td>
                            <td>
                                <button className="delete-entry-button no-outline" onClick={() => props.deleteEntry(meal)}>
                                    <i className="fas fa-times-circle"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}
