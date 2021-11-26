const expr = require('express');
let router = expr.Router();
const controller = require('../controller/index')


router.route("/register")
    .post(controller.registration_controller.registrationMaker)
router.route("/login")
    .post(controller.login_controller.loginMaker)
router.route("/add_todo")
    .post(controller.todo_controller.authToken, controller.todo_controller.addToDo)
router.route("/delete_todo")
    .post(controller.todo_controller.removeToDo)
router.route("/get_todo")
    .get(controller.todo_controller.authToken, controller.todo_controller.getToDo)

module.exports = router;