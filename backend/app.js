const express = require('express');
const path = require('path');
const helmet = require('helmet');

//Database
const db = require('./config/config');

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

app.use(helmet());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

module.exports = app;