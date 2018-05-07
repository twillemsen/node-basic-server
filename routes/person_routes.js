
let express = require('express')
let routes = express.Router()
let personcontroller = require('../controllers/person_controller')

// hier schrijven we router endpoints
routes.get('/persons', personcontroller.readPerson)
routes.get('/persons/:id', personcontroller.getPersonById)
routes.post('/persons', personcontroller.createPerson)
routes.put('/persons', personcontroller.updatePerson)
routes.delete('/persons/:id', personcontroller.deletePersonById)

module.exports = routes