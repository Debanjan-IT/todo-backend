require('dotenv').config()
const models = require('../model/index')
const jwt = require('jsonwebtoken')
const cryptoJS = require("crypto-js")
const validator = require('../validator/index')

//Token authentication
exports.authToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(" ")[1];
    if (token === null) {
        return res.send({
            status_code: 401,
            message: 'No token provided'
        });
    }

    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.send({
                status_code: 403,
                message: "Token is no longer valid."
            });
        }
        req.user = user;
        next();
    })
}



exports.addToDo = async (req, res) => {
    try {
        const result = await validator.todo_insert_validator.validateAsync({
            title: req.body.title,
            content: req.body.content
        })
        await models.todo.create({
            user_id: req.user.user_id,
            title: result.title,
            content: result.content
        })
        res.send({
            status: 200,
            message: 'Todo added'
        })
    } catch (error) {
        res.send({
            status: 422,
            message: error.message
        });
    }
}


exports.removeToDo = async (req, res) => {
    try {
        const result = await validator.todo_delete_validator.validateAsync({
            id: req.body.todo_id
        })
        const count = await models.todo.count({
            where: {
                id: result.id
            }
        })
        if (count != 0){
            await models.todo.destroy({
                where: {
                    id: result.id
                }
            })
            res.send({
                status: 200,
                message: 'Todo deleted'
            })
        }
        else{
            res.send({
                status: 444,
                message: 'Todo not found'
            })
        }        
    } catch (error) {
        res.send({
            status: 422,
            message: error.message
        });
    }
}



exports.getToDo = async (req, res) => {
    try {
        const count = await models.todo.count({
            where: {
                user_id: req.user.user_id
            }
        })
        if (count != 0){
            let data = await models.todo.findAll({
                where: {
                    user_id: req.user.user_id
                }
            })
            res.send({
                status: 200,
                message: {
                    todo_count: count,
                    data: data
                }
            })
        }
        else{
            res.send({
                status: 200,
                message: {
                    todo_count: count,
                    data: {
                        id: 0,
                        title: "Not found",
                        content: "0 Data Found"
                    }
                }
            })
        }        
    } catch (error) {
        res.send({
            status: 422,
            message: error.message
        });
    }
}