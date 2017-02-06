/**
 * Created by NicholasSmith on 2/5/17.
 */
'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('home', {
    url: '/home',
    template: '<home></home>'
  });
}
