const jwt = require("jsonwebtoken");
const usersService = require("../services/userService");
//const authService = require("../service/authService");

exports.isUserLogged = async(req, res, next) => {
    if (req.header && req.header.authorization) {
        const [sheme, token] = req.headers.authorization.split(" ");
        if (sheme && token) {
            jwt.verify(token,authService.JWT_SECRET, (err,decode) => {
                if (err) {
                    res.status(401).json("NOT AUTHORIZED");
                } else {
                    const user = usersService.getUserById(decode.data_id);
                    next()
                }
            })
        }
    } else {
        return res.status(401).json("NOT AUTHORIZED");
    }
};

  