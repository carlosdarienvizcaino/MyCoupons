/**
 * Created by Carlos on 2/4/2017.
 */

export function GoogleUser() {

  var fullName, imageURL;
  var that = this;

  return {
    setUserCredentials(info) {
      that.fullName    = info.fullName    || 'UNKNOW NAME';
      this.imageURL    = info.imageURL    || 'UNKNOW IMAGE';
      this.email       = info.email       || 'UNKNOW EMAIL';
      this.accessToken = info.accessToken || 'UNKNOW ACCESS_TOKEN';
    }
  };
}

export default angular.module('myCouponsApp.googleUser', [])
  .factory('GoogleUser', GoogleUser)
  .name;
