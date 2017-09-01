/**
 * UserLogin.js
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebase from 'Firebase/Firebase';
var credential = null
export default class UserLogin extends Component {

  constructor(props) {
      super(props);
      this.state = {currentUserGoogle: null, currentUserFirebase: null, userName: null, loggedIn: false, newUser: null};
    }

  loginWithGoogle(user) {

  }
  componentDidMount() {
    GoogleSignin.configure({
        webClientId: '494894149578-hjjap1m9p3qt1ee9t4r245q8dh28877m.apps.googleusercontent.com'
    }).then(() => {
      GoogleSignin.currentUserAsync().then((user) => {
          if(user === null) {
            GoogleSignin.signIn()
              .then((user) => {
                this.setState({currentUserGoogle: user});
                credential = firebase.auth.GoogleAuthProvider.credential(
                  null,
                  user.accessToken,
                );
                firebase.auth().signInWithCredential(credential)
                  .then((user) => {
                    this.setState({currentUserFirebase: user});

                  }).done();
              })
              .catch((err) => {
                alert('ERROR with sign in' + err);
                this.setState({currentUserGoogle: err});
              })
              .done();
          }
          else {
            this.setState({currentUserGoogle: user});


          credential = firebase.auth.GoogleAuthProvider.credential(
            null,
            user.accessToken,
          );
          firebase.auth().signInWithCredential(credential)
            .then((user) => {
              this.setState({currentUserFirebase: user});

            }).done();
          }
        })
    });

  }

  componentDidUpdate() {
    if (this.state.currentUserGoogle !== null
      && this.state.currentUserFirebase !== null && !this.state.loggedIn) {
        this.props.onLogin(
          this.state.currentUserGoogle,
          this.state.currentUserFirebase
        );
        this.setState({loggedIn:true});
        this.newProfile()
  }

  }

newProfile()
{
  firebase.database().ref('Users/').once('value', (snap) => {
  hasUser = snap.hasChild(this.state.currentUserFirebase.uid);
    if(hasUser == false)
    {
      this.createUserProfile()
    }
  });
}


createUserProfile()
{
  firebase.database().ref('/Users/'+ this.state.currentUserFirebase.uid).set({
    userName: this.state.currentUserFirebase.displayName,
    email: this.state.currentUserFirebase.email,
    photoURL: this.state.currentUserFirebase.photoURL,
    numberOfPickedShifts: 0,
    numberOfDropedShifts:0,
  });
}

  render() {
    return (
      this.state.currentUserGoogle === null
      || this.state.currentUserFirebase === null?
      <View>
      </View>
      :
      <View>
      </View>
    );
  }
}
