var express = require('express')
var routes = express.Router()
const userController =  require('../../controllers/users.controller')

routes.get('/',userController.list)
routes.post('/create',userController.create)
routes.get('/search/:id',userController.findbyId)
module.exports = routes