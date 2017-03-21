import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  companies = [];
  couponsIds = [];

  /*@ngInject*/
    constructor($scope, GoogleUser, GoogleUserResources, Coupons) {
      this.googleUser = GoogleUser;
      this.googleUserResources = GoogleUserResources;
      this.couponsService = Coupons;
      $scope.company =""
    }

  $onInit(){

    var queryCouponsIds = this.couponsService.getAllCouponsIds();

    if ( queryCouponsIds.length == 0) {
      if (this.googleUser.hasCredentials())
        this.queryMostRecentCouponsIds(this.googleUser, 5);
    }
    else {
      this.couponsIds = this.couponsService.getAllCouponsIds();
    }
  }

  queryMostRecentCouponsIds(googleUser, NIds) {

    this.googleUserResources.queryMostRecentCouponsIds(googleUser, NIds)
      .then(res => {

        var ids = res.data;
        this.couponsIds = [];

        ids.map(obj => {
          this.couponsIds.push(obj.id);
        });

        return this.couponsIds;
      })
      .catch(error => {
        console.log(error);
      });
  }



  runsearch(company){
    if(this.googleUser.hasCredentials() ) {
      this.googleUserResources.queryMostRecentSearchedCoupon(this.googleUser, 5, company)
        .then(res => {
          var ids = res.data;
          this.couponsIds = [];

          ids.map(obj => {
            this.couponsIds.push(obj.id);
          });

          return this.couponsIds;
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
    controller: MainController
  })
  .name;
