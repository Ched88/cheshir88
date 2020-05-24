## Install instructions

- Install mongodb:
    https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.6-signed.msi
- Open MongoDB UI
    Create new database with name "fine-chat"
- Install NodeJs:
    https://nodejs.org/dist/v12.16.3/node-v12.16.3-x64.msi
- [optional] install Postman for REST API testing

## Run instructions

- npm install
- npm run dev


## Implementation steps

- Install mongo
- Implement open html page from Express
- Implement user endpoint
- Implement user login
- Implement global chat
- Implement private chat


## Technology stack

[x] Node
[x] Express
[ ] Vue (Nuxt?)
[x] REST API
[ ] Websocket


## Data models

User:
- status
- name
- city, phone num, email
- friends[] 

Message:
- from
- to
- text


## Endpoints

### Users

#### Get all users
GET `http://localhost:3000/users/`

#### Get one user by ID
GET `http://localhost:3000/users/<user_id>`

#### Add new user
PUT `http://localhost:3000/users`
Body example:
```
{
    "name": "Valerii",
    "active": true,
    "status": "128",
    "city": "Lviv",
    "phone": "+380972222233",
    "email": "2@2.com",
    "friends": [
        { "id": "123" }
    ]
}
```

#### Update user by ID
POST `http://localhost:3000/users/<user_id>`
Body example:
```
{
    "name": "Valerii",
    "active": true,
    "status": "128",
    "city": "Lviv",
    "phone": "+380972222233",
    "email": "2@2.com",
    "friends": [
        { "id": "123" }
    ]
}
```

### Messages

#### Get all public messages
GET `http://localhost:3000/messages`

#### Get all private messages from User1 to User2
GET `http://localhost:3000/messages/<user1_id>/<user2_id>`

#### Post new public message from User
POST `http://localhost:3000/messages/<user_id>`
```
Body example:
{
    "text": "bla bla"
}
```

#### Post new private message from User1 to User2
POST `http://localhost:3000/messages/<user1_id>/<user2_id>`
Body example:
```
{
    "text": "bla bla"
}
```