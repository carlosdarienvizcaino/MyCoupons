**Companies EndPoints**
___
**GET** http:domain:port//api/users/:userId/companies/new/:afterDate

**Description:** Get new coupons per company after a date.
  
  *Headers*
  ```json
    Content-Type application/json
    access_token 
  ```
 *Response*
 ```javascript
    status : 200
    {
      'companies': [
        {
          domain : <string>,
          name: <string>,
          newTotalCoupons: <number>,
          newCouponsIds : []
        },
      ],
      'errorMessage': <error message>
    }
 ```
___ 
**GET** http:domain:port//api/users/:userId/companies/:afterDate

**Description:** Get new new and total coupons per company after a given date.
  
  *Headers*
  ```json
    Content-Type application/json
    access_token 
  ```
 *Response*
 ```javascript
    status : 200
    {
      'companies': [
        {
          domain : <string>,
          name: <string>,
          newTotalCoupons: <number>,
          newCouponsIds : [],
          usedTotalCoupons: <number>,
          usedCouponsIds : []
        },
      ],
      'errorMessage': <error message>
    }
 ```
