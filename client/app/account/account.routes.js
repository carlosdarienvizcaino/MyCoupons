'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('About', {
    url: '/About',
    template: require('./About/About.html'),
    controller: 'AboutController',
    controllerAs: 'vm'
  })

    .state('Home', {
      url: '/Home',
      template: require('./Home/Home.html'),
      controller: 'HomeController',
      controllerAs: 'vm'
    })

    .state('Help', {
      url: '/Help',
      template: require('./Help/Help.html'),
      controller: 'HelpController',
      controllerAs: 'vm',
      authenticate: true
    });
}
