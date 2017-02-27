


var MinimalCouponService = require('./minimal-coupon.service');
var minimalCouponService = new MinimalCouponService();

module.exports = function(req, res){

  var accessToken = req.headers.access_token;
  var userId = req.params.userId;
  var id = req.params.id;


  minimalCouponService.getMinimalCoupon(accessToken, id, userId)
    .then( minimalCoupon => {
      res.status(200).send(minimalCoupon);
    })
    .catch( failedMinimalCoupon => {
      res.status(400).send(failedMinimalCoupon);
    });
};




