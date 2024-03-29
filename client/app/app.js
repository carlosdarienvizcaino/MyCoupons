'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import GoogleUser from '../components/google-user/google-user.module';
import Coupons from '../components/coupons/coupons.module';
import account from './account';
import admin from './admin';
import googleSignIn from '../components/google-sign-in/google-sign-in.component';
import fullCoupon from '../components/full-coupon/full-coupon.component';
import newCoupons from '../components/new-coupons/new-coupons.component';
import pagination from '../components/pagination/pagination.component';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import miniCoupon from '../components/miniCoupon/miniCoupon.component';
import favoriteCupons from '../components/favorite-coupons/favorite-coupons.component';
import main from './main/main.component';
import myAccount from '../components/myAccount/myAccount.component';
import constants from './app.constants';
import companyCoupons from '../components/company-coupons/company-coupons.component';
import util from '../components/util/util.module';

import './app.scss';

angular.module('myCouponsApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, ngAnimate, _Auth,
  Coupons, GoogleUser, account, admin, googleSignIn, fullCoupon, newCoupons, favoriteCupons, pagination, navbar, footer, miniCoupon, myAccount, main,companyCoupons,
  constants, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    Auth.initGoogleAuthentication();

  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['myCouponsApp'], {
      strictDi: true
    });
  });
