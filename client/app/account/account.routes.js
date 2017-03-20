'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('login', {
    url: '/login',
    template: require('./login/login.html'),
    controller: 'LoginController',
    controllerAs: 'vm'
  })
    .state('signout', {
      url: '/signout',
      template: '',
      controller($state, Auth) {
        'ngInject';
        Auth.logoutFromGoogle();
        $state.go('login');
      }
    })

    .state('disconnect', {
      url: '/disconnect',
      template: '',
      controller($state, Auth){
        'ngInject';
        Auth.signoutFromGoogle();
        $state.go('login');
      }
    });

}
