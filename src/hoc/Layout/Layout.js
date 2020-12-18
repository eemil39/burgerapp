import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSidedrawer: false
    }

    sideDrawerCLosedHandler = () =>{
        this.setState({showSidedrawer: false});
    }

    sideDrawerToggle = () => {
        this.setState( ( prevState ) => {
            return {showSidedrawer: !prevState.showSidedrawer};
        });
    }



    render(){
        return(
            <Aux>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggle}/>
                <SideDrawer 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSidedrawer} 
                closed={this.sideDrawerCLosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children }
                </main>
            </Aux>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);