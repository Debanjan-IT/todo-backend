require('dotenv').config()
const models = require('../model/index')
const cryptoJS = require("crypto-js")
const validator = require('../validator/index')


exports.registrationMaker = async (req, res) => {
    try {
        const result = await validator.registration_validator.validateAsync({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        })
        var Encpass = cryptoJS.AES.encrypt(result.password, process.env.SALT).toString();
        let available = await models.user.count({
            where: {
                email: result.email
            }
        })
        if (available > 0) {
            res.send({
                message: 'Email already registered.'
            })
        }
        else {
            await models.user.create({
                fullname: result.fullname,
                email: result.email,
                password: Encpass
            })
            res.send({
                status: 200,
                message: 'User registered.'
            })
        }
    } catch (error) {
        res.send({
            status: 422,
            message: error.message
        });
    }
}
