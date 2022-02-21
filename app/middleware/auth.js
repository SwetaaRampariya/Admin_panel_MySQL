 const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// const config = require ('config');
const logger = require('../logger/logger');



const generateToken = (req, res, next) => {
    let token = jwt.sign({ Email: req.body.Email }, process.env.PRIVATE_KEY);
    res.cookie("jwt", token)
    next();

};


const authenticate = (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        console.log(token)

        if (token == undefined) {
            console.log("NO TOKEN")
            res.send('Enter Token..');
        }

        const verifyUser = jwt.verify(token, process.env.PRIVATE_KEY, (err,verified) =>{
            if(err){
                console.log(err)
            } else{
                console.log(verified)
            }
        });
        
        req.user = verifyUser;

        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    authenticate,
    generateToken
};