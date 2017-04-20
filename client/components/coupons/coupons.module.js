/**
 * Created by Carlos on 2/4/2017.
 */


export function Coupons() {

  var companies = new Map();
  var favorites = new Map();
  var currentId;


  return {

   addNewCouponsForCompany(companyName, ids) {
     companies.set(companyName, ids);

   },

    addFavorites(companyName, ids){
     favorites.set(companyName, ids);
    },

    checkforFavorites(ids){
      return favorites.has(ids);

    },

    removeFavorite(ids){
      favorites.delete(ids);
    },
    addCouponsForCompany(companyName, ids) {
      companies.set(companyName, ids);
    },

   removeNewCouponsForCompany(companyName) {
    companies.delete(companyName);
   },

   removeAll() {
     companies.clear();
     favorites.clear();
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
   },

    getAllFavoriteCouponsIds() {
      var couponIds = [];

      favorites.forEach(function(ids){
        couponIds = couponIds.concat(ids);
      });
      return couponIds;
    }

  };
}

export default angular.module('myCouponsApp.coupons', [])
  .service('Coupons', Coupons)
  .name;
