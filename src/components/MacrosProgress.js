import React from 'react';
import { Progress } from 'reactstrap';

const MacrosProgress = (props) => {
    const { carbs, protein, fat } = props.consumed
    return (
        <div className="macros-progress">
            <div className="macros-progress-carbs">
                <h4 className="text-center">Carbs</h4>
                <div className="text-center">{`${carbs} g / ${props.carbsGoal} g`}</div>
                <Progress multi>
                    <Progress bar animated color="success" value={carbs / props.carbsGoal * 100}>{`${parseFloat(carbs / props.carbsGoal * 100).toPrecision(3)}%`}</Progress>
                </Progress>
            </div>
            <div className="macros-progress-protein">
                <h4 className="text-center">Protein</h4>
                <div className="text-center">{`${protein} g / ${props.proteinGoal} g`}</div>
                <Progress multi>
                    <Progress bar animated value={protein / props.proteinGoal * 100}>{`${parseFloat(protein / props.proteinGoal * 100).toPrecision(3)}%`}</Progress>
                </Progress>
            </div>
            <div className="macros-progress-fat">
                <h4 className="text-center">Fat</h4>
                <div className="text-center">{`${fat} g / ${props.fatGoal} g`}</div>
                <Progress multi>
                    <Progress bar animated color="danger" value={fat / props.fatGoal * 100}>{`${parseFloat(fat / props.fatGoal * 100).toPrecision(3)}%`}</Progress>
                </Progress>
            </div>
        </div>
    );
};

export default MacrosProgress;