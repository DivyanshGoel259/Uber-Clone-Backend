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

### 3. **Get User Profile**

#### **GET** `/api/v1/auth/user/profile`

This endpoint is used to retrieve the profile of the authenticated user.

#### **Headers**

| Header          | Type   | Description                      |
| --------------- | ------ | -------------------------------- |
| `Authorization` | string | Bearer token for authentication. |

#### **Response**

The response will contain the following fields:

| Field       | Type   | Description                                   |
| ----------- | ------ | --------------------------------------------- |
| `email`     | string | The email address of the user.                |
| `firstName` | string | The first name of the user.                   |
| `lastName`  | string | The last name of the user.                    |
| `id`        | string | The unique ID of the user.                    |
| `createdAt` | string | The timestamp when the user was created.      |
| `updatedAt` | string | The timestamp when the user was last updated. |

Example response body:

```json
{
  "data": {
    "email": "example@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2023-10-01T12:00:00Z",
    "updatedAt": "2023-10-01T12:00:00Z"
  }
}
```

In case of an error, the response will contain the following:

Example error response body:

```json
{
  "error": {
    "message": "You are unauthorized"
  }
}
```

### 4. **Logout User**

#### **GET** `/api/v1/auth/logout`

This endpoint is used to log out the authenticated user by invalidating their token.

#### **Headers**

| Header          | Type   | Description                      |
| --------------- | ------ | -------------------------------- |
| `Authorization` | string | Bearer token for authentication. |

#### **Response**

The response will contain the following fields:

| Field  | Type   | Description        |
| ------ | ------ | ------------------ |
| `data` | string | A success message. |

Example response body:

```json
{
  "data": "Logged out successfully"
}
```

In case of an error, the response will contain the following:

Example error response body:

```json
{
  "error": {
    "message": "You are not unauthorized"
  }
}
```

### 5. **Register Captain**

#### **POST** `/api/v1/captain/register`

This endpoint is used to register a new captain.

#### **Request Body**

The following fields are required in the request body:

| Field       | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `email`     | string | The email address of the captain. Must be a valid email.                        |
| `firstName` | string | The first name of the captain. Must be at least 3 characters long.              |
| `lastName`  | string | The last name of the captain.                                                   |
| `password`  | string | The password for the captain. Must be at least 6 characters long.               |
| `color`     | string | The color of the captain's vehicle. Must be at least 3 characters long.         |
| `plate`     | string | The license plate of the captain's vehicle. Must be at least 3 characters long. |
| `capacity`  | number | The seating capacity of the captain's vehicle. Must be at least 1.              |
| `type`      | string | The type of the vehicle. Must be one of `motorcycle`, `auto`, or `car`.         |

Example request body:

```json
{
  "email": "captain@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "password": "securepassword",
  "color": "Blue",
  "plate": "XYZ123",
  "capacity": 4,
  "type": "car"
}
```

#### **Response**

The response will contain the following fields:

| Field     | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| `token`   | string | The authentication token for the captain.      |
| `captain` | object | The captain object containing captain details. |

Example response body:

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "captain@example.com",
      "status": "inactive",
      "vehicle": {
        "id": "123e4567-e89b-12d3-a456-426614174002",
        "color": "Blue",
        "plate": "XYZ123",
        "capacity": 4,
        "type": "car"
      }
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

### 6. **Login Captain**

#### **POST** `/api/v1/captain/login`

This endpoint is used to authenticate an existing captain.

#### **Request Body**

The following fields are required in the request body:

| Field      | Type   | Description                                                       |
| ---------- | ------ | ----------------------------------------------------------------- |
| `email`    | string | The email address of the captain. Must be a valid email.          |
| `password` | string | The password for the captain. Must be at least 6 characters long. |

Example request body:

```json
{
  "email": "captain@example.com",
  "password": "securepassword"
}
```

#### **Response**

The response will contain the following fields:

| Field     | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| `token`   | string | The authentication token for the captain.      |
| `captain` | object | The captain object containing captain details. |

Example response body:

```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "captain@example.com",
      "status": "inactive",
      "vehicle": {
        "id": "123e4567-e89b-12d3-a456-426614174002",
        "color": "Blue",
        "plate": "XYZ123",
        "capacity": 4,
        "type": "car"
      }
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
