/**
 * Created by Carlos on 2/4/2017.
 */

import {
  GoogleUserResources
} from './google-user.service';

export function GoogleUser() {

  const UNKNOWN = 'UNKNOWN';
  return {
    setUserCredentials(info) {
      this.fullName    = info.fullName    || UNKNOWN;
      this.imageURL    = info.imageURL    || UNKNOWN;
      this.email       = info.email       || UNKNOWN;
      this.accessToken = info.accessToken || UNKNOWN;
    },

    getFullName(){
      return this.fullName;
    },

    getImageURL() {
      return this.imageURL ;
    },

    getEmail() {
      return this.email;
    },

    getAccessToken() {
      return this.accessToken;
    },

    hasCredentials() {
      return this.getAccessToken() !== UNKNOWN && this.getAccessToken() !== undefined;
    },
  };
}

export default angular.module('myCouponsApp.googleUser', [])
  .factory('GoogleUser', GoogleUser)
  .factory('GoogleUserResources', GoogleUserResources)
  .name;
