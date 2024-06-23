# Server

This is the server part of the project. It is responsible for handling the requests from the client and sending the appropriate responses. It is also responsible for handling the database operations.

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Starting the server

To start the server, run the following command:

```bash
npm run dev
```

## API Endpoints

The server has the following API endpoints:

`GET /api/v1/genres`

Description:
Gets a list of all genres, optional query parameter is the name of the genre.

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/genres?name=Action')
```

Example response:
```json
[
  {
    "id": 1,
    "name": "Action"
  }
]
```

`GET /api/v1/genres/:id`

Description:
Gets a genre by its id.

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/genres/1')
```

Example response:
```json
{
  "id": 1,
  "name": "Action"
}
```

`GET /api/v1/users`

Description: Gets a list of all users.

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/users')
```

Example response:
```json
[
    {
        "id": 1,
        "firstname": "Keagan",
        "lastname": "Mulder"
    },
    {
        "id": 2,
        "firstname": "Joey",
        "lastname": "Mulder"
    },
    {
        "id": 3,
        "firstname": "Alice",
        "lastname": "Smith"
    },
    {
        "id": 4,
        "firstname": "Bob",
        "lastname": "Smith"
    }
]
```

`GET /api/v1/users/:id`

Description: Gets a user by its id.

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/users/1')
```

Example response:
```json
{
    "id": 1,
    "firstname": "Keagan",
    "lastname": "Mulder"
}
```

`PUT /api/v1/users/:id`

Description: Updates a user by its id. Pass the user data in the request body.

Statuscodes:
- 200: The request was successful.
- 400: Bad request.

Example:
```bash
fetch('http://localhost:3000/api/v1/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstname: 'John',
    lastname: 'Doe'
  })
})
```

Example response: 
```json
{
    "id": 1,
    "firstname": "John",
    "lastname": "Doe"
}
```

`GET /api/v1/movies`

Description: Gets a list of all movies, optional query parameters are the genre id, page and per_page (can be used when paginating).

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/movies?genreId=1&page=1&per_page=2')
```

Example response:
```json
[
  {
    "id": 2,
    "title": "The Matrix",
    "description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    "thumbnail": "src/images/matrix.jpg",
    "year": 1999,
    "link": "https://www.youtube.com/embed/vKQi3bBA1y8?si=inTT0rZJ1gWIRZIP",
    "genre_id": 4
  },
  {
    "id": 3,
    "title": "The Conjuring",
    "description": "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    "thumbnail": "src/images/conjuring.jpg",
    "year": 2013,
    "link": "https://www.youtube.com/embed/k10ETZ41q5o?si=vJYiLKY7FZP9NWnG",
    "genre_id": 2
  }
]
```

`GET /api/v1/movies/:id`

Description: Gets a movie by its id.

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/movies/1')
```

Example response:
```json
{
    "id": 1,
    "title": "The Terminator",
    "description": "A cyborg assassin is sent back in time to kill Sarah Connor, whose unborn son is destined to lead the",
    "thumbnail": "src/images/terminator.jpg",
    "year": 1984,
    "link": "https://www.youtube.com/embed/k64P4l2Wmeg?si=3Wl_SzCnYvijJOej",
    "genre_id": 1
}
```

`GET /api/v1/watchlists`

Description: Gets a list of all watchlists.

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/watchlists')
```

Example response:
```json
[
  {
    "id": 3,
    "user_id": 2,
    "movie_id": 3
  },
  {
    "id": 4,
    "user_id": 3,
    "movie_id": 4
  },
  {
    "id": 5,
    "user_id": 4,
    "movie_id": 1
  },
  {
    "id": 6,
    "user_id": 4,
    "movie_id": 3
  }
]
```

`GET /api/v1/watchlists/:userId`

Description: Gets a watchlist by the user id.

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/watchlists/1')
```

Example response:
```json
[
  {
    "id": 50,
    "user_id": 1,
    "movie_id": 3
  },
  {
    "id": 51,
    "user_id": 1,
    "movie_id": 4
  }
]
```

`GET /api/v1/watchlists/:userId/movies`

Description: Gets a list of all movies in the watchlist of the user.

Statuscodes:
- 200: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/watchlists/1/movies')
```

Example response:
```json
[
  {
    "id": 3,
    "title": "The Conjuring",
    "description": "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    "thumbnail": "src/images/conjuring.jpg",
    "year": 2013,
    "link": "https://www.youtube.com/embed/k10ETZ41q5o?si=vJYiLKY7FZP9NWnG",
    "genre_id": 2
  },
  {
    "id": 4,
    "title": "The Hangover",
    "description": "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
    "thumbnail": "src/images/hangover.jpg",
    "year": 2009,
    "link": "https://www.youtube.com/embed/tcdUhdOlz9M?si=x0XB89_d72YGWzd7",
    "genre_id": 3
  }
]
```

`POST /api/v1/watchlists/:userId/:movieId`

Description: Adds a movie to the watchlist of the user.

Statuscodes:
- 201: The request was successful.
- 409: Conflict.

Example:
```bash
fetch('http://localhost:3000/api/v1/watchlists/1/1', {
  method: 'POST'
})
```

Example response:
```json
{
    "id": 52,
    "user_id": 1,
    "movie_id": 1
}
```

`DELETE /api/v1/watchlists/:userId/:movieId`

Description: Removes a movie from the watchlist of the user.

Statuscodes:
- 201: The request was successful.
- 404: Not found.

Example:
```bash
fetch('http://localhost:3000/api/v1/watchlists/1/1', {
  method: 'DELETE'
})
```

Example response:
```json
{
  "message": "Movie removed from user watchlist"
}
```

## Design Decisions

### Restful API Structure
The server follows a RESTful API design pattern, with clear and consistent endpoints for CRUD operations. This design
decision ensures that the API is intuitive and follows standard conventions, making it easier for developers to
understand and use.

### Separation of Concerns
The server's responsibilities are clearly divided into handling client requests, processing database operations,
and managing responses. This separation of concerns improves maintainability and scalability of the codebase.

### Consistent Status Codes
Each endpoint returns appropriate HTTP status codes
(e.g., 200 for success, 404 for not found, 400 for bad request, 409 for conflict). This consistency helps in accurately
conveying the result of an operation to the client, enabling better error handling and debugging.