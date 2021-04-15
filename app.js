const express = require('express');
const app = express();




// Chargement des modules
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')


const SECRET = 'mykey'

app.use(cors())                                 // Activation de CORS
app.use(morgan('tiny'))                         // Activation de Morgan
app.use(express.json())                         // Activation du raw (json)
app.use(express.urlencoded({ extended: true })) // Activation de x-wwww-form-urlencoded

// Liste des utilisateurs
const users = [
    { id: 1, username: 'admin', password: 'password123' }
]

/* Ici les futures routes */

app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Page not found' })
})





const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //Permet de lire du json. Ne pas oublier d'avoir le header Content-Type avec comme valeur application/json
//https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Type

//Routes
app.get('/', (req, res) => {
    res.send([
        "<h1>E'Chat</h1>"
    ].join(''));
});

/* Formulaire de connexion */
app.post('/login', (req, res) => {
    // Pas d'information à traiter
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
    }

    // Checking
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)

    // Pas bon
    if (!user) {
        return res.status(400).json({ message: 'Error. Wrong login or password' })
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, SECRET, { expiresIn: '3 hours' })

    return res.json({ access_token: token })
})

/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    // Véracité du token
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}


const channelRoutes = require('./app/routes/channel_routes');
const userRoutes = require('./app/routes/user_routes');
const messageRoutes = require('./app/routes/message_routes');

app.use(checkTokenMiddleware);
app.use('/api/v1/channels', channelRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1', messageRoutes);

module.exports = app;
