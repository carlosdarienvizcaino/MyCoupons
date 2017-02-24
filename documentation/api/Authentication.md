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
