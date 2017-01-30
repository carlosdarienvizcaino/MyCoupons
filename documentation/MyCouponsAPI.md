
# MyCoupons API Doc


### Implemented

**GET** http:domain:port//api/users/:userId/coupons/ids

  *Description:* Get the most recent coupon id

**GET** http:domain:port//api/users/:userId/coupons/ids/:maxResults
  
  *Description:* Get the most recent maxResults coupon ids

**GET** http:domain:port//api/users/:userId/coupons/:id
  
  *Description:* Get the payload for a coupon with the provider id

### To be Implemented

**DELETE** http:domain:port//api/users/:userId/coupons/after/:startDate
