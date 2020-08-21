import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import {Switch,  Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';




class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }

  }
  //default property
    unsubscribeFromAuth =null

  //called when the component mounts. called once
    componentDidMount(){
      //continuously triggers when the auth state changes
      this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {

        //check if the userAuth is not null
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          //check if the user data has changed
          userRef.onSnapshot( snapShot => {
            
            this.setState({
              currentUser: {
                id:  snapShot.id,
                ...snapShot.data()
              }
            // }, () => {
            //   console.log(this.state)
            });
            console.log(this.state)
          });
          
        }
        //sets the new user to the current user
        this.setState({ currentUser: userAuth});
      
      })
    }

    //called when component unmounts
    componentWillUnmount(){

      //closes the subscription
      this.unsubscribeFromAuth();
    }
  render(){
  return (
    <div >
      <Header  currentUser={this.state.currentUser} />
      <Switch>
      <Route exact path='/' component={HomePage}/>
     <Route exact path='/shop' component={ShopPage}/>
     <Route path='/signin' component={SignInAndSignUpPage}/>
      </Switch>
     
    </div>
  );
  }
}

export default App;
