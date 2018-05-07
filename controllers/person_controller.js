//
// CRUD operaties op person
//
let Person = require('../model/Person')
const assert = require('assert')

let personlist = []

module.exports = {

    createPerson(req, res, next) {
        console.log('personcontroller.createPerson')

        assert(req.body.firstname, 'firstname must be provided');
        assert(req.body.lastname, 'lastname must be provided');

        const firstname = req.body.firstname
        const lastname = req.body.lastname
        console.log("We got " + firstname + " " + lastname)

        let user = new Person(firstname, lastname)
        // Add to database
        personlist.push(user)

        res.status(200).json(user).end();
    },

    readPerson(req, res, next) {
        res.status(200).json(personlist).end();
    },

    updatePerson(req, res, next) {
        let user = new Person("Robin", "Schellius")
        res.status(200).json(user).end();
    },
    
    deletePersonById(req, res, next) {
        // vind de juiste person om te deleten
        const id = req.params.id
        console.log('deletePerson id = ' + id)

        // delete die person
        const removedPerson = personlist.splice(id, 1)
        if(removedPerson.length === 1) {
            // gelukt; status = 200
            res.status(200).json(removedPerson).end();
        } else {
            // mislukt; fout -> next(error)
            let error = {
                message: "Person was not found"
            }
            next(error)
        }
    },

    getPersonById(req, res, next) {

        let user = new Person("Robin", "Schellius")
        res.status(200).json(user).end();
    },


}