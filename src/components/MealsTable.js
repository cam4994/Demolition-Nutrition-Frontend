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
                </tr>
            </thead>
            <tbody>
                {props.meals.map(meal =>
                    (
                        <tr>
                            <td scope="row">{meal.category}</td>
                            <td>{meal.name}</td>
                            <td>{meal.servings}</td>
                            <td>{Math.round(meal.calories * meal.servings)}</td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}
