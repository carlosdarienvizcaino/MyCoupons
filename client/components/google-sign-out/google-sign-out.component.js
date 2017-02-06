/**
 * Created by Carlos on 2/3/2017.
 */

import angular from 'angular';

export class GoogleSignOut {

  constructor(GoogleUser){
    'ngInject';
    this.GoogleUser = GoogleUser;
  }

  onSignOut(){

    var auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
}

export default angular.module('directives.googleSignOut', [])
  .component('googleSignOut', {
    template : require('./google-sign-out.html'),
    controller: GoogleSignOut,
  })
  .name;
