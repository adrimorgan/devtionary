var request = require('supertest');
var app = require('../src/app.js');

describe('Tests unitarios de rutas: ', function(){

  it('Test ruta "/" status', function(done){
    request(app)
      .get('/')
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect({
        status: "OK",
        ejemplo: {
          ruta: "/help",
          valor: {
            usage: "try to POST a new devnote to /devnotes/key/value"
          }
        }
      })
      .expect(200, done);
  });

  it('Test ruta "/help" de ayuda', function(done){
    request(app)
      .get('/help')
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect({
        usage: "try to POST a new devnote to /devnotes/key/value"
      })
      .expect(200, done);
  })

  it('Test GET base de datos', function(done){
    request(app)
      .get('/devnotes')
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(200, done);
  });

  it('Test CREATE devnote', function(done){
    request(app)
      .post('/devnotes/cloud\ computing/asignatura')
      .expect(200, done);
  });

  it('Test CREATE devnote duplicada', function (done) {
    request(app)
      .post('/devnotes/cloud\ computing/asignatura')
      .expect(409, done);
  });

  it('Test GET devnote', function(done){
    request(app)
      .get('/devnotes/cloud\ computing')
      .expect(200, done);
  });

  it('Test DELETE devnote', function(done){
    request(app)
      .delete('/devnotes/cloud\ computing')
      .expect(200, done);
  });

  it('Test DELETE devnote ya borrada', function(done){
    request(app)
      .delete('/devnotes/cloud\ computing')
      .expect(204, done);
  });

  it('Test GET devnote borrada', function (done) {
    request(app)
      .get('/devnotes/cloud\ computing')
      .expect(404, done);
  });

  it('Test DELETE base de datos', function(done){
    request(app)
      .delete('/devnotes')
      .expect(200, done);
  });
});
