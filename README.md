# node-project-fuerzastudio
# Presentation
This project consists of a Restful API developed using Node.js as the main technology.

The project does not use any kind of database for information persistence, so the data is kept in memory and restarted every time the server is launched.

A model structure was created for the project, in order to mimic the most common structures, something close to: https://mongoosejs.com/docs/guide.html

Below are the guides for installing, testing and starting the server, as well as the route documentation.

# Installation
Clone the project: `git clone https://github.com/exothinking/node-project-fuerzastudio.git`

Go to project dir: `cd node-project-fuerzastudio`

Install dependencies: `npm install`

Run the project: `npm start`

Project route: `localhost:3000`

# Testing the API
Testing API routes: `npm test`

# Routes
## GET /api/posts
```
queryParams: {
  page: number,
  pageSize: number
}
```
### Exemple
`GET localhost:3000/api/posts/?page=1&pageSize=2`

**Return**
```
{
    "items": [
        {
            "id": 0,
            "title": "My First Post",
            "body": "Lorem ipsun",
            "tags": [
                "First",
                "Post",
                "Lorem ipsun"
            ]
        },
        {
            "id": 1,
            "title": "My Second Post",
            "body": "Lorem ipsun",
            "tags": [
                "Second",
                "Post",
                "Lorem ipsun"
            ]
        }
    ],
    "currentPage": 1,
    "pageSize": 2
}
```

## GET /api/posts/:id
```
// page and pageSize params will be ignored
queryParams: {}
```
### Exemple
`GET localhost:3000/api/posts/2`

**Return**
```
{
    "items": [
        {
            "id": 2,
            "title": "My Third Post",
            "body": "Lorem ipsun",
            "tags": [
                "Third",
                "Post",
                "Lorem ipsun"
            ]
        }
    ],
    "currentPage": 1,
    "pageSize": 3
}
```
## POST /api/posts
```
queryParams: {};
bodyParams: {
  "title": string,
  "body": string,
  "tags"?: string[] | undefined
}
```
### Exemple
`POST localhost:3000/api/posts`
```
body: {
  "title": "My Sixth Post",
   "body": "Body ok",
   "tags": ["ok", "1"]
}
```

**Return**
```
{
    "id": 7,
    "title": "My Sixth Post",
    "body": "Body ok",
    "tags": [
        "ok",
        "1"
    ]
}
```
## PUT /api/posts
```
queryParams: {};
bodyParams: {
  "title": string,
  "body": string,
  "tags"?: string[] | undefined
}
```
### Exemple
`PUT localhost:3000/api/posts/2`
```
body: {
    "title": "My Altered Post",
    "body": "Body ok"
}
```

**Return**
```
{
    "id": 2,
    "title": "My Altered Post",
    "body": "Body ok",
    "tags": [
        "Third",
        "Post",
        "Lorem ipsun"
    ]
}
```
## DELETE /api/posts
```
queryParams: {};
bodyParams: {}
```
### Exemple
`DELETE localhost:3000/api/posts/3`

**Return**
```
OK
```
# Final considerations
Routes that require a post ID will return `404 Not found` when the ID is not sent, or an invalid or non-existent ID is sent.

Routes that require data of a specific type in the request body will return `400 Bad request` when the data is not sent properly.
