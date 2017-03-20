/**
 * Created by Carlos on 2/4/2017.
 */


export function Coupons() {

  var companies = new Map();

  return {

   addNewCouponsForCompany(companyName, ids) {
     companies.set(companyName, ids);
   },

   removeNewCouponsForCompany(companyName) {
    companies.delete(companyName);
   },

   removeAllCouponsIds() {
     companies = new Map();
   },

   getAllCouponsIds() {
     var couponIds = [];
     companies.forEach(function(ids){
       couponIds = couponIds.concat(ids);
     });
     return couponIds;
   }

  };
}

export default angular.module('myCouponsApp.coupons', [])
  .service('Coupons', Coupons)
  .name;
