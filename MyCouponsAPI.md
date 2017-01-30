
# MyCoupons API Doc


### Implemented

**GET** http:domain:port//api/user/:userId/coupons/id/

  *Description:* Get the most recent coupon id

**GET** http:domain:port//api/user/:userId/coupons/id/:maxResults
  
  *Description:* Get the most recent maxResults coupon ids

**GET** http:domain:port//api/user/:userId/coupons/:id
  
  *Description:* Get the payload for a coupon with the provided id

### To be Implemented

**DELETE** http:domain:port//api/user/:userId/coupons/older/:startDate
