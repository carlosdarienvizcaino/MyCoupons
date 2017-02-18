/**
 * Created by NicholasSmith on 2/18/17.
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './miniCoupon.routes';

export class miniCouponComponent {
  fields = [{
    title: 'Coupon 1',
    image: 'https://static.pexels.com/photos/46710/pexels-photo-46710.jpeg',
    description: 'This is descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat descripFormat a nice description about what a typical coupon might have. Something that has a lot of words and is in a paragraph fashion.',
    expiration: '5/1/2017',
    link: 'http://www.macys.com',
    phone: '(305) 123-4567',
    address: '345 S Main Street Bootsnippville, UT',
    logo: 'http://www.fetchlogos.com/wp-content/uploads/2015/12/Macy%E2%80%99s-Logo.jpg'
  },
    {
      title: 'Coupon 2',
      image: 'http://i2.cdn.cnn.com/cnnnext/dam/assets/160825160953-05-week-in-photos-0826-super-169.jpg',
      description: 'DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION',
      expiration: '6/1/2017',
      link: 'http://www.yahoo.com',
      phone: '(305) 123-4567',
      address: '345 S Main Street Bootsnippville, UT',
      logo: 'http://logonoid.com/images/sports-authority-logo.png'
    },
    {
      title: 'Coupon 3',
      image: 'http://www.scubadiving.com/sites/scubadiving.com/files/styles/medium_4x3/public/images/2016/11/jellyfish-underwater-poisonous-mushroom-photo-contest-janjarasskuljpg.jpg?itok=YmOjGPj5&fc=51,35',
      description: 'THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS THIS ',
      expiration: '7/1/2017',
      link: 'http://www.espn.com',
      phone: '(305) 123-4567',
      address: '345 S Main Street Bootsnippville, UT',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Walgreens_Logo.svg/1280px-Walgreens_Logo.svg.png'
    },
    {
      title: 'Coupon 4',
      image: 'https://static.pexels.com/photos/68672/beach-beverage-caribbean-cocktail-68672.jpeg',
      description: 'TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST ',
      expiration: '8/1/2017',
      link: 'http://www.my.ufl.edu',
      phone: '(305) 123-4567',
      address: '345 S Main Street Bootsnippville, UT',
      logo: 'https://lh5.googleusercontent.com/-wvbdzyqNqGM/AAAAAAAAAAI/AAAAAAAAAw8/ZiLMwL2Tw8c/s0-c-k-no-ns/photo.jpg'
    }
  ];
  amountTiles = [1];
  //CARLOS: THIS IS THE BUTTON FUNCTION TO SHOW ORIGINAL COUPON
  showCoupon = function() {
    console.log('here');
  }
}

export default angular.module('myCouponsApp.miniCoupon', [uiRouter])
  .config(routing)
  .component('miniCoupon', {
    template: require('./miniCoupon.html'),
    controller: miniCouponComponent
  })
  .name;
