import React from 'react';
import { Progress } from 'reactstrap';

const CaloriesProgress = (props) => {
    return (
        <div className="calories-progress">
            <div className="text-center">{`${props.consumedCalories} kcal / ${props.caloriesGoal} kcal`}</div>
            <Progress multi>
                <Progress className="calories-progress-bar" bar animated color="warning" value={props.consumedCalories / props.caloriesGoal * 100}>{`${parseFloat(props.consumedCalories / props.caloriesGoal * 100).toPrecision(3)}%`}</Progress>
            </Progress>
        </div>
    );
};

export default CaloriesProgress;