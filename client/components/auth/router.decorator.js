'use strict';

export function routerDecorator($rootScope, $state, Auth) {
  'ngInject';
  // Redirect to login if route requires auth and the user_example is not logged in, or doesn't have required role

   $rootScope.$on('GoogleAuthInitializedEvent', function(event, auth2){

      if (Auth.isGoogleLoggedIn()) {
        $state.go('main');
      }
      else {
        $state.go('login');
      }
    });
}
