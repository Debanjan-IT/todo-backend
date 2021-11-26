require('dotenv').config()
const jwt = require('jsonwebtoken')
const models = require('../model/index')
const validator = require('../validator/index')
const cryptoJS = require("crypto-js")



exports.loginMaker = async (req, res) => {
    try{
        const result = await validator.login_validator.validateAsync({
            email: req.body.email,
            password: req.body.password
        })
        let data = await models.user.findOne({
            where: {
                email: result.email
            },
            raw: true
        })
        let bytes  = cryptoJS.AES.decrypt(data.password, process.env.SALT);
        let originalText = bytes.toString(cryptoJS.enc.Utf8);
        if (originalText === result.password){
            let user_details = {
                user_id: data.id,
                user_fullname: data.fullname
            }
            let accessToken = jwt.sign(user_details, process.env.PRIVATE_KEY);
            res.json({
                status: 200,
                message: 'Bearer '+ accessToken
            })
        }
        else{
            res.send({
                status: 201,
                message: "wrong credentials"
            })
        }
    }
    catch (err) {
        res.send({
            status: 422,
            message: err.message
        });
    }
}