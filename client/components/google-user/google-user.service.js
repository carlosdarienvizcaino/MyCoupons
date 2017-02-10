/**
 * Created by Carlos on 2/9/2017.
 */

'use strict';

export function GoogleUserResources($http) {
  'ngInject';

  var Resources = {

    queryMostRecentCouponsIds(user, maxResults){

      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/ids/${maxResults}`;
      var options = {
        headers : {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
     return $http.get(url,options);
    }
  };

  return Resources;
}
