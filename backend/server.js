const express = require('express');
const mongo = require('mongodb');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();


var port = 3000;
var dbUrl = 'mongodb://zz28:123456z@ds233238.mlab.com:33238/fine-chat'
var dbName = 'fine-chat';
var frontendUrl = 'http://localhost:8080';


app.use(express.json());
app.use(cookieParser());


mongo.MongoClient.connect(dbUrl, (err, client) => {
  if (err) throw err;
  
  const db = client.db(dbName);
  console.log('Connected to MongoDB: ' + dbUrl + '/' + dbName);

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', frontendUrl);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  // Register http://localhost:3000/register/
  app.post('/register', async (req, res) => {
    var user = await db.collection('users').findOne({
      login: req.body.login,
    });

    if (user !== null) {
      res.status(500).json({message:"already exist"});
    } else {
      newToken = uuidv4();

      var newUser = {
        login: req.body.login,
        password: req.body.password,
        token: newToken,
        name: req.body.login,
        active: true,
        status: '',
        city: '',
        phone: '',
        email: '',
        friends: []
      };

      var result = await db.collection('users').insertOne(newUser);
      var user = result.ops[0];
      res.json({
        id: user._id,
        token: newToken
      });
    }
  });

  // Login http://localhost:3000/login/
  app.post('/login', async (req, res) => {
    var user = await db.collection('users').findOne({
      login: req.body.login,
      password: req.body.password,
    });

    if (user === null) {
      res.status(500).json({});
    } else {
      newToken = uuidv4();
      user.token = newToken;

      await db.collection('users').replaceOne(
        { _id: user._id },
        user
      );
      res.json({
        id: user._id,
        token: newToken
      });
    }
  });
  
  // Get all users: http://localhost:3000/users/
  app.get('/users', async (req, res) => {
    var result = await db.collection('users').find().toArray();
    var users = result.map(u => { 
      return {
        id: u._id,
        name: u.name
      };
    });
    res.json(users);
  });

  // Get one user by ID: http://localhost:3000/users/5eca6d7ac4af8618503b323e
  app.get('/users/:id', async (req, res) => {
    var result = await db.collection('users').find().toArray();
    var userNames = {};
    result.forEach(u => userNames[u._id] = u.name);

    var userId = new mongo.ObjectID(req.params.id);
    var result = await db.collection('users').findOne({ '_id': userId });
    var user = {
      id: result._id,
      login: result.login,
      name: result.name,
      active: result.active,
      status: result.status,
      city: result.city,
      phone: result.phone,
      email: result.email,
      friends: result.friends.map(u => {
        return {
          id: u.id,
          name: userNames[u.id]
        };
      }),
    };
    res.json(user);
  });
  
  // Update user by ID: http://localhost:3000/users/5eca6d7ac4af8618503b323e
  app.post('/users/:id', async (req, res) => {
    var userId = new mongo.ObjectID(req.params.id);
    var userToken = req.cookies.userToken;
    var user = {
      name: req.body.name,
      active: req.body.active,
      status: req.body.status,
      city: req.body.city,
      phone: req.body.phone,
      email: req.body.email,
      friends: req.body.friends,
    };

    var result = await db.collection('users').findOneAndUpdate(
      { _id: userId, token: userToken },
      { $set: user },
      { upsert: true });
    res.json(result);
  });

  // Get all global messages
  app.get('/messages', async (req, res) => {
    var users = await db.collection('users').find().toArray();
    var result = await db.collection('messages').find().toArray();

    result.forEach((m) =>  {
      var fromUser = users.find(u => u._id == m.from);
      m.fromName = fromUser == null ? 'Unknown' : fromUser.name;
    });
    res.json(result);
  });

  // Get messages from User 1 to User 2 and vise-versa
  app.get('/messages/:id1/:id2', async (req, res) => {
    var users = await db.collection('users').find().toArray();
    var result = await db.collection('private-messages').find(
      { '$or': [{from: req.params.id1, to: req.params.id2}, {from: req.params.id2, to: req.params.id1} ]}
    ).toArray();

    result.forEach((message) => {
      var fromUser = users.find(u => u._id == message.from);
      message.fromName = fromUser == null ? 'Unknown' : fromUser.name;
    });

    res.json(result);
  });
    
  // Post a new message to global chat
  app.post('/messages/:id', async (req, res) => {
    var message = {
      from: req.params.id,
      text: req.body.text,
    };
    var result = await db.collection('messages').insertOne(message);
    res.json(result.ops[0]);
  });
    
  // Post a new private message
  app.post('/messages/:id1/:id2', async (req, res) => {
    var message = {
      from: req.params.id1,
      to: req.params.id2,
      text: req.body.text,
    };
    var result = await db.collection('private-messages').insertOne(message);
    res.json(result.ops[0]);
  });


  app.listen(port, () => {
    console.log('Listening on http://localhost:' + port + '/');
  });
});