# orders-unimag-backend

Development of an apirest for the fullstack technical test of the Universidad Del Magdalena.

## Working with Docker Engine and docker-compose

First we need to have Docker installed on our machines.

## Dev Environment

```bash
docker compose -f docker-compose-dev.yml up
```

Or deamon mode:

```bash
docker compose -f docker-compose-dev.yml up -d
```

## Prod Environment

```bash
docker compose up
```

You can test the api in the [localhost:3000](https://localhost:3000)


## API Reference

### Register

```http
  POST localhost:3000/auth/register
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. |
| `dni`     | `string` | **Required**. |
| `phone`   | `string` | **Required**. |
| `password`| `string` | **Required**. |
| `address` | `string` | **Required**. |

#### Response 
```javascript
{
  "message": string,
  "id": string,       /* uuid auto-generated */
}
```


### Login

```http
  POST localhost:3000/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `phone`   | `string` | **Required**. |
| `password`| `string` | **Required**. |

#### Response 
```javascript
{
  "message" : string,
  "token": string,          /* JWT Token */
}
```

### Logout

```http
  GET localhost:3000/auth/logout
```
#### Response 
```javascript
{
  "message" : string,
}
```

### Me

```http
  GET localhost:3000/users
```
#### Response 
```javascript

{
  "user": {
    "uuid": string,
    "name": string,
    "rol": string
  },
  "message": string
}

```


## Authors
[@anuarserp](https://www.github.com/anuarserp)
