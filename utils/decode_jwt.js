const jwt = require("jsonwebtoken");
const { jwt_key } = require("./config");

function decode_jwt(req, res, next) {
    const auth=req.headers.authorization;
    if(!auth) return res.status(401).json({message: "Missing token"});

    const token=auth.split(" ")[1];
    jwt.verify(token, jwt_key, (err, data) => {
        if(err) return res.status(403).json({message: "Invalid token"});

        req.user=data;
        next();
    });
}

module.exports=decode_jwt;