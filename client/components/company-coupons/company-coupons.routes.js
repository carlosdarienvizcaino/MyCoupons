/**
 * Created by Lazaro on 4/3/2017.
 */
export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('companyCoupons', {
    url: '/companyCoupons',
    template: '<company-coupons></company-coupons>'
  });
}
