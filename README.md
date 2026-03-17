# MyCartBackend
Sample Shopping Cart Project

## API Endpoints

### User Registration

*   **URL:** `/api/users/register`
*   **Method:** `POST`
*   **Content-Type:** `application/json`

**Request Body:**

```json
{
  "username": "exampleUser",
  "phoneNumber": "1234567890",
  "password": "securePassword123",
  "status": "active"
}
```

*   `status` is optional (defaults to "active"). Valid values: "active", "inactive", "suspended".
