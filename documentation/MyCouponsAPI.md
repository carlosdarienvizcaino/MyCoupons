
# MyCoupons API Doc


### Implemented

**GET** http:domain:port//api/users/:userId/coupons/ids

  **Description:** Get the most recent coupon id
  
  *Headers:*
  ```json
    Content-Type application/json
    access_token 
  ```
  *Response:* 
  ```javascript
     [
      {
        'id': <email id>,
        'threadId': <email thread id> 
      }
     ]
  ```
___
**GET** http:domain:port//api/users/:userId/coupons/ids/:maxResults
  
  **Description:** Get the most recent maxResults coupon ids
  
  *Headers:*
  ```json
    Content-Type application/json
    access_token 
  ```
  *Response:* 
  ```javascript
     [
      {
        'id': <email id>,
        'threadId': <email thread id>
      },
     ]
  ```
___
**GET** http:domain:port//api/users/:userId/coupons/:id
  
  **Description:** Get the payload for a coupon with the provider id
  
  *Headers:*
  ```json
    Content-Type application/json
    access_token 
  ```
  *Response:* 
  ```javascript
     {
      'sub': '<user subject id>',
      'data': '<email payload>'
     }
  ```
___
### To be Implemented

**DELETE** http:domain:port//api/users/:userId/coupons/after/:startDate
