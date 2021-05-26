const express = require('express');
const bodyParser = require('body-parser');

//Database
const db = require('./config/database');

//Test connexion DB
db.authenticate()
    .then(() => console.log('Database connected el fifou de la muerte'))
    .catch(err => console.log('Error: ' + err))

const app = express();

// === Configuration des headers, CORS ===
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/auth', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

module.exports = app;