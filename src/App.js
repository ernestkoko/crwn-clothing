import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import {Switch,  Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';

import { auth } from './firebase/firebase.utils'




class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }

  }
  //called when the component mounts. called once
    componentDidMount(){
      //continuously triggers when the auth state changes
      auth.onAuthStateChanged(  user => {
        //sets the new user to the current user
        this.setState({ currentUser: user});

        //logit out
        console.log(user);
      })
    }
  render(){
  return (
    <div >
      <Header />
      <Switch>
      <Route exact path='/' component={HomePage}/>
     <Route   path='/shop' component={ShopPage}/>
     <Route path='/signin' component={SignInAndSignUpPage}/>
      </Switch>
     
    </div>
  );
  }
}

export default App;
