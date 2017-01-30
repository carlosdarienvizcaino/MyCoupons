'use strict';

import angular from 'angular';
import AboutController from './About.controller';

export default angular.module('myCouponsApp.About', [])
  .controller('AboutController', AboutController)
  .name;
