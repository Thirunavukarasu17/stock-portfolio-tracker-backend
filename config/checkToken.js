const jwt = require("jsonwebtoken");

module.exports = function(req,res,next) {
    let token = req.get('Authorization') || req.query.token;
    if (token) {
        // Remove the 'Bearer ' if it was included in the token header
        token = token.replace('Bearer ', '')
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            // if valid token, decoded will be the token's entire payload
            // if invalid token, err will be set
            req.user = err ? null : decoded.user;
            req.exp = err ? null : new Date(decoded.exp * 1000)
            return next();
        })
    } else {
        req.user = null;
        return next();
    }
}