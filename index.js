const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const response = {
    message: 'Hello World!',
  };

  res.send(JSON.stringify(response));
});


app.get('/users', function (req, res) {
  const users = [
    {
      id: 1,
      name: 'user1',
    },
    {
      id: 2,
      name: 'user2',
    },
    {
      id: 3,
      name: 'user3',
    },
  ];

  return res.status(200).json(users);
});

function waza(elem) {
  return elem.id === 1;
}

app.get('/users/:id(\\d+)', function (req, res) {
  const userId = req.params.id;

  if (users.find(e => e.id === 1))
  {
    return res.status(200).json(userId);
  }
  else {
    next(new Error('404'));
  }

});


app.post('/users', (req, res) => {
  const body = req.body;

  return res.status(201).json(body);
});


app.put('/', function (req, res) {
  // PUT
});

app.delete('/', (req, res) => {
  // DELETE
});

app.listen(8000, function () {
  console.log(`server listening on 8000`);
});