var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
chai.use(chaiHttp);

describe('Test top level / route', function() {
    it('it should have a 200 status code', function(done) {
        chai.request('http://localhost:3000') // the top level web address
            .get('/') // the route to add to the top level address
            .end((err, res) => { // what to do once the request returns
                assert.equal(res.status, 200); // check we have the 200 OK HTTP code
                done(); // finish up
            });
    });
    it('it should send the right message', (done) => {
        chai.request('http://localhost:3000')
            .get('/')
            .end((err, res) => {
                let data = JSON.parse(res.text);
                assert.equal(data.message, 'Welcome to the norestforthewiccad API');
                done();
            });
    });
    it('it should have a spells route', (done) => {
        chai.request('http://localhost:3000')
            .get('/spells')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            });
    });
});

describe('Test /spells route', function() {
    it('list all spells', function(done) {
        chai.request('http://localhost:3000') // the top level web address
            .get('/spells/') // the route to add to the top level address
            .end((err, res) => { // what to do once the request returns
                let data = JSON.parse(res.text);
                assert.equal(data.length, 3);
                done(); // finish up
            });
    });

    it('spell should have id 1002', function(done) {
        chai.request('http://localhost:3000') // the top level web address
            .get('/spells/1002') // the route to add to the top level address
            .end((err, res) => { // what to do once the request returns

                let data = JSON.parse(res.text);
                assert.equal(data.id, 1002);

                done(); // finish up
            });
    });

    it('spell should have added spell', function(done) {
        chai.request('http://localhost:3000') // the top level web address
            .post('/spells')
            .send({ id: 1004 })
            .end((err, res) => { // what to do once the request returns

                let data = JSON.parse(res.text);
                assert.equal(data[3].id, 1004);

                done(); // finish up
            });
    });
});


describe('Test /user route', function() {
    it('get current user', function(done) {
        chai.request('http://localhost:3000') // the top level web address
            .get('/user') // the route to add to the top level address
            .end((err, res) => { // what to do once the request returns
                let data = JSON.parse(res.text);
                assert.equal(data.username, 'admin');
                assert.equal(data.password, 'goodpassword');
                done(); // finish up
            });
    });

    it('check log in', function(done) {
        chai.request('http://localhost:3000') // the top level web address
            .post('/user/login')
            .send({
                username: "admin",
                password: "goodpassword"
            })
            .end((err, res) => { // what to do once the request returns
                let data = JSON.parse(res.text);

                assert.equal(data.username, 'admin')
                assert.equal(data.message, 'Login successful');
                done(); // finish up
            });
    });

    it('check logout', function(done) {
        chai.request('http://localhost:3000') // the top level web address
            .post('/user/logout')
            .end((err, res) => { // what to do once the request returns
                let data = JSON.parse(res.text);
                assert.equal(data.message, 'Logout successful');
                done(); // finish up
            });
    });

});