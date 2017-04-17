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
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      return $http.get(url, options);
    },

    queryMostRecentSearchedCoupon(user, maxResults, company){

      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/ids/${maxResults}/${company}`;
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      return $http.get(url, options);
    },


    queryforCompanyName(user, couponId) {

      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/company/${couponId}`;
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      return $http.get(url, options);
    },

    queryCouponWithId(user, couponId) {

      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/${couponId}`;
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      return $http.get(url, options);
    },

    queryFavoriteCouponsIds(user) {
      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/favorites/ids`;
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      return $http.get(url, options);
    },

    queryMiniCouponWithId(user, couponId) {

      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/minimal/${couponId}`;
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      return $http.get(url, options);
    },

    queryNewCouponsPerCompanyForTheLastNDays(user, days) {
      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/companies/newCoupons/${days}`;
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      return $http.get(url, options);
    },

    queryCouponsPerCompanyForTheLastNDays(user, days) {
      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/companies/${days}`;
      var options = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
      return $http.get(url, options);
    },

    trashCoupon(user, couponId){
      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/trash/${couponId}`;
      var options = {
        headers: {
          'method': 'POST',
          'Content-Type': 'application/x-www-form-urlencoded',
          'access_token': accessToken
        }
      };
      return $http.post(url,options);
    },

    changeLabelId(user, couponId){
      var userEmail = user.getEmail();
      var accessToken = user.getAccessToken();
      var url = `/api/users/${userEmail}/coupons/modify_label/${couponId}`;
      var options = {
        headers: {
          'method': 'POST',
          'Content-Type': 'application/x-www-form-urlencoded',
          'access_token': accessToken
        }
      };
      return $http.post(url,options);
    }
  };

  return Resources;
}
