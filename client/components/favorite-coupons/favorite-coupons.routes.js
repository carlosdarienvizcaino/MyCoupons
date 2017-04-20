/**
 * Created by Carlos on 3/14/2017.
 */

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('favoriteCoupons', {
    url: '/favoriteCoupons',
    template: '<favorite-coupons></favorite-coupons>'
  });
}
