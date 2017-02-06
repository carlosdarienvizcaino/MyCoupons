/**
 * Created by NicholasSmith on 2/5/17.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './home.routes';

export class HomeComponent {}

export default angular.module('myCouponsApp.home', [uiRouter])
  .config(routing)
  .component('home', {
    template: require('./home.html'),
    controller: HomeComponent
  })
  .name;
