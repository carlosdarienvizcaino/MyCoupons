'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
  }];

  isCollapsed = true;

  constructor(Auth) {
    'ngInject';
    this.isGoogleLoggedIn = Auth.isGoogleLoggedIn;
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
