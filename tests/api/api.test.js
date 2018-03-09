const { server } = require('../../server');

const chai = require('chai');
const assert = chai.assert;
const chaiHTTP = require('chai-http');
const firebase = require('firebase');

const db = firebase.database();
chai.use(chaiHTTP);

describe('Register Endpoints', () => {
  let id = '';
  // afterEach(done => {
  //   db.ref();
  // });
  it('should Create a user', done => {
    chai
      .request(server)
      .post('/api/register')
      .send({
        firstname: 'john',
        lastname: 'doe',
        email: 'john@doe7.com',
        password: '123123',
        fundraisers: 'Testing stuff'
      })
      .end((err, res) => {
        if (err) console.log(err);
        assert.equal(res.status, 200);
        // uid = res.body.id;
        console.log(res.body);
        assert.equal(res.body.email, 'john@doe7.com');
        assert.isOk(res.body.success);
        done();
      });
  });
});
