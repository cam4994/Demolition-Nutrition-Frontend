import React from 'react';
import { Progress } from 'reactstrap';

const CaloriesProgress = (props) => {
    return (
        <div>
            <h4 className="text-center">Calories</h4>
            <div className="text-center">{`${props.consumedCalories} g / ${props.caloriesGoal} g`}</div>
            <Progress multi>
                <Progress bar animated color="warning" value={props.consumedCalories / props.caloriesGoal * 100}>{`${parseFloat(props.consumedCalories / props.caloriesGoal * 100).toPrecision(3)}%`}</Progress>
            </Progress>
        </div>
    );
};

export default CaloriesProgress;