---

## Базовый URL
`http://localhost:3022`

---

## Аутентификация

### POST `/login` — Вход пользователя

**Описание:** Аутентификация пользователя и получение JWT токена.

**Request**

```http
POST /login
Content-Type: application/json
Accept: application/json

{
  "username": "nikita420",
  "password": "Arhiv420"
}
```

**Curl-пример**

```bash
curl -X 'POST' \
  'http://localhost:3022/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "nikita420",
  "password": "Arhiv420"
}'
```

**Response 200 (application/json)**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Users

### GET `/me/bookings` — Получить список бронирований пользователя

**Описание:** Возвращает список бронирований текущего (аутентифицированного) пользователя. Требуется авторизация.

**Request**

```http
GET /me/bookings
Authorization: Bearer <JWT>
Accept: application/json
```

**Response 200 (application/json)**

```json
[
  {
    "id": 1,
    "movieSessionId": 2,
    "seats": [{ "rowNumber": 3, "seatNumber": 5 }]
  }
]
```

---

## Movie Sessions (Киносеансы)

### GET `/movieSessions/{movieSessionId}` — Детали киносеанса

**Описание:** Детали киносеанса, включая информацию о размерах зала и занятых местах.

**Path parameters**

- `movieSessionId` (integer) — id сеанса.

**Request**

```http
GET /movieSessions/1
Accept: application/json
```

**Response 200 (application/json)**

```json
{
  "id": 1,
  "movieId": 1,
  "cinemaId": 1,
  "startTime": "2025-10-29T07:00:00.000Z",
  "seats": {
    "rows": 8,
    "seatsPerRow": 10
  },
  "bookedSeats": []
}
```

**Response 404**

```json
{ "error": "Not Found" }
```

---

### POST `/movieSessions/{movieSessionId}/bookings` — Забронировать места

**Описание:** Бронирует указанные места на киносеанс для аутентифицированного пользователя. Требуется авторизация (Bearer token).

**Path parameters**

- `movieSessionId` (integer) — id сеанса.

**Request body**

```json
{
  "seats": [
    { "rowNumber": 1, "seatNumber": 5 },
    { "rowNumber": 1, "seatNumber": 6 }
  ]
}
```

**Request**

```http
POST /movieSessions/1/bookings
Authorization: Bearer <JWT>
Content-Type: application/json
Accept: application/json

{ "seats": [ { "rowNumber":1, "seatNumber":5 } ] }
```

**Responses**

- `200` — успешное бронирование
- `404` — сеанс не найден

---

## Models

### MovieSession

```json
{
  "id": "integer",
  "movieId": "integer",
  "cinemaId": "integer",
  "startTime": "string (date-time)",
  "seats": { "rows": "integer", "seatsPerRow": "integer" },
  "bookedSeats": [{ "rowNumber": "integer", "seatNumber": "integer" }]
}
```

### Seat

```json
{
  "rowNumber": "number",
  "seatNumber": "number"
}
```

### ErrorResponse

```json
{
  "message": "string",
  "error": "string"
}
```

---

## Примеры

- Получение JWT: `POST /login`
- Список бронирований: `GET /me/bookings`
- Детали сеанса: `GET /movieSessions/{id}`
- Бронирование: `POST /movieSessions/{id}/bookings`
  """
