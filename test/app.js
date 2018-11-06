var request = require('supertest');
var app = require('../src/app.js');

describe('Testeando app a modo de ejemplo: ', function(){

  it('GET /', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', "text/html; charset=utf-8")
      .expect(200, done);
  });

});
