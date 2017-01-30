'use strict';

import angular from 'angular';
import HelpController from './Help.controller';

export default angular.module('myCouponsApp.Help', [])
  .controller('HelpController', HelpController)
  .name;
