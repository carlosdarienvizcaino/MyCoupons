/**
 * Created by Carlos on 2/3/2017.
 */

'use strict';

import angular from 'angular';

export class GoogleSignIn {

  constructor($window, GoogleUser){
    'ngInject';

    $window.onSignIn = this.onSignIn;
    $window.onSignInFailure = this.onSignInFailure;
    this.GoogleUser = GoogleUser;
    $window.GoogleUser = GoogleUser;
    $window.onload = this.onload;
  }

  onload() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile',
      'width': 150,
      'height': 25,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSignIn,
      'onfailure': onSignInFailure
    });
  }

  onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    var authorizationRes = googleUser.getAuthResponse();

    GoogleUser.setUserCredentials({
      fullName: profile.getName(),
      imageURL: profile.getImageUrl(),
      email: profile.getEmail(),
      accessToken: authorizationRes['access_token']
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
