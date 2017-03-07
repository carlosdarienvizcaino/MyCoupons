import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  coupons = [];
  companies = [];
  companyName = [];
  companyDomain = [];
  obj = [];
  couponsId = [];

  /*@ngInject*/
    constructor($scope, $log, GoogleUser, GoogleUserResources) {
      this.googleUser = GoogleUser;
      this.googleUserResources = GoogleUserResources;
      $scope.$log = $log;
      $scope.company = "";
    }

  $onInit(){
    if(this.googleUser.hasCredentials()) {
      this.googleUserResources.queryMostRecentCouponsIds(this.googleUser, 5)
        .then(res => {
          this.coupons = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  runsearch(company){
    let counter = 0;
    if(this.googleUser.hasCredentials() ) {
      this.googleUserResources.queryMostRecentSearchedCoupon(this.googleUser, 5, company)
       .then(res => {
         this.coupons = res.data;
         this.couponsId = res.data;
         this.companies.length=0;
         for( let i = 0 ; i < 5;i++) {
           var id= this.coupons[i].id;
           this.googleUserResources.queryforCompanyName(this.googleUser, id)
             .then(res => {
               this.companies.push(res.data);
               counter++;
               if (counter == 5) {
                 this.companystringsplitter(this.companies, this.coupons);
               }
             })
             .catch(error => {
               console.log(error);
             });
         }
       })
       .catch(error => {
       console.log(error);
       });
    }
  }


  companystringsplitter(inputstring , coupons){
  this.companyDomain.length=0;
  this.companyName.length=0;

   for(var i=0 ; i < inputstring.length ; i++)
    {
      var fields = inputstring[i].data.headers[0].value.split(/[<>]/);
      this.companyName.push(fields[0]);
      this.companyDomain.push(fields[1]);
    }

    this.outputobject(this.companyName, this.companyDomain, coupons);
  }

  outputobject (companyName, companyDomain, coupons){
    this.obj.length=0;

    for(var i = 0 ; i < coupons.length ; i++){
      this.obj.push({
        ID: coupons[i].id,
        companyName: companyName[i],
        companyDomain: companyDomain[i]
      })

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
