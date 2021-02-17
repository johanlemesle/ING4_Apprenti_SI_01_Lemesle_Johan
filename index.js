import express from 'express';
import bodyParser from 'body-parser';
import { List, Create, Update, Delete } from './methods.js';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-----------------------------------------------------------//

let users = [
  {
    id: '1',
    name: 'user1',
  },
  {
    id: '2',
    name: 'user2',
  },
  {
    id: '3',
    name: 'user3',
  },
];


//-----------------------------------------------------------//

app.get('/', (req, res) => {
  const response = {
    message: 'Hello World!',
  };

  res.send(JSON.stringify(response));
});


app.get('/users', function (req, res) {
  return res.status(200).json(List(users));
});


app.get('/users/:id(\\d+)', function (req, res) {
  const userId = req.params.id;

  if (users.find(element => element.id == userId)) {
    return res.status(200).json(List(userId));
  }
  else {
    return res.status(404).json({ "error": 'user does not exist' });
  }
});



app.post('/users', (req, res) => {
  const body = req.body;

  if (users.find(element => element.id == body.id) != undefined) {
    return res.status(400).json({ "error": 'user already exists' });
  }
  else {
    Create(users, body);
    return res.status(201).json(body);
  }
});


app.put('/users/:id(\\d+)', function (req, res) {
  const body = req.body;
  const userId = req.params.id;
  let id = users.findIndex(u => u.id == userId);

  if (id == -1) {
    return res.status(404).json({ "error": 'user does not exist' });
  }
  else {
    Update(users, id, body);
    return res.status(202).json(body);
  }
});


app.delete('/users/:id(\\d+)', function (req, res) {
  const userId = req.params.id;
  let id = users.findIndex(u => u.id == userId);
  if (users.find(element => element.id == userId) == undefined) {
    return res.status(404).json({ "error": 'user does not exist' });
  }
  else {
    Delete(users, id);
    return res.status(204).json(null);
  }
});


app.listen(8000, function () {
  console.log(`server listening on 8000`);
});