'use strict';

import request from 'superagent';
import _ from 'underscore';
import bluebird from 'bluebird';


/**
 * Hack to add multiple fields value on my Request prototype
 * May change during upgrade : To watch
 */
_.extend(request.Request.prototype, {
  fields: function(object){
    if (!this._formData) this._formData = new root.FormData();
    for (var k in object){
      this._formData.append(k, object[k]);
    }
    return this;
  }
})

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
  },
  post: function(url, data) {
    return new bluebird((resolve, reject) => {
      var req = request
        .post(url);
      req._callback = function(){}

      req.send(data)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          if (res.body.code == 0) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  },
  patch: function(url, data) {
    return new bluebird((resolve, reject) => {
      var req = request
        .patch(url);
      req._callback = function(){}

      req.send(data)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          if (res.body.code == 0) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  },
  put: function(url, data) {
    return new bluebird((resolve, reject) => {
      var req = request
        .put(url);
      req._callback = function(){}

      req.send(data)
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          if (res.body.code == 0) {
            resolve(res);
          } else {
            reject(res);
          }
        });
    });
  },
  delete: function(url, data) {
    return new bluebird((resolve, reject) => {
      var req = request
        .del(url);
      req._callback = function(){}

      req.send(data)
        .set('Content-Type', 'application/json')
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