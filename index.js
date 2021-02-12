const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const response = {
        message: 'Hello World!',
    };

    res.send(JSON.stringify(response));
});

/*app.get('/users', function(req, res) {
  const users = [
    {
       id: '1234',
       name: 'user1',
    },
    {
      id: '1234',
      name: 'user1',
    },
  ];
  
  return res.status(200).json(users);
});*/

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users/:id', function (req, res) {
    const userId = req.params.id;

    return res.status(200).json(userId);
});


app.post('/users', (req, res) => {
    const body = req.body;

    return res.status(201).json(body);
});

app.listen(8000, function () {
    console.log(`server listening on 8000`);
});