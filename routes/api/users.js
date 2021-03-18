var express = require('express')
var routes = express.Router()
const userController =  require('../../controllers/users')

routes.get('/',userController.list)
routes.post('/create',userController.create)
module.exports = routes