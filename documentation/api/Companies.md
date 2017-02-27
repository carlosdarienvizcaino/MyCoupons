**Companies EndPoints**
___
**GET** http:domain:port//api/users/:userId/companies/newCoupons/:beforeDays

**Description:** Gets a list of companies sort by domain with their new coupons before a given day. 
  
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
