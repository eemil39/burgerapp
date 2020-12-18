import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/uitility';

const initalState = {
    ingredients: null,
    totalPrice: 5,
    maxIngredients: {
        jalapeno: 1,
        salad: 1,
        bacon: 2,
        cheese: 2,
        meat: 2
    },
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    jalapeno:0.3,
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 0.5
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngre = updateObject(state.ingredients, updatedIng);
    const updatedState2 = {
        ingredients: updatedIngre,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState2);
};

const setIngredients = (state, action) => {
    return updateObject(state,{
        ingredients: {
            jalapeno: action.ingredients.jalapeno,
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 5,
        error: false,
        building: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state,{ error: true })
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }

};

export default reducer;