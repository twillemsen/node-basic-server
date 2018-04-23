var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.should();

chai.use(chaiHttp);

describe('Person', () => {
    it('should return a valid person when getting a list', (done) => {
        chai.request(server)
            .get('/api/person')
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
        });
    });

    it('should throw a 404 error with correct contents when getting an invalid person', (done) => {
        chai.request(server)
            .get('/api/person/999')
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            })
    });
});