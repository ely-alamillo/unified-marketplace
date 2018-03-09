/**
 * TESTS ARE STILL IN PROGESS, I HIT THE 20 HOUR LIMIT
 * BEFORE I GOT ANY FURTHER.
 */
const { server } = require('../../server');

const chai = require('chai');
const assert = chai.assert;
const chaiHTTP = require('chai-http');
const firebase = require('firebase');

const db = firebase.database();
chai.use(chaiHTTP);

describe('[POST] /api/getallfundraisers', () => {
  it('should return all fundraisers', done => {
    chai
      .request(server)
      .get('/api/getallfundraisers')
      .end((err, res) => {
        if (err) console.log(err);
        assert.equal(res.status, 200);
        assert.isOk(res.body.success);
        assert.isOk(res.body.data);
        done();
      });
  });
});
