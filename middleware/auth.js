const config = require('config');
const jwt = require('jsonwebtoken');


function auth(req,res,next){
  const token = req.header('x-auth-token');

 //check token
 if(!token) return res.status(401).send('NO token , authorization required');

 try {
   //verify token
  const decode = jwt.verify(token, config.get('jwtSecret'));
  req.user = decode;
  next();

 } catch (error) {
   res.status(400).send('Invalid token');
 }

}

module.exports = auth;
