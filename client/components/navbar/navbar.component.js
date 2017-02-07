'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }];

  isCollapsed = true;

  constructor(Auth) {
    'ngInject';
    this.Auth = Auth;
  }

  isGoogleLoggedIn() {
    return this.Auth.isGoogleLoggedInBoolean();
    // try {
    //   var GoogleAuth = gapi.auth2.getAuthInstance();
    //   return (GoogleAuth.isSignedIn.get());
    // }
    // catch (e){
    //    console.log(e);
    // }
    // return false;
  }
}



export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
