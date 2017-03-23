/**
 * Created by Carlos on 2/4/2017.
 */


export function Coupons() {

  var companies = new Map();
  var currentId;


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

    shareCurrentId(Id) {
     currentId = Id;
    },

    getCurrentID() {
     return currentId;
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
