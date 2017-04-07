
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './new-coupons.routes';

export class NewCouponsComponent {

  numberOfCompaniesPerPage = 7;
  totalPagesNumber = 1;
  currentPageNumber = 1;

  selectedNewCouponsCompanyNames = [];
  selectedNewCouponsIds = new Map();
  days = 7;
  companies = [];

  constructor(GoogleUser, GoogleUserResources, Coupons, $state){
    'ngInject';
    this.googleUser = GoogleUser;
    this.googleUserResources = GoogleUserResources;
    this.couponsService = Coupons;
    this.state = $state;
  }

  $onInit() {

    if (this.googleUser.hasCredentials()) {
      this.queryNewCouponsPerCompanyForTheLastNDays(this.googleUser, this.days);
    }
  }



  queryNewCouponsPerCompanyForTheLastNDays(user, days) {
    var that = this;
    this.googleUserResources.queryNewCouponsPerCompanyForTheLastNDays(user, days)
      .then(response => {
        that.companies = response.data.companies;
        that.totalPagesNumber = Math.ceil(that.companies.length/that.numberOfCompaniesPerPage);
      })
      .catch(error =>{
        console.log(error);
      });
  }

  getCompaniesForPage(pageNumber) {

    if (this.companies.length > 0) {
      var startPosition = (pageNumber - 1) * this.numberOfCompaniesPerPage;
      var endPosition = pageNumber * this.numberOfCompaniesPerPage;
      return this.companies.slice(startPosition, endPosition);
    }

    return [];
  }

  getPages() {
    return new Array(this.totalPagesNumber);
  }

  setPage(pageNumber) {

    if (pageNumber >= 1 && pageNumber <= this.totalPagesNumber)
      this.currentPageNumber = pageNumber;
  }

  updateNewCouponsForCompany(companyName, domain, ids) {

    if (this.selectedNewCouponsCompanyNames.indexOf(companyName) === -1) {

      // Add
      this.selectedNewCouponsIds.set(companyName, ids);
      this.selectedNewCouponsCompanyNames.push(companyName);
    }
    else {

      // Remove
      this.selectedNewCouponsIds.delete(companyName);
      this.selectedNewCouponsCompanyNames.splice(companyName, 1);
    }
  }

  viewAllCoupons() {
    this.couponsService.removeAll();

    var that = this;

    that.selectedNewCouponsCompanyNames.forEach( function(companyName){
      var ids = that.selectedNewCouponsIds.get(companyName);
      ids.forEach(function(id){
      that.couponsService.addNewCouponsForCompany(id, id);
      });
    });

    $state.go('main');
  }

}

export default angular.module('myCouponsApp.newCoupons', [uiRouter])
  .config(routing)
  .component('newCoupons', {
    template: require('./new-coupons.html'),
    controller: NewCouponsComponent,
    bindings : {
      couponId: '<' // one way binding
    }
  })
  .name;
