// module.exports = {}

class Person {

    constructor(firstname, lastname){
        this.firstname = firstname;
        this.lastname = lastname;
    }

    getfirstname(){
        return this.firstname;
    }
}

module.exports = Person;
