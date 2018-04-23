// module.exports = {}

class Person {

    constructor(firstname, lastname){
        this._firstname = firstname;
        this._lastname = lastname;
    }

    getfirstname(){
        return this._firstname;
    }
}

module.exports = Person;
