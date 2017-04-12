/**
 * Created by Carlos on 2/3/2017.
 */

'use strict';

import angular from 'angular';

export class GoogleSignIn {

  constructor($window, GoogleUser, $state){
    'ngInject';

    $window.onSignIn = this.onSignIn;
    $window.onSignInFailure = this.onSignInFailure;
    $window.$state = $state
    $window.GoogleUser = GoogleUser;
    $window.onload = this.onload;
  }


  onload() {
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/gmail.modify',
      'width': 125,
      'height': 40,
      'longtitle': false,
      'theme': 'dark',
      'onsuccess': onSignIn,
      'onfailure': onSignInFailure
    });
  }


  onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    var auth2 = gapi.auth2.getAuthInstance();
    googleUser.reloadAuthResponse()
      .then(authorizationRes => {
        console.log(authorizationRes['access_token']);

        auth2.signIn({
          //prompt: 'select_account',
           fetch_basic_profile: false
        });

        GoogleUser.setUserCredentials({
          fullName: profile.getName(),
          imageURL: profile.getImageUrl(),
          email: profile.getEmail(),
          accessToken: authorizationRes['access_token']
        });
          $state.go('main');
      });
  }

  onSignInFailure(){
    console.log("Sign-In Failed");
  }
}

export default angular.module('directives.googleSignIn', [])
  .component('googleSignIn', {
    template : require('./google-sign-in.html'),
    controller: GoogleSignIn,
  })
  .name;
