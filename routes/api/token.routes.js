
var express = require('express')
var routes = express.Router()
const tokenController = require('../../controllers/tokens.controller')

routes.get('/validar/:token', tokenController.confirmation)

module.exports = routes