'use strict';

import angular from 'angular';

/**
 * Removes server error when user_example updates input
 */
angular.module('myCouponsApp')
  .directive('mongooseError', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link(scope, element, attrs, ngModel) {
        element.on('keydown', () => ngModel.$setValidity('mongoose', true));
      }
    };
  });
