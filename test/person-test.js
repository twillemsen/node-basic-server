var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.should();

chai.use(chaiHttp);

describe('Person POST', () => {
    it('should return a valid person when posting a valid object', (done) => {
        chai.request(server)
            .post('/api/persons')
            .send({
                "firstname": "ABC",
                "lastname": "DEF"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                let response = res.body
                response.should.have.property('firstname').equals('ABC');
                response.should.have.property('lastname').equals('DEF');
                done();
        });
    });

    it('should throw an error when no firstname is provided', (done) => {
        // Hier mijn test
        chai.request(server)
            .post('/api/persons')
            .send({
                "lastname": "DEF"
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');

                const error = res.body;
                error.should.have.property('message');
                error.should.have.property('code').equals(404);
                error.should.have.property('datetime');

                done();
        });        
    });
    
    it('should throw an error when no lastname is provided', (done) => {
        chai.request(server)
            .post('/api/persons')
            .send({
                "firstname": "ABC"
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');

                const error = res.body;
                error.should.have.property('message');
                error.should.have.property('code').equals(404);
                error.should.have.property('datetime');

                done();
            });
        });
    });