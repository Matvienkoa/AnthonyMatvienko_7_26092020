const jwt = require('jsonwebtoken');

// === Demande authentifiée avec Token ===
exports.requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
      if (token) {
        jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decodedToken) => {
          if (err) {
            res.status(403);
          } else {
            console.log(decodedToken)
            next()
          }
        });
      } else {
        console.log('No Token');
      }
};