const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
// var cookies = require('cookie-parser');

const authenticate = async (req, res, next) => {
    // console.log("---------------------->>>>>>>>>")
    try {
        // console.log(req.headers.cookie)
        let token = req.headers.cookie;
        token=token.split('=');
        token=token[1]
        // console.log(token);
        // const token = req.cookies.jwtoken;
        // console.log(token)
        const verifytoken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token });
        if (!rootUser) {
            throw new Error('user not found')
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized: no token found');
        console.log("err");
    }
}

module.exports = authenticate;