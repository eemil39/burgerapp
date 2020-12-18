import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls =[
    { label: 'Jalapeno', type: 'jalapeno', max: '1'},
    { label: 'Salad', type: 'salad', max: '1'},
    { label: 'Bacon', type: 'bacon', max: '3'},
    { label: 'Cheese', type: 'cheese', max: '2'},
    { label: 'Meat', type: 'meat', max: '3'},
];

const buildControls = (props) => (

    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}€</strong></p>
        {controls.map(ctrl =>(
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)} 
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            disabled2={props.disabled2[ctrl.type]}
            />

        ))}
        <button 
        className={classes.Orderbutton}
        disabled={!props.purchasable}
        onClick={props.ordered}
        >{props.isAuth ? 'Order' : 'Signup to order!'}</button>
    </div>
);

export default buildControls;