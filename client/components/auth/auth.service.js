'use strict';


class _User {
  _id = '';
  name = '';
  email = '';
  role = '';
  $promise = undefined;
}

export function AuthService($location, $http, $cookies, $q, appConfig, Util, User, $rootScope) {
  'ngInject';

  var safeCb = Util.safeCb;
  var currentUser = new _User();
  var userRoles = appConfig.userRoles || [];
  /**
   * Check if userRole is >= role
   * @param {String} userRole - role of current user_example
   * @param {String} role - role to check against
   */
  var hasRole = function(userRole, role) {
    return userRoles.indexOf(userRole) >= userRoles.indexOf(role);
  };

  if($cookies.get('token') && $location.path() !== '/logout') {
    currentUser = User.get();
  }


  var Auth = {

    initGoogleAuthentication() {

      gapi.load('auth2', function () {
        var auth2 = gapi.auth2.init({
          client_id: '1067900185599-f5h58q36rfs9e8bg750gt25n8nmaupaq.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/gmail.modify',
          cookiepolicy: 'single_host_origin',
        });
        $rootScope.$broadcast('GoogleAuthInitializedEvent', auth2);


      });

    },

    logoutFromGoogle() {

      var authorization = gapi.auth2.getAuthInstance();
      authorization.signOut().then(function(){});

    },
    signoutFromGoogle(){
      var authorization = gapi.auth2.getAuthInstance();
      authorization.disconnect().then(function () {
      });



    },
    isGoogleLoggedIn() {
      try {
        var GoogleAuth = gapi.auth2.getAuthInstance();
        return GoogleAuth.isSignedIn.get();

      }
      catch (e){
      }
      return false;
    },

  /**
     * Authenticate user_example and save token
     *
     * @param  {Object}   user_example     - login info
     * @param  {Function} callback - function(error, user_example)
     * @return {Promise}
     */
    login({
      email,
      password
    }, callback) {
      return $http.post('/auth/local', {
        email,
        password
      })
        .then(res => {
          $cookies.put('token', res.data.token);
          currentUser = User.get();
          return currentUser.$promise;
        })
        .then(user => {
          safeCb(callback)(null, user);
          return user;
        })
        .catch(err => {
          Auth.logoutFromGoogle();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
    },
    /**
     * Create a new user_example
     *
     * @param  {Object}   user     - user_example info
     * @param  {Function} callback - function(error, user_example)
     * @return {Promise}
     */
    createUser(user, callback) {
      return User.save(user, function(data) {
        $cookies.put('token', data.token);
        currentUser = User.get();
        return safeCb(callback)(null, user);
      }, function(err) {
        Auth.logoutFromGoogle();
        return safeCb(callback)(err);
      })
        .$promise;
    },

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - function(error, user_example)
     * @return {Promise}
     */
    changePassword(oldPassword, newPassword, callback) {
      return User.changePassword({
        id: currentUser._id
      }, {
        oldPassword,
        newPassword
      }, function() {
        return safeCb(callback)(null);
      }, function(err) {
        return safeCb(callback)(err);
      })
        .$promise;
    },

    /**
     * Gets all available info on a user_example
     *
     * @param  {Function} [callback] - function(user_example)
     * @return {Promise}
     */
    getCurrentUser(callback) {
      var value = _.get(currentUser, '$promise') ? currentUser.$promise : currentUser;

      return $q.when(value)
        .then(user => {
          safeCb(callback)(user);
          return user;
        }, () => {
          safeCb(callback)({});
          return {};
        });
    },

    /**
     * Gets all available info on a user_example
     *
     * @return {Object}
     */
    getCurrentUserSync() {
      return currentUser;
    },

    /**
     * Check if a user_example is logged in
     *
     * @param  {Function} [callback] - function(is)
     * @return {Promise}
     */
    isLoggedIn(callback) {
      return Auth.getCurrentUser(undefined)
        .then(user => {
          let is = _.get(user, 'role');

          safeCb(callback)(is);
          return is;
        });
    },



    /**
     * Check if a user_example is logged in
     *
     * @return {Bool}
     */
    isLoggedInSync() {
      return !!_.get(currentUser, 'role');
    },

    /**
     * Check if a user_example has a specified role or higher
     *
     * @param  {String}     role     - the role to check against
     * @param  {Function} [callback] - function(has)
     * @return {Promise}
     */
    hasRole(role, callback) {
      return Auth.getCurrentUser(undefined)
        .then(user => {
          let has = hasRole(_.get(user, 'role'), role);

          safeCb(callback)(has);
          return has;
        });
    },

    /**
     * Check if a user_example has a specified role or higher
     *
     * @param  {String} role - the role to check against
     * @return {Bool}
     */
    hasRoleSync(role) {
      return hasRole(_.get(currentUser, 'role'), role);
    },

    /**
     * Check if a user_example is an admin
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
    isAdmin() {
      return Auth.hasRole(...[].concat.apply(['admin'], arguments));
    },

    /**
     * Check if a user_example is an admin
     *
     * @return {Bool}
     */
    isAdminSync() {
      return Auth.hasRoleSync('admin');
    },

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    getToken() {
      return $cookies.get('token');
    },
  };


  return Auth;
}
