# Dagens Job Test

Hi applicant!

This repo contains the starter code for Dagens job test, as well as the task description. Please see README.md in `server/` and `client/` folders on how to install dependencies and start the server and client. The intention with this test is to have a look at how you solve a pretty straight forward problem, and then discuss it afterwards.

- The server has an _in-memory_ "database"-array with 1000 products. This is your database, you are **not** supposed to set up any database service like MongoDB or write to file or persist data in any way. Simply perform all operations on the in-memory "database"-array.

- We're using the three categories `<meat, greens, fish>` in the pre-populated database, but feel free to let the user add more categories if you like - no right or wrong.

- Styling/CSS is _not_ important.

- Adding too much abstraction, handling every possible error and adding validation for every input and endpoint won't give you any extra points.

### Tasks

#### 1. Users should be able to create products from a form page. The products should be appended to the database (see `server/db.js`).

- client runs in the browser on localhost:3000
- From the form, submitted data is sent as a POST request to the backend- with a endpoint: localhost:3001/api/:create where it is appended to the database.
  <img src="client\public\client_screenshot.png" alt="client-screenshot">

#### 2. Create one endpoint to get products. It should be possible to filter by category, maximum and minimum price. The endpoint should be paged with a page size of 24 products per page. No need to write frontend code.

- endpoint for getting all products http://localhost:3001/api/products
- Additional filters- category, min, max price, page size(default=24), and page (filters are added as express middleware)
- Returns- total results, currently displayed results, and actual results.
  - example URL: http://localhost:3001/api/products?category=meat&maxPrice=500&minPrice=100&limit=5&page=2
  - example result:

```
{
"totalResults": 116,
"displayedResults": "5 to 10",
"result": [
{
"id": "f715571b-a447-4ee6-a0cf-d18459f71092",
"name": "deer",
"category": "meat",
"price": 362
},
{
"id": "d5d009f2-80dc-4229-a6c5-15a6a96751f3",
"name": "piglet",
"category": "meat",
"price": 361
},
{
"id": "3660d91a-b8b4-4789-ab48-e0b60bef19b7",
"name": "goatling",
"category": "meat",
"price": 449
},
{
"id": "bc50be9b-8f46-43e7-ad2e-fc82c4d4b9d7",
"name": "goatling",
"category": "meat",
"price": 124
},
{
"id": "4bd9b156-6a1b-4908-878d-d8cebf99ee8d",
"name": "reindeer",
"category": "meat",
"price": 443
}
]
}
```

#### 3. Create one endpoint that takes a product id parameter and returns the `N` products with nearest price in the same category. You can choose `N` yourself. No need to write frontend code.

- endpoint for getting one product-http://localhost:3001/api/product/:id
- number of products returned are decided by a "limit" parameter and sorted based on the product nearest in price.
- Returns- product matched to searched ID, total number of products in the same category and currently displayed results
  - example URL: http://localhost:3001/api/product/bec7ab80-83a2-46f4-8cce-a95e652b2ae5?page=1&limit=5
  - example results:
  ```
  {
  "product": {
  "id": "bec7ab80-83a2-46f4-8cce-a95e652b2ae5",
  "name": "chicken",
  "category": "meat",
  "price": 107
  },
  "totalResults": 310,
  "displayedResults": "0 to 5",
  "result": [
  {
  "id": "ccc8dd3d-cc4a-4818-b3fd-752a1797dd25",
  "name": "pork",
  "category": "meat",
  "price": 107
  },
  {
  "id": "9dc7cdd5-ef2d-4f0d-b181-4c998f840413",
  "name": "chicken",
  "category": "meat",
  "price": 102
  },
  {
  "id": "48e31eaa-c964-41ad-b65b-172565556436",
  "name": "deer",
  "category": "meat",
  "price": 102
  },
  {
  "id": "5299d33e-b189-4c05-a0c0-6a84f6ff0822",
  "name": "reindeer",
  "category": "meat",
  "price": 100
  },
  {
  "id": "2dc112c5-fcee-4808-85ac-3a785665d802",
  "name": "piglet",
  "category": "meat",
  "price": 99
  }
  ]
  }

### Delivery

Clone the repo, solve the tasks and push your code to a public GitHub repo, Bitbucket repo, or similar. Send a link to the solution to Dagens.
