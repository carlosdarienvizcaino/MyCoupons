'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
  }];

  isCollapsed = true;

  constructor(Auth, GoogleUser) {
    'ngInject';
    this.isGoogleLoggedIn = Auth.isGoogleLoggedIn;
    this.googleUser = GoogleUser;
  }

  getImage(){
    return this.googleUser.getImageURL();
  }

  showname(){
    var firstname=this.googleUser.getFullName().split(" ");

    return firstname[0];
  }


}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
