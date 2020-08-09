## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## APIs

### PRODUCT CRUD
- __`[POST] http://localhost:3000/api/products`__
- payload
```
  {
    "name": "Product-E",
    "price": 25,
    "rules": [
      "item": "Product-A"
      "discountPrice": 5
      "quantityForDiscount": 3
    ]
  }
```
- rules for an Item has to be passed as in array of object in the above stated format. In case a product doesn't have discount rules then an empty array should be passed `[]`.

___
- __`[GET] http://localhost:3000/api/products`__
- Get list of all products

___
- __`[GET] http://localhost:3000/api/products/:id`__
- Get a single product based on ID.

___
- __`[PUT] http://localhost:3000/api/products/:id`__
- Update a product based on ID.

___
- __`[DELETE] http://localhost:3000/api/products/:id`__
- Delete a product.

___

### CART APIs
- __`[POST] http://localhost:3000/api/carts/add-items`__
- add items to Cart
- payload
```
{
	"items": [
		{
			"item": "Product-C",
			"id": 3
		},
		{
			"item": "Product-A",
			"id": 1
		},
		{
			"item": "Product-D",
			"id": 5
		},
		{
			"item": "Product-A",
			"id": 1
		},
		{
			"item": "Product-A",
			"id": 1
		},
		{
			"item": "Product-E",
			"id": 6
		}
	]
}
```

___

- __`[GET] http://localhost:3000/api/carts/:id`__
- get Cart Record.

___
### Checkout API

- __`[GET] http://localhost:3000/api/carts/:id/checkout`__
- Checkout cart of the given ID.
- Resonse
```
[
    {
        "name": "Product-C",
        "quantity": 1,
        "price": 50,
        "discount": 0,
        "final_total_price_for_item": 50
    },
    {
        "name": "Product-A",
        "quantity": 3,
        "price": 90,
        "discount": 15,
        "final_total_price_for_item": 75
    },
    {
        "name": "Product-D",
        "quantity": 1,
        "price": 15,
        "discount": 0,
        "final_total_price_for_item": 15
    },
    {
        "name": "Product-E",
        "quantity": 1,
        "price": 27,
        "discount": 0,
        "final_total_price_for_item": 27
    },
    {
        "total": 147,
        "total_discount": 35
    }
]
```

## Assumtions taken
- Each product can have at max one discount rule. Based on this assumption, we are just checking the first rule of a product.
- Total discount rule, is provided by the application and the USER cannot Create it. Thus is rule is hardcoded as a constant.

## License

  Nest is [MIT licensed](LICENSE).
