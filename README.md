# Uber Clone API Documentation

## Endpoints

### 1. **Register User**

#### **POST** `/api/v1/auth/register`

This endpoint is used to register a new user.

#### **Request Body**

The following fields are required in the request body:

| Field       | Type   | Description                                                     |
| ----------- | ------ | --------------------------------------------------------------- |
| `email`     | string | The email address of the user. Must be a valid email.           |
| `firstName` | string | The first name of the user. Must be at least 3 characters long. |
| `password`  | string | The password for the user. Must be at least 6 characters long.  |

The following field is optional:

| Field      | Type   | Description                |
| ---------- | ------ | -------------------------- |
| `lastName` | string | The last name of the user. |

Example request body:

```json
{
  "email": "example@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123"
}
```

#### **Response**

The response will contain the following fields:

| Field   | Type   | Description                              |
| ------- | ------ | ---------------------------------------- |
| `token` | string | The authentication token for the user.   |
| `user`  | object | The user object containing user details. |

Example response body:

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "example@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
  }
}
```

In case of an error, the response will contain the following:

Example error response body:

```json
{
  "error": {
    "message": "Email Already Exists"
  }
}
```

### 2. **Login User**

#### **POST** `/api/v1/auth/login`

This endpoint is used to authenticate an existing user.

#### **Request Body**

The following fields are required in the request body:

| Field      | Type   | Description                                                    |
| ---------- | ------ | -------------------------------------------------------------- |
| `email`    | string | The email address of the user. Must be a valid email.          |
| `password` | string | The password for the user. Must be at least 6 characters long. |

Example request body:

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

#### **Response**

The response will contain the following fields:

| Field   | Type   | Description                              |
| ------- | ------ | ---------------------------------------- |
| `token` | string | The authentication token for the user.   |
| `user`  | object | The user object containing user details. |

Example response body:

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "example@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2023-10-01T12:00:00Z",
      "updatedAt": "2023-10-01T12:00:00Z"
    }
  }
}
```

In case of an error, the response will contain the following:

Example error response body:

```json
{
  "error": {
    "message": "Invalid email or password"
  }
}
```
