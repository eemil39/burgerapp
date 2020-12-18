import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElment = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElment = <input 
                className={inputClasses.join(' ')}
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElment = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('select'):
            inputElment = (
                <select 
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(option =>(
                        <option 
                            value={option.value}
                            key={option.value}>
                            {option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElment = <input 
                className={classes.InputElement}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElment}
        </div>
    );
}

export default input;