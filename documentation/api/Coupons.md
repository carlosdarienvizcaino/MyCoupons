**Coupons Resources**

___
**GET** http:domain:port//api/users/:userId/coupons/ids

**Description:** Get the most recent coupon id.

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

**Description:** Get the most recent maxResults coupon ids.
  
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
  
  **Description:** Get the payload for a coupon with the provider id.
    
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
**GET** http:domain:port//api/users/:userId/coupons/minimal/:id
  
  **Description:** Get the minimal information about a coupon given a coupon id.
    
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
      'name': <company name>,
      'domain': <use to find company logo>,
      'subject': <email subject>,
      'snippet': <email snippet>,
      'date': < date email reached google system (date format not decided yet)>,
      'errorMessage': <error message>
    }
 ```
 
 ___
 **POST** http:domain:port//api/users/:userId/coupons/modify
  
  **Description:** Modify all coupons (in ids list) labelIds
    
  *Headers*
  ```json
    Content-Type application/json
    access_token 
  ```
 *Body*
 ```javascript
    {
      'ids': [],
      'addLabelIds': [],
      'removeLabelIds': []
    }
 ```
  *Response*
  ```javascript
    status : 200
    {
    }
 ```
___
**DELETE** http:domain:port//api/users/:userId/coupons/:id
  
  **Description:** Delete a coupon given an id.
    
  *Headers*
  ```json
    Content-Type application/json
    access_token 
  ```
 *Body*
 ```javascript
    {
    }
 ```
  *Response*
  ```javascript
    status : 200
    {
    }
 ```
 ___
 **DELETE** http:domain:port//api/users/:userId/coupons/before/:beforeDate
 
 **Description:** Delete all coupons before a given date.
    
  *Headers*
  ```json
    Content-Type application/json
    access_token 
  ```
 *Body*
 ```javascript
    {
    }
 ```
  *Response*
  ```javascript
    status : 200
    {
    }
 ```
 
