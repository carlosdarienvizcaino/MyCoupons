/**
 * Created by NicholasSmith on 4/5/17.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './myAccount.routes';

export class myAccountComponent {

  constructor(GoogleUser) {
    'ngInject';
    this.googleUser = GoogleUser;
  }

  getAccountImage(){
    return this.googleUser.getImageURL();
  }
  showAccountName(){
    var name=this.googleUser.getFullName();
    return name;
  }
}

export default angular.module('myCouponsApp.myAccount', [uiRouter])
  .config(routing)
  .component('myAccount', {
    template: require('./myAccount.html'),
    controller: myAccountComponent,
  })
  .name;
