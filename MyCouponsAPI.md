
# MyCoupons API Doc


### Implemented

**GET** http:domain:port//api/user/:userId/couponsId/

  *Description:* Get the latest coupon id

**GET** http:domain:port//api/user/:userId/couponsId/:maxResults
  
  *Description:* Get the latest maxResults coupon ids

**GET** http:domain:port//api/user/:userId/coupon/:id
  
  *Description:* Get the payload for a coupon with the provider id

### To be Implemented

**DELETE** http:domain:port//api/user/:userId/coupon/:id

**DELETE** http:domain:port//api/user/:userId/coupon/:query?[:id]

**DELETE** http:domain:port//api/user/:userId/coupon/:startDate
