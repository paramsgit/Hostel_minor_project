var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {const data =  jwt.verify(token, JWT_SECRET);
        id=data.id
        req.user = id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}
module.exports = fetchuser;