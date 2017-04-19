import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  companies = [];
  couponsIds = [];
  company;
  organizedCompanyNames = [];
  check;
  currentShowingCoupons = [];

  /*@ngInject*/
    constructor($scope, GoogleUser, GoogleUserResources, Coupons) {
      this.googleUser = GoogleUser;
      this.googleUserResources = GoogleUserResources;
      this.couponsService = Coupons;
      $scope.company =""
    }

  $onInit(){

    var queryCouponsIds = this.couponsService.getAllCouponsIds();
    this.organizedCompanyNames = [];

    if ( queryCouponsIds.length == 0) {
      if (this.googleUser.hasCredentials())
        this.queryMostRecentCouponsIds(this.googleUser, 24);
    }
    else{
      var that = this;
      this.couponsIds = this.couponsService.getAllCouponsIds();
      this.couponsIds.forEach(function(ids){
        that.organizeCompanies(that.googleUser, ids);
      });
    }
   this.queryFavoriteCouponsIds(this.googleUser, 24);
  }

  queryMostRecentCouponsIds(googleUser, NIds) {

    this.googleUserResources.queryMostRecentCouponsIds(googleUser, NIds)
      .then(res => {
        var ids = res.data;
        this.couponsIds = [];

        ids.map(obj => {
          this.couponsIds.push(obj.id);
          this.organizeCompanies(googleUser, obj.id);
          this.couponsService.addNewCouponsForCompany(obj.id,obj.id);
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


  queryFavoriteCouponsIds(googleUser, NIds) {

    this.googleUserResources.queryFavoriteCouponsIds(googleUser, NIds)
      .then(res => {
        var ids = res.data.ids;

        ids.map(obj => {
          this.couponsService.addFavorites(obj.id,obj.id);
        });

        return this.couponsIds;
      })
      .catch(error => {
        console.log(error);
      });
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

  runsearch(company){
    this.organizedCompanyNames = [];
    if(this.googleUser.hasCredentials() ) {
      this.googleUserResources.queryMostRecentSearchedCoupon(this.googleUser, 10, company)
        .then(res => {
          var ids = res.data;

          if (ids.constructor !== Array)
            return;

          this.couponsIds = [];

          ids.map(obj => {
            this.organizeCompanies(this.googleUser, obj.id);
            this.couponsIds.push(obj.id);
          });

        })
        .catch(error => {
          console.log(error);
        });
    }
  }

}

export default angular.module('myCouponsApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
  })
  .name;
