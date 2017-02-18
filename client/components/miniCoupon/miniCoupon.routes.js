/**
 * Created by NicholasSmith on 2/18/17.
 */
'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('miniCoupon', {
    url: '/miniCoupon',
    template: '<mini-coupon></mini-coupon>'
  });
}
