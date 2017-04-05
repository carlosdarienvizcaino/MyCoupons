/**
 * Created by NicholasSmith on 4/5/17.
 */
'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('myAccount', {
    url: '/myAccount',
    template: '<my-account></my-account>'
  });
}
