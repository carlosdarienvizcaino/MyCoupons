
import angular from 'angular';
import uiRouter from 'angular-ui-router';

export class PaginationComponent {

  elementsPerPage = 1;
  elements = [];
  elementsForCurrentPage = [];

  currentPageNumber = 1;
  totalPagesNumber = 1;

  constructor(){
    'ngInject';
  }

  $onInit() {
    this.totalPagesNumber = Math.ceil(this.elements.length/this.elementsPerPage);
  }

  getPages() {
    return new Array(this.totalPagesNumber);
  }

  setPage(pageNumber) {

    if (pageNumber >= 1 && pageNumber <= this.totalPagesNumber) {
      this.currentPageNumber = pageNumber;
    }

    this.elementsForCurrentPage = this.getElementsForPage(this.currentPageNumber);
  }

  getElementsForPage(pageNumber) {

    if (this.elements.length > 0) {
      var startPosition = (pageNumber - 1) * this.elementsPerPage;
      var endPosition = pageNumber * this.elementsPerPage;
      return this.elements.slice(startPosition, endPosition);
    }
    return [];
  }

}

export default angular.module('myCouponsApp.pagination', [uiRouter])
  .component('pagination', {
    template: require('./pagination.html'),
    controller: PaginationComponent,
    bindings : {
      elementsPerPage: '<', // one way binding
      elements: '<',
      elementsForCurrentPage: '<'
    }
  })
  .name;
