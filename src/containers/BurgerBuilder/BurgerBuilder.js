import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component{

    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIgredient();
    }

    updatePurchasable (ingredients) {
     
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) =>{
            return sum + el; 
        }, 0);
        return sum > 0;
    }

    purchaseHandler =()=> {
        if (this.props.isAuthenticated){
            this.setState({purchasing:true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

     purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
     }  

    render(){
        const disableInfo = {
            ...this.props.ings
        };
        const disableInfoMore = {
            ...this.props.ings
        };

        const maxNumOfIngredients = {
            ...this.props.max
        }
        
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0 
        
        }
        for(let key in disableInfoMore) {
            disableInfoMore[key] = disableInfoMore[key] >=  maxNumOfIngredients[key]
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if(this.props.ings){
            burger =  (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        disabled2={disableInfoMore}
                        price={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        ordered={this.purchaseHandler} 
                        isAuth={this.props.isAuthenticated}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)}
                />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        max: state.burgerBuilder.maxIngredients,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIgredient: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));