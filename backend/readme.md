## Install instructions

- Install mongodb:
    https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.6-signed.msi
- Install NodeJs:
    https://nodejs.org/dist/v12.16.3/node-v12.16.3-x64.msi


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

- Node
- Express
- Vue (Nuxt?)
- REST API
- Websocket


## Data models

User:
- status message
- name
- city, phone num, email
- friends[] 
- private messages[]


Message:
- from
- to
- message (html)