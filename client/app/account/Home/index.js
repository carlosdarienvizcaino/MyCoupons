'use strict';

import angular from 'angular';
import HomeController from './Home.controller';

export default angular.module('myCouponsApp.Home', [])
  .controller('HomeController', HomeController)
  .name;
