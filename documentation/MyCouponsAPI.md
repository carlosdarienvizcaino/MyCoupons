
# MyCoupons API Doc


### Implemented

___
**GET** http:domain:port//api/users/:userId/coupons/ids

  **Description:** Get the most recent coupon id
  
  *Headers*
  ```json
    Content-Type application/json
    access_token 
  ```
 *Response*
 ```javascript
    status : 200
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
  
  *Headers*
  ```json
    Content-Type application/json
    access_token 
  ```
 *Response*
 ```javascript
    status : 200
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
    
  *Headers*
  ```json
    Content-Type application/json
    access_token 
  ```
 *Response*
 ```javascript
    status : 200
    {
      'id': <email id>,
      'data': [
               'base64Url string',
               'base64Url string'
              ],
      'errorMessage': <error message>
    }
 ```
 
 ___
**POST** http:domain:port//api/auth/authcode
  
  **Description:** Get the payload for a coupon with the provider id
    
  *Headers*
  ```json
    Content-Type application/json 
  ```
  
  *Body*
  ```javascript
     {
      'authCode': <user one time authentication code provided by google>
     }
  ```
  
 *Response*
 ```javascript
    status : 200
    {
      'sub': <user subject id>,
      'access_token': <user access token>
    }
 ```

### To be Implemented

**DELETE** http:domain:port//api/users/:userId/coupons/after/:startDate
