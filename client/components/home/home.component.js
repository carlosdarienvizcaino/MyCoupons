/**
 * Created by NicholasSmith on 2/5/17.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './home.routes';

export class HomeComponent {
  fields = [{
    title: 'Coupon 1',
    image: 'https://static.pexels.com/photos/46710/pexels-photo-46710.jpeg',
    description: 'This is descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat a nice description about what a typical coupon might have. Something that has a lot of words and is in a paragraph fashion.',
    expiration: '5/1/2017',
    link: 'http://www.macys.com'
  },
    {
      title: 'Coupon 2',
      image: 'http://i2.cdn.cnn.com/cnnnext/dam/assets/160825160953-05-week-in-photos-0826-super-169.jpg',
      description: 'DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION',
      expiration: '6/1/2017',
      link: 'http://www.yahoo.com'
    },
    {
      title: 'Coupon 3',
      image: 'http://www.scubadiving.com/sites/scubadiving.com/files/styles/medium_4x3/public/images/2016/11/jellyfish-underwater-poisonous-mushroom-photo-contest-janjarasskuljpg.jpg?itok=YmOjGPj5&fc=51,35',
      description: 'THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS ',
      expiration: '7/1/2017',
      link: 'http://www.espn.com'
    },
    {
      title: 'Coupon 4',
      image: 'https://static.pexels.com/photos/68672/beach-beverage-caribbean-cocktail-68672.jpeg',
      description: 'TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST ',
      expiration: '8/1/2017',
      link: 'http://www.my.ufl.edu'
    }
  ];
  amountTiles = [1];
}

export default angular.module('myCouponsApp.home', [uiRouter])
  .config(routing)
  .component('home', {
    template: require('./home.html'),
    controller: HomeComponent
  })
  .name;
