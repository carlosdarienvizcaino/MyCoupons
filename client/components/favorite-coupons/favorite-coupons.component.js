
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './favorite-coupons.routes';

export class FavoriteCouponsController {

  companies = [];
  couponsIds = [];
  company;
  organizedCompanyNames = [];
  check;
  currentShowingCoupons = [];

  /*@ngInject*/
    constructor(GoogleUser, GoogleUserResources) {
      this.googleUser = GoogleUser;
      this.googleUserResources = GoogleUserResources;
    }

  $onInit(){

      if (this.googleUser.hasCredentials()) {
        this.queryFavoriteCouponsIds(this.googleUser, 24);
      }
  }

  queryFavoriteCouponsIds(googleUser, NIds) {

    this.googleUserResources.queryFavoriteCouponsIds(googleUser, NIds)
      .then(res => {
        var ids = res.data.ids;
        this.couponsIds = [];

        ids.map(obj => {
          this.couponsIds.push(obj.id);
          this.organizeCompanies(googleUser, obj.id);
        });

        return this.couponsIds;
      })
      .catch(error => {
        console.log(error);
      });
  }

  organizeCompanies(user, id) {
    var that = this;
    this.googleUserResources.queryMiniCouponWithId(user, id)
      .then(response => {
        that.company = response.data;
        that.check = true;
        that.parseData(that.company);
      })
      .catch(error =>{
        console.log(error);
      });

  }

  parseData(company) {
    var that = this;
    var lnght = that.organizedCompanyNames.length;
    var str = company.name.split(" ");

    if (lnght == 0) {
      that.organizedCompanyNames.push({
        Name: str[0],
        Domain : company.domain,
        ID: [company.id]
      });
      that.check = false;
    }
    else {
      for (var i = 0; i < lnght; i++) {
        if (that.organizedCompanyNames[i].Name == str[0]) {
          that.organizedCompanyNames[i].ID.push(company.id);
          that.check = false;
          break;
        }
      }
    }

    if(that.check){
      that.organizedCompanyNames.push({
        Name: str[0],
        Domain: company.domain,
        ID: [company.id]
      })
    }
    that.check = true;

  }


  tabSelected(name){

    var that = this;
    var size = that.organizedCompanyNames.length;

    for(var i = 0 ; i < size ; i++){
      if(that.organizedCompanyNames[i].Name == name){
        that.couponsIds = that.organizedCompanyNames[i].ID;
        break;
      }
    }

  }
}

export default angular.module('myCouponsApp.favoriteCoupons', [uiRouter])
  .config(routing)
  .component('favoriteCoupons', {
    template: require('./favorite-coupons.html'),
    controller: FavoriteCouponsController,
  })
  .name;
