/**
 * Created by Carlos on 3/14/2017.
 */

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('newCoupons', {
    url: '/newCoupons',
    template: '<new-coupons></new-coupons>'
  });
}
