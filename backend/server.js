const express = require('express');
const mongo = require('mongodb');
const app = express();

var port = 3000;
// var dbUrl = 'mongodb://localhost:27017';
var dbUrl = 'mongodb://zz28:123456z@ds233238.mlab.com:33238/fine-chat'
var dbName = 'fine-chat';

app.use(express.json());
// app.use('/static', express.static('public'));

mongo.MongoClient.connect(dbUrl, (err, client) => {
  if (err) throw err;
  
  const db = client.db(dbName);
  console.log('Connected to MongoDB: ' + dbUrl + '/' + dbName);

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  // Get all users: http://localhost:3000/users/
  app.get('/users', async (req, res) => {
    var users = await db.collection('users').find().toArray();
    var result = await db.collection('users').find({ active: true }).toArray();

    result.forEach((user) => 
      user.friends.forEach((friend) => {
        var friendUser = users.find(u => u._id == friend.id);
        friend.name = friendUser == null ? 'Unknown' : friendUser.name;
      })
    );

    res.json(result);
  });

  // Get one user by ID: http://localhost:3000/users/5eca6d7ac4af8618503b323e
  app.get('/users/:id', async (req, res) => {
    var userId = new mongo.ObjectID(req.params.id);

    var users = await db.collection('users').find().toArray();
    var result = await db.collection('users').findOne({ active: true, '_id': userId });

    result.friends.forEach((friend) => {
      var friendUser = users.find(u => u._id == friend.id);
      friend.name = friendUser == null ? 'Unknown' : friendUser.name;
    });

    res.json(result);
  });
    
  // Add new user: http://localhost:3000/users
  app.put('/users', async (req, res) => {
    var result = await db.collection('users').insertOne(req.body);
    res.json(result.ops[0]);
  });
  
  // Update user by ID: http://localhost:3000/users/5eca6d7ac4af8618503b323e
  app.post('/users/:id', async (req, res) => {
    var userId = new mongo.ObjectID(req.params.id);
    delete req.body._id;
    var result = await db.collection('users').findOneAndUpdate({'_id': userId}, { '$set': req.body});
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