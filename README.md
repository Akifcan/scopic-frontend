# This is a [Next.js](https://nextjs.org/) Scopic Task

## Stacks
 - Node.js
 - React.js
 - Nest.js
 - Next.js
 - Postgres
 - Typeorm


## Please first run backend app
`npm run start:dev`

## Please run this endpoint after run backend app

## Postman collection link: [Click](https://we.tl/t-e3W45YlzKH)

`http://localhost:3000/seeder`
`npm run test:e2e`

## Endpoints

- **POST** /product
  - This action will create new product.
```
{
    "name": "wooden bike",
    "description": "old good wooden bike",
    "price": 200,
    "imageUrl": "https://images.unsplash.com/photo-1458228269118-09f55da39bfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "startDate": "2022-03-25 09:30",
    "endDate": "2022-04-25 09:30"
}
```

- **GET** /product?keyword=&sort=&page=1
    - This action will list products
- **GET** /product/3
    - This action will list single product
- **GET** /product/admin
    - This action only for admin users. 
- **DELETE** /product/3
    - This action only for admin users. 
- **POST** /auction
    - This action will make bid
    ```
        {
    "product": {"id": 134},
    "bid": 15602,
    "name": "akif Kara",
    "avatarSrc": "https://images.unsplash.com/photo-1546539782-6fc531453083?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
}
    ```
- **GET** /auction/134
    - This action will list all bids of product.



## Registered users: (this is not database)
```
    interface User {
    name: string,
    avatarSrc: string,
    email: string,
    role: Role,
    password: string,
    autoBidAmount: number
}

const users: User[] = [
    {
        "name": "akifcan",
        avatarSrc: "https://randomuser.me/api/portraits/men/97.jpg",
        email: 'akfkara97@gmail.com',
        role: 'admin',
        password: '12345',
        autoBidAmount: 0,
    },
    {
        "name": "admin",
        avatarSrc: "https://randomuser.me/api/portraits/men/29.jpg",
        email: 'admin@gmail.com',
        role: 'admin',
        password: '12345',
        autoBidAmount: 0,
    },
    {
        "name": "john doe",
        avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
        email: 'john@gmail.com',
        role: 'user',
        password: '12345',
        autoBidAmount: 0,
    },
    {
        "name": "lena",
        avatarSrc: "https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e",
        email: 'lena@gmail.com',
        role: 'user',
        password: '12345',
        autoBidAmount: 0,
    },
    {
        "name": "alex",
        avatarSrc: "https://randomuser.me/api/portraits/men/12.jpg",
        email: 'alex@gmail.com',
        role: 'user',
        password: '12345',
        autoBidAmount: 0,
    },
]
````