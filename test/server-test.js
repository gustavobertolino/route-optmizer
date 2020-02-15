var expect  = require('chai').expect;
var request = require('request');

it('Route-opt server basic endpoint', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(body).to.equal('Route-opt, from express!');
        done();
    });
});