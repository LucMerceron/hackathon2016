'use strict';

import request from 'superagent';
import _ from 'underscore';
import bluebird from 'bluebird';

/**
 * Wrapper for calling a API
 */
var Api = {
  get: function (url) {
    return new bluebird((resolve, reject) => {
      var req = request
        .get(url);
      req._callback = function(){}

      req.set('Accept', 'application/json')
        .end(function (err, res) {
          if (res.body.code == 0) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  }
};

module.exports = Api;