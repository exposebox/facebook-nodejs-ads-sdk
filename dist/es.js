import fs from 'fs';
import path from 'path';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
// request-promise error types
var REQUEST_ERROR = 'RequestError';
var STATUS_CODE_ERROR = 'StatusCodeError';

function FacebookError(error) {
  this.name = 'FacebookError';
  this.message = error.message;
  this.stack = new Error().stack;
}
FacebookError.prototype = Object.create(Error.prototype);
FacebookError.prototype.constructor = FacebookError;

/**
 * Raised when an api request fails.
 */
var FacebookRequestError = function (_FacebookError) {
  inherits(FacebookRequestError, _FacebookError);

  /**
   * @param  {[Object}  response
   * @param  {String}   method
   * @param  {String}   url
   * @param  {Object}   data
   */
  function FacebookRequestError(response, method, url, data) {
    classCallCheck(this, FacebookRequestError);

    var errorResponse = constructErrorResponse(response);

    var _this = possibleConstructorReturn(this, (FacebookRequestError.__proto__ || Object.getPrototypeOf(FacebookRequestError)).call(this, errorResponse));

    _this.name = 'FacebookRequestError';
    _this.message = errorResponse.message;
    _this.status = errorResponse.status;
    _this.response = errorResponse.body;
    _this.method = method;
    _this.url = url;
    if (data) {
      _this.data = data;
    }
    return _this;
  }

  return FacebookRequestError;
}(FacebookError);

/**
 * Error response has several structures depended on called APIs or errors.
 * This method contructs and formats the response into the same structure for
 * creating a FacebookRequestError object.
 */
function constructErrorResponse(response) {
  var body = void 0;
  var message = void 0;
  var status = void 0;

  // Batch request error contains code and body fields
  var isBatchResponse = response.code && response.body;

  if (isBatchResponse) {
    // Handle batch response
    body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
    status = response.code;
    message = body.error.message;
  } else {
    // Handle single response
    if (response.name === STATUS_CODE_ERROR) {
      // Handle when we can get response error code
      body = response.error ? response.error : response;
      body = typeof body === 'string' ? JSON.parse(body) : body;
      // Construct an error message from subfields in body.error
      message = body.error.error_user_msg ? body.error.error_user_title + ': ' + body.error.error_user_msg : body.error.message;
      status = response.statusCode;
    } else if (response.name === REQUEST_ERROR) {
      // Handle network errors e.g. timeout, destination unreachable
      body = { error: response.error };
      // An error message is in the response already
      message = response.message;
      // Network errors have no status code
      status = null;
    }
  }

  return { body: body, message: message, status: status };
}

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @format
 */
/**
 * Facebook Ads API
 */

var FacebookAdsApi = function () {
  createClass(FacebookAdsApi, null, [{
    key: 'VERSION',
    get: function get() {
      return 'v3.0';
    }
  }, {
    key: 'GRAPH',
    get: function get() {
      return 'https://graph.facebook.com';
    }
  }, {
    key: 'GRAPH_VIDEO',
    get: function get() {
      return 'https://graph-video.facebook.com';
    }

    /**
     * @param {String} accessToken
     * @param {String} [locale]
     */

  }]);

  function FacebookAdsApi(accessToken) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en_US';
    classCallCheck(this, FacebookAdsApi);

    if (!accessToken) {
      throw new Error('Access token required');
    }
    this.accessToken = accessToken;
    this.locale = locale;
    this._debug = false;
  }

  /**
   * Instantiate an API and store it as the default
   * @param  {String} accessToken
   * @param  {String} [locale]
   * @return {FacebookAdsApi}
   */


  createClass(FacebookAdsApi, [{
    key: 'setDebug',
    value: function setDebug(flag) {
      this._debug = flag;
      return this;
    }

    /**
     * Http Request
     * @param  {String} method
     * @param  {String} path
     * @param  {Object} [params]
     * @param  {Object} [files]
     * @return {Promise}
     */

  }, {
    key: 'call',
    value: function call(method, path$$1) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var files = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var _this = this;

      var useMultipartFormData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var urlOverride = arguments[5];

      var url = void 0;
      var data = {};
      if (method === 'POST' || method === 'PUT') {
        data = params;
        params = {};
      }
      var domain = urlOverride || FacebookAdsApi.GRAPH;
      if (typeof path$$1 !== 'string' && !(path$$1 instanceof String)) {
        url = [domain, FacebookAdsApi.VERSION].concat(toConsumableArray(path$$1)).join('/');
        params['access_token'] = this.accessToken;
        url += '?' + FacebookAdsApi._encodeParams(params);
      } else {
        url = path$$1;
      }
      var strUrl = url;
      return Http.request(method, strUrl, data, files, useMultipartFormData).then(function (response) {
        if (_this._debug) {
          console.log('200 ' + method + ' ' + url + ' ' + (data ? JSON.stringify(data) : ''));
          console.log('Response: ' + (response ? JSON.stringify(response) : ''));
        }
        return Promise.resolve(response);
      }).catch(function (response) {
        if (_this._debug) {
          console.log(response.status + ' ' + method + ' ' + url + '\n            ' + (data ? JSON.stringify(data) : ''));
        }
        throw new FacebookRequestError(response, method, url, data);
      });
    }
  }], [{
    key: 'init',
    value: function init(accessToken) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en_US';

      var api = new this(accessToken, locale);
      this.setDefaultApi(api);
      return api;
    }
  }, {
    key: 'setDefaultApi',
    value: function setDefaultApi(api) {
      this._defaultApi = api;
    }
  }, {
    key: 'getDefaultApi',
    value: function getDefaultApi() {
      return this._defaultApi;
    }
  }, {
    key: '_encodeParams',
    value: function _encodeParams(params) {
      return Object.keys(params).map(function (key) {
        var param = params[key];
        if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
          param = param ? JSON.stringify(param) : '';
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(param);
      }).join('&');
    }
  }]);
  return FacebookAdsApi;
}();

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

// HTTP Status Code
var HTTP_STATUS = {
  OK: '200',
  NOT_MODIFIED: '304'
};

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
var _requestPromise = require('request-promise');

/**
 * Isomorphic Http Promise Requests Class
 * 
 */

var Http = function () {
  function Http() {
    classCallCheck(this, Http);
  }

  createClass(Http, null, [{
    key: 'request',

    /**
     * Request
     * @param   {String}  method
     * @param   {String}  url
     * @param   {Object}  [data]
     * @return  {Promise}
     */
    value: function request(method, url, data, files, useMultipartFormData) {
      if (typeof window !== 'undefined' && window.XMLHttpRequest) {
        return Http.xmlHttpRequest(method, url, data);
      }
      return Http.requestPromise(method, url, data, files, useMultipartFormData);
    }

    /**
     * XmlHttpRequest request
     * @param   {String}  method
     * @param   {String}  url
     * @param   {Object}  [data]
     * @return  {Promise}
     */

  }, {
    key: 'xmlHttpRequest',
    value: function xmlHttpRequest(method, url, data) {
      return new Promise(function (resolve, reject) {
        var request = new window.XMLHttpRequest();
        request.open(method, url);
        request.onload = function () {
          try {
            var response = JSON.parse(request.response);

            if (request.status.toString() === HTTP_STATUS.OK) {
              resolve(response);
            } else {
              reject(new Error({
                body: response,
                status: request.status
              }));
            }
          } catch (e) {
            reject(new Error({
              body: request.responseText,
              status: request.status
            }));
          }
        };
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.send(JSON.stringify(data));
      });
    }

    /**
     * Request Promise
     * @param   {String}  method The HTTP method name (e.g. 'GET').
     * @param   {String}  url A full URL string.
     * @param   {Object}  [data] A mapping of request parameters where a key
     *   is the parameter name and its value is a string or an object
     *   which can be JSON-encoded.
     * @param   {Object}  [files] An optional mapping of file names to ReadStream
     *   objects. These files will be attached to the request.
     * @param   {Boolean} [useMultipartFormData] An optional flag to call with
     *   multipart/form-data.
     * @return  {Promise}
     */

  }, {
    key: 'requestPromise',
    value: function requestPromise(method, url, data, files) {
      var useMultipartFormData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      var options = {
        method: method,
        uri: url,
        json: !useMultipartFormData,
        headers: { 'User-Agent': 'fbbizsdk-nodejs-' + FacebookAdsApi.VERSION },
        body: Object
      };
      // Prevent null or undefined input
      // because it can be merged with the files argument later
      if (!data) {
        data = {};
      }

      options.body = data;

      // Handle file attachments if provided
      if (useMultipartFormData || files && Object.keys(files).length > 0) {
        // Use formData instead of body (required by the request-promise library)
        options.formData = Object.assign(data, files);
        delete options.body;
      }

      return _requestPromise(options).catch(function (response) {
        throw response;
      });
    }
  }]);
  return Http;
}();

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @format
 */
/**
  * Represents an API request
  */

var APIRequest = function () {

  /**
   * @param {string} nodeId The node id to perform the api call.
   * @param {string} method The HTTP method of the call.
   * @param {string} endpoint The edge of the api call.
   */
  function APIRequest(nodeId, method, endpoint) {
    classCallCheck(this, APIRequest);

    this._nodeId = nodeId;
    this._method = method;
    this._endpoint = endpoint.replace('/', '');
    this._path = [nodeId, this.endpoint];
    this._fields = [];
    this._fileParams = Object.create(null);
    this._params = Object.create(null);
    this._fileCounter = 0;
  }

  /**
   * Getter function for node ID
   * @return {string} Node ID
   */


  createClass(APIRequest, [{
    key: 'addFile',


    /**
     * @param {string} filePath Path to file attached to the request
     * @return {APIReqeust} APIRequest instance
     */
    value: function addFile(filePath) {
      var fileKey = 'source' + this._fileCounter;
      var stats = fs.lstatSync(filePath);

      if (!stats.isFile()) {
        throw Error('Cannot find file ' + filePath + '!');
      }

      this._fileParams[fileKey] = filePath;
      this._fileCounter += 1;

      return this;
    }

    /**
     * @param {string[]} filePaths Array of paths to files attached to the request
     * @return {APIRequest} APIRequest instance
     */

  }, {
    key: 'addFiles',
    value: function addFiles(filePaths) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = filePaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var filePath = _step.value;

          this.addFile(filePath);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }

    /**
     * @param {string} field Requested field
     * @return {APIReqeust} APIRequest instance
     */

  }, {
    key: 'addField',
    value: function addField(field) {
      if (!this._fields.includes(field)) {
        this._fields.push(field);
      }

      return this;
    }

    /**
     * @param {string[]} fields Array of requested fields
     * @return {APIRequest} APIRequest instance
     */

  }, {
    key: 'addFields',
    value: function addFields(fields) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var field = _step2.value;

          this.addField(field);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }

    /**
     * @param {string} key Param key
     * @param {*} value Param value
     * @return {APIRequest} APIRequest instance
     */

  }, {
    key: 'addParam',
    value: function addParam(key, value) {
      this._params[key] = value;

      return this;
    }

    /**
     * @param {Object} params An object containing param keys and values
     * @return {APIRequest} APIRequest instance
     */

  }, {
    key: 'addParams',
    value: function addParams(params) {
      this._params = params;

      return this;
    }
  }, {
    key: 'nodeId',
    get: function get() {
      return this._nodeId;
    }

    /**
     * Getter function for HTTP method e.g. GET, POST
     * @return {string} HTTP method
     */

  }, {
    key: 'method',
    get: function get() {
      return this._method;
    }

    /**
     * Getter function for the edge of the API call
     * @return {string} Endpoint edge
     */

  }, {
    key: 'endpoint',
    get: function get() {
      return this._endpoint;
    }

    /**
     * Getter function for path tokens
     * @return {Array<string>} Array of path tokens
     */

  }, {
    key: 'path',
    get: function get() {
      return this._path;
    }

    /**
     * Getter function for requested fields
     * @return {Array<string>} Array of request fields
     */

  }, {
    key: 'fields',
    get: function get() {
      return this._fields;
    }

    /**
     * Getter function for API params
     * @return {Object} Object containing API Params
     */

  }, {
    key: 'params',
    get: function get() {
      // Deep cloning when object value is not a function
      return JSON.parse(JSON.stringify(this._params));
    }
  }]);
  return APIRequest;
}();

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @format
 */

/**
 * Encapsulates an http response from Facebook's Graph API.
 */

var APIResponse = function () {
  function APIResponse(response, call) {
    classCallCheck(this, APIResponse);

    response.body = JSON.parse(response.body);
    this._body = response.body;
    this._httpStatus = response.code;
    this._headers = response.headers;
    this._call = call;
    this._response = response;
  }

  /**
   * @return {Object} The response body
   */


  createClass(APIResponse, [{
    key: 'body',
    get: function get() {
      return this._body;
    }
  }, {
    key: 'headers',
    get: function get() {
      return this._headers;
    }
  }, {
    key: 'etag',
    get: function get() {
      return this._headers['ETag'];
    }
  }, {
    key: 'status',
    get: function get() {
      return this._httpStatus;
    }
  }, {
    key: 'isSuccess',
    get: function get() {
      var body = this._body;

      if ('error' in body) {
        return false;
      } else if (Object.keys(body).length !== 0) {
        if ('success' in body) {
          return body['success'];
        }
        return !('Service Unavailable' in body);
      } else if (this._httpStatus === HTTP_STATUS.NOT_MODIFIED) {
        // ETag Hit
        return true;
      } else if (this._httpStatus === HTTP_STATUS.OK) {
        // HTTP OK
        return true;
      } else {
        // Something else
        return false;
      }
    }
  }, {
    key: 'error',
    get: function get() {
      if (this.isSuccess) {
        return null;
      }

      return new FacebookRequestError(this._response, this._call.method, this._call.relativeUrl, this._call.body);
    }
  }]);
  return APIResponse;
}();

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @format
 */
/**
  * Facebook Ads API Batch
  */

var FacebookAdsApiBatch = function () {

  /**
   * @param {FacebookAdsApi} api
   * @param {Function} successCallback
   * @param {Function} failureCallback
   */
  function FacebookAdsApiBatch(api, successCallback, failureCallback) {
    classCallCheck(this, FacebookAdsApiBatch);

    this._api = api;
    this._files = [];
    this._batch = [];
    this._requests = [];
    this._successCallbacks = [];
    this._failureCallbacks = [];

    if (successCallback != null) {
      this._successCallbacks.push(successCallback);
    }

    if (failureCallback != null) {
      this._failureCallbacks.push(failureCallback);
    }
  }

  /**
   * Adds a call to the batch.
   * @param  {string} method The HTTP method name (e.g. 'GET').
   * @param  {string[]|string} relativePath An array of path tokens or
   *   a relative URL string. An array will be translated to a url as follows:
   *     <graph url>/<tuple[0]>/<tuple[1]>...
   *   It will be assumed that if the path is not a string, it will be iterable.
   * @param  {Object} [params] A mapping of request parameters
   *   where a key is the parameter name and its value is a string or an object
   *   which can be JSON-encoded.
   * @param {Object} [files] An optional mapping of file names to binary open
   *   file objects. These files will be attached to the request.
   * @param {Function} [successCallback] A callback function which will be
   *   called with the response of this call if the call succeeded.
   * @param {Function} [failureCallback] A callback function which will be
   *   called with the response of this call if the call failed.
   * @param {APIRequest} [request] The APIRequest object
   * @return {Object} An object describing the call
   */


  createClass(FacebookAdsApiBatch, [{
    key: 'add',
    value: function add(method, relativePath, params, files, successCallback, failureCallback, request) {
      // Construct a relaitveUrl from relateivePath by assuming that
      // relativePath can only be a string or an array of strings
      var relativeUrl = typeof relativePath === 'string' ? relativePath : relativePath.join('/');
      // A Call object that will be used in a batch request
      var call = {
        method: method,
        relative_url: relativeUrl
      };

      // Contruct key-value pairs from params for GET querystring or POST body
      if (params != null) {
        var keyVals = [];

        for (var key in params) {
          var value = params[key];
          if (_typeof(params[key]) === 'object' && !(params[key] instanceof Date)) {
            value = JSON.stringify(value);
          }
          keyVals.push(key + '=' + value);
        }

        if (method === 'GET') {
          call['relative_url'] += '?' + keyVals.join('&');
        } else {
          call['body'] = keyVals.join('&');
        }

        if (params && params['name']) {
          call['name'] = params['name'];
        }
      }

      // Handle attached files
      if (files != null) {
        call['attachedFiles'] = Object.keys(files).join(',');
      }

      this._batch.push(call);
      this._files.push(files);
      this._successCallbacks.push(successCallback);
      this._failureCallbacks.push(failureCallback);
      this._requests.push(request);

      return call;
    }

    /**
     * Interface to add a APIRequest to the batch.
     * @param  {APIRequest} request The APIRequest object to add
     * @param  {Function} [successCallback] A callback function which
     *   will be called with response of this call if the call succeeded.
     * @param  {Function} [failureCallback] A callback function which
     *   will be called with the FacebookResponse of this call if the call failed.
     * @return {Object} An object describing the call
     */

  }, {
    key: 'addRequest',
    value: function addRequest(request, successCallback, failureCallback) {
      var updatedParams = request.params;
      updatedParams['fields'] = request.fields.join();

      return this.add(request.method, request.path, updatedParams, request.fileParams, successCallback, failureCallback, request);
    }

    /**
     * Makes a batch call to the api associated with this object.
     * For each individual call response, calls the success or failure callback
     * function if they were specified.
     * Note: Does not explicitly raise exceptions. Individual exceptions won't
     * be thrown for each call that fails. The success and failure callback
     * functions corresponding to a call should handle its success or failure.
     * @return {FacebookAdsApiBatch|None} If some of the calls have failed,
     *   returns a new FacebookAdsApiBatch object with those calls.
     *   Otherwise, returns None.
     */

  }, {
    key: 'execute',
    value: function execute() {
      var _this = this;

      if (this._batch.length < 1) {
        return;
      }

      var method = 'POST';
      var path$$1 = []; // request to root domain for a batch request
      var params = {
        batch: this._batch
      };

      // Call to the batch endpoint (WIP)
      return this._api.call(method, path$$1, params).then(function (responses) {
        // Keep track of batch indices that need to retry
        var retryIndices = [];

        // Check each response
        for (var index = 0; index < responses.length; index++) {
          var response = responses[index];

          if (response != null) {
            var apiResponse = new APIResponse(response, _this._batch[index]);

            // Call the success callback if provided
            if (apiResponse.isSuccess) {
              if (_this._successCallbacks[index]) {
                _this._successCallbacks[index](apiResponse);
              }
            } else {
              // Call the failure callback if provided
              if (_this._failureCallbacks[index]) {
                _this._failureCallbacks[index](apiResponse);
              }
            }
          } else {
            // Do not get response, so, we keep track of the index to retry
            retryIndices.push(index);
          }
        }

        // Create and return new batch if we need to retry
        if (retryIndices.length > 0) {
          // Create a new batch from retry indices in the current batch
          var newBatch = new FacebookAdsApiBatch(_this.api);

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = retryIndices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _index = _step.value;

              newBatch._files.push(_this._files[_index]);
              newBatch._batch.push(_this._batch[_index]);
              newBatch._successCallbacks.push(_this._successCallbacks[_index]);
              newBatch._failureCallbacks.push(_this._failureCallbacks[_index]);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return newBatch;
        }

        // No retry
        return null;
      }).catch(function (error) {
        throw error;
      });
    }
  }]);
  return FacebookAdsApiBatch;
}();

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Abstract Object
 * Manages object data fields and provides matching properties
 *
 * 
 * @format
 */
var AbstractObject = function () {
  createClass(AbstractObject, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({});
    }
  }]);

  function AbstractObject() {
    var _this = this;

    classCallCheck(this, AbstractObject);

    this._data = {};
    if (this.constructor.Fields === undefined) {
      throw new Error('A "Fields" frozen object must be defined in the object class');
    }
    var fields = this.constructor.Fields;
    this._fields = Object.keys(fields);
    this._fields.forEach(function (field) {
      _this._defineProperty(field);
    });
  }

  /**
   * Define data getter and setter field
   * @param {String} field
   */


  createClass(AbstractObject, [{
    key: '_defineProperty',
    value: function _defineProperty(field) {
      var _this2 = this;

      Object.defineProperty(this, field, {
        get: function get() {
          return _this2._data[field];
        },
        set: function set(value) {
          _this2._data[field] = value;
        },
        enumerable: true
      });
    }

    /**
     * Set data field
     * @param {String} field
     * @param {Mixed} value
     * @return this
     */

  }, {
    key: 'set',
    value: function set(field, value) {
      if (this._fields.indexOf(field) < 0) {
        this._defineProperty(field);
      }
      var that = this;
      that[field] = value;
      return this;
    }

    /**
     * Set multiple data fields
     * @param {Object} data
     * @return this
     */

  }, {
    key: 'setData',
    value: function setData(data) {
      var _this3 = this;

      Object.keys(data).forEach(function (key) {
        _this3.set(key, data[key]);
      });
      return this;
    }

    /**
     * Export object data
     * @return {Object}
     */

  }, {
    key: 'exportData',
    value: function exportData() {
      return this._data;
    }
  }]);
  return AbstractObject;
}();

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * @format
 */
var Utils = function () {
  function Utils() {
    classCallCheck(this, Utils);
  }

  createClass(Utils, null, [{
    key: 'normalizeEndpoint',
    value: function normalizeEndpoint(str) {
      return str.replace(/^\/|\/$/g, '');
    }
  }, {
    key: 'removePreceedingSlash',
    value: function removePreceedingSlash(str) {
      return str.length && str[0] === '/' ? str.slice(1) : str;
    }
  }]);
  return Utils;
}();

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Cursor
 * Iterates over edge objects and controls pagination
 * 
 * @format
 */
var Cursor = function (_Array) {
  inherits(Cursor, _Array);

  /**
   * @param  {Object} sourceObject
   * @param  {Object} targetClass
   * @param  {Object} [params]
   * @param  {String} [endpoint]
   */
  function Cursor(sourceObject, targetClass, params, endpoint) {
    classCallCheck(this, Cursor);

    var _this = possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this));

    var next = [sourceObject.getId()];
    if (endpoint) {
      next.push(Utils.normalizeEndpoint(endpoint));
    } else {
      throw new Error('No endpoint specified for the target edge.');
    }
    _this._api = sourceObject.getApi();
    _this._targetClass = targetClass;
    _this.paging = { next: next };

    _this.clear = function () {
      _this.length = 0;
    };

    _this.set = function (array) {
      _this.clear();
      _this.push.apply(_this, toConsumableArray(array));
    };

    _this.next = function () {
      if (!_this.hasNext()) {
        return Promise.reject(new RangeError('end of pagination'));
      }
      return _this._loadPage(_this.paging.next);
    };

    _this.hasNext = function () {
      return Boolean(_this.paging) && Boolean(_this.paging.next);
    };

    _this.previous = function () {
      if (!_this.hasPrevious()) {
        return Promise.reject(new RangeError('start of pagination'));
      }
      return _this._loadPage(_this.paging.previous);
    };

    _this.hasPrevious = function () {
      return Boolean(_this.paging) && Boolean(_this.paging.previous);
    };

    _this._loadPage = function (path$$1) {
      var promise = new Promise(function (resolve, reject) {
        _this._api.call('GET', path$$1, params).then(function (response) {
          var objects = _this._buildObjectsFromResponse(response);
          _this.set(objects);
          _this.paging = response.paging;
          _this.summary = response.summary;
          resolve(_this);
        }).catch(reject);
      });
      if (params) params = undefined;
      return promise;
    };

    _this._buildObjectsFromResponse = function (response) {
      return response.data.map(function (item) {
        var That = _this._targetClass;
        if (That.name === 'AbstractObject') {
          var result = new That();
          result.setData(item);
          return result;
        }
        return new That(item && item.id ? item.id : null, item, undefined, _this._api);
      });
    };
    return _this;
  }

  return Cursor;
}(Array);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @format
 * 
 */
/**
 * Abstract Crud Object
 * Facebook Object basic persistence functions
 * @extends AbstractObject
 * 
 */
var AbstractCrudObject = function (_AbstractObject) {
  inherits(AbstractCrudObject, _AbstractObject);

  /**
   * @param  {Object} data
   * @param  {String} parentId
   * @param  {FacebookAdApi} [api]
   */
  function AbstractCrudObject() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var parentId = arguments[2];
    var api = arguments[3];
    classCallCheck(this, AbstractCrudObject);

    var _this = possibleConstructorReturn(this, (AbstractCrudObject.__proto__ || Object.getPrototypeOf(AbstractCrudObject)).call(this));

    _this._parentId = parentId;
    _this._api = api || FacebookAdsApi.getDefaultApi();
    if (id) {
      data.id = id;
    }
    if (data) {
      get$1(AbstractCrudObject.prototype.__proto__ || Object.getPrototypeOf(AbstractCrudObject.prototype), 'setData', _this).call(_this, data);
    }
    return _this;
  }

  /**
   * Define data getter and setter recording changes
   * @param {String} field
   */


  createClass(AbstractCrudObject, [{
    key: '_defineProperty',
    value: function _defineProperty(field) {
      var _this2 = this;

      if (this._changes === undefined) {
        this._changes = {};
      }
      Object.defineProperty(this, field, {
        get: function get() {
          return _this2._data[field];
        },
        set: function set(value) {
          _this2._changes[field] = value;
          _this2._data[field] = value;
        },
        enumerable: true
      });
    }

    /**
     * Set object data as if it were read from the server. Wipes related changes
     * @param {Object} data
     * @return this
     */

  }, {
    key: 'setData',
    value: function setData(data) {
      var _this3 = this;

      get$1(AbstractCrudObject.prototype.__proto__ || Object.getPrototypeOf(AbstractCrudObject.prototype), 'setData', this).call(this, data);
      Object.keys(data).forEach(function (key) {
        delete _this3._changes[key];
      });
      return this;
    }

    /**
     * Export changed object data
     * @return {Object}
     */

  }, {
    key: 'exportData',
    value: function exportData() {
      return this._changes;
    }

    /**
     * Export object data
     * @return {Object}
     */

  }, {
    key: 'exportAllData',
    value: function exportAllData() {
      return this._data;
    }

    /**
     * Clear change history
     * @return this
     */

  }, {
    key: 'clearHistory',
    value: function clearHistory() {
      this._changes = {};
      return this;
    }

    /**
     * @throws {Error} if object has no id
     * @return {String}
     */

  }, {
    key: 'getId',
    value: function getId() {
      if (!this.id) {
        throw new Error(this.constructor.name + ' Id not defined');
      }
      return this.id;
    }

    /**
     * @throws {Error} if object has no parent id
     * @return {String}
     */

  }, {
    key: 'getParentId',
    value: function getParentId() {
      if (!this._parentId) {
        throw new Error(this.constructor.name + ' parentId not defined');
      }
      return this._parentId;
    }

    /**
     * @return {String}
     */

  }, {
    key: 'getNodePath',
    value: function getNodePath() {
      return this.getId();
    }

    /**
     * Return object API instance
     * @throws {Error} if object doesn't hold an API
     * @return {FacebookAdsApi}
     */

  }, {
    key: 'getApi',
    value: function getApi() {
      var api = this._api;
      if (!api) {
        throw new Error(this.constructor.name + ' does not yet have an\n        associated api object.\n Did you forget to\n        instantiate an API session with:\n        "FacebookAdsApi.init"?');
      }
      return api;
    }

    /**
     * Read object data
     * @param   {Array}   [fields]
     * @param   {Object}  [params]
     * @return  {Promise}
     */

  }, {
    key: 'read',
    value: function read(fields) {
      var _this4 = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var api = this.getApi();
      var path$$1 = [this.getNodePath()];
      if (fields) params['fields'] = fields.join(',');
      return new Promise(function (resolve, reject) {
        api.call('GET', path$$1, params).then(function (data) {
          return resolve(_this4.setData(data));
        }).catch(reject);
      });
    }

    /**
     * Update object
     * @param   {Object}  [params]
     * @return  {Promise}
     */

  }, {
    key: 'update',
    value: function update() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var api = this.getApi();
      var path$$1 = [this.getNodePath()];
      params = Object.assign(params, this.exportData());
      return new Promise(function (resolve, reject) {
        api.call('POST', path$$1, params).then(function (data) {
          return resolve(data);
        }).catch(reject);
      });
    }

    /**
     * Delete object
     * @param   {Object}  [params]
     * @return  {Promise}
     */

  }, {
    key: 'delete',
    value: function _delete() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var api = this.getApi();
      var path$$1 = [this.getNodePath()];
      params = Object.assign(params, this.exportData());
      return new Promise(function (resolve, reject) {
        api.call('DELETE', path$$1, params).then(function (data) {
          return resolve(data);
        }).catch(reject);
      });
    }

    /**
     * Initialize Cursor to paginate on edges
     * @param  {Object}  targetClass
     * @param  {Array}   [fields]
     * @param  {Object}  [params]
     * @param  {Boolean} [fetchFirstPage]
     * @param  {String}  [endpoint]
     * @return {Cursor}
     */

  }, {
    key: 'getEdge',
    value: function getEdge(targetClass, fields) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var fetchFirstPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var endpoint = arguments[4];

      if (params == null) {
        params = {};
      }
      if (fields) {
        params['fields'] = fields.join(',');
      }
      var sourceObject = this;
      var cursor = new Cursor(sourceObject, targetClass, params, endpoint);
      if (fetchFirstPage) {
        return cursor.next();
      }
      return cursor;
    }

    /**
     * Create edge object
     * @param   {String}  [endpoint]
     * @param   {Array}  [fields]
     * @param   {Object}  [params]
     * @param   {Function} [targetClassConstructor]
     * @return  {Promise}
     */

  }, {
    key: 'createEdge',
    value: function createEdge(endpoint, fields) {
      var _this5 = this;

      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var targetClassConstructor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (params == null) {
        params = {};
      }
      if (fields && fields.length > 0) {
        params['fields'] = fields.join(',');
      }
      var api = this.getApi();
      var path$$1 = [this.getNodePath(), Utils.removePreceedingSlash(endpoint)];
      params = Object.assign(params, this.exportData());
      return new Promise(function (resolve, reject) {
        api.call('POST', path$$1, params).then(function (data) {
          resolve(
          /* eslint new-cap: "off" */
          targetClassConstructor === null ? _this5.setData(data) : new targetClassConstructor(data.id, data));
        }).catch(reject);
      });
    }

    /**
     * Delete edge object
     * @param   {String}  [endpoint]
     * @param   {Object}  [params]
     * @return  {Promise}
     */

  }, {
    key: 'deleteEdge',
    value: function deleteEdge(endpoint) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var api = this.getApi();
      var path$$1 = [this.getNodePath(), Utils.removePreceedingSlash(endpoint)];
      params = Object.assign(params, this.exportData());
      return new Promise(function (resolve, reject) {
        api.call('DELETE', path$$1, params).then(function (data) {
          return resolve(data);
        }).catch(reject);
      });
    }

    /**
     * Read Objects by Ids
     * @param  {Array}          ids
     * @param  {Array}          [fields]
     * @param  {Object}         [params]
     * @param  {FacebookAdsApi} [api]
     * @return {Promise}
     */

  }], [{
    key: 'getByIds',
    value: function getByIds(ids, fields) {
      var _this6 = this;

      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var api = arguments[3];

      api = api || FacebookAdsApi.getDefaultApi();
      if (fields) params['fields'] = fields.join(',');
      params['ids'] = ids.join(',');
      return new Promise(function (resolve, reject) {
        return api.call('GET', [''], params).then(function (response) {
          var result = [];
          for (var id in response) {
            var data = response[id];
            var That = _this6;
            var object = new That(data);
            result.push(object);
          }
          resolve(result);
        }).catch(reject);
      });
    }
  }]);
  return AbstractCrudObject;
}(AbstractObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * VideoThumbnail
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var VideoThumbnail = function (_AbstractCrudObject) {
  inherits(VideoThumbnail, _AbstractCrudObject);

  function VideoThumbnail() {
    classCallCheck(this, VideoThumbnail);
    return possibleConstructorReturn(this, (VideoThumbnail.__proto__ || Object.getPrototypeOf(VideoThumbnail)).apply(this, arguments));
  }

  createClass(VideoThumbnail, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        height: 'height',
        id: 'id',
        is_preferred: 'is_preferred',
        name: 'name',
        scale: 'scale',
        uri: 'uri',
        width: 'width'
      });
    }
  }]);
  return VideoThumbnail;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @format
 * 
 */
/**
 * Video uploader that can upload videos to adaccount
 **/

var VideoUploader = function () {
  function VideoUploader() {
    classCallCheck(this, VideoUploader);

    this._session = null;
  }

  /**
   * Upload the given video file.
   * @param {AdVideo} video The AdVideo object that will be uploaded
   * @param {Boolean} [waitForEncoding] Whether to wait until encoding
   *   is finished
   **/


  createClass(VideoUploader, [{
    key: 'upload',
    value: function upload(video, waitForEncoding) {
      // Check there is no existing session
      if (this._session) {
        throw Error('There is already an upload sessoin for this video uploader');
      }

      // Initate an upload session
      this._session = new VideoUploadSession(video, waitForEncoding);
      var result = this._session.start();
      this._session = null;
      return result;
    }
  }]);
  return VideoUploader;
}();

var VideoUploadSession = function () {
  function VideoUploadSession(video) {
    var waitForEncoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    classCallCheck(this, VideoUploadSession);

    this._video = video;
    this._api = video.getApi();

    if (video[AdVideo.Fields.filepath]) {
      this._filePath = video[AdVideo.Fields.filepath];
      this._slideshowSpec = null;
    } else if (video[AdVideo.Fields.slideshow_spec]) {
      this._slideshowSpec = video[AdVideo.Fields.slideshow_spec];
      this._filepath = null;
    }

    this._accountId = video.getParentId();
    this._waitForEncoding = waitForEncoding;
    // Setup start request manager
    this._startRequestManager = new VideoUploadStartRequestManager(this._api);
    // Setup transfer request manager
    this._transferRequestManager = new VideoUploadTransferRequestManager(this._api);
    // Setup finish request manager
    this._finishRequestManager = new VideoUploadFinishRequestManager(this._api);
  }

  createClass(VideoUploadSession, [{
    key: 'start',
    value: function start() {
      var videoId,
          startResponse,
          finishResponse,
          body,
          _this5 = this;

      return Promise.resolve().then(function () {
        videoId = void 0;

        // Run start request manager

        return _this5._startRequestManager.sendRequest(_this5.getStartRequestContext());
      }).then(function (_resp) {
        startResponse = _resp;

        _this5._startOffset = parseInt(startResponse['start_offset']);
        _this5._endOffset = parseInt(startResponse['end_offset']);
        _this5._sessionId = startResponse['upload_session_id'];
        videoId = startResponse['video_id'];
        // Run transfer request manager
        return _this5._transferRequestManager.sendRequest(_this5.getTransferRequestContext());
      }).then(function () {
        return _this5._finishRequestManager.sendRequest(_this5.getFinishRequestContext());
      }).then(function (_resp) {
        // Run finish request manager
        finishResponse = _resp;
        // Populate the video info

        body = finishResponse;

        body.id = videoId;
        delete body.success;

        return body;
      });
    }
  }, {
    key: 'getStartRequestContext',
    value: function getStartRequestContext() {
      var context = new VideoUploadRequestContext();

      if (this._filePath) {
        // Read file size
        context.fileSize = fs.statSync(this._filePath).size;
      }
      context.accountId = this._accountId;

      return context;
    }
  }, {
    key: 'getTransferRequestContext',
    value: function getTransferRequestContext() {
      var context = new VideoUploadRequestContext();

      context.sessionId = this._sessionId;
      context.startOffset = this._startOffset;
      context.endOffset = this._endOffset;

      if (this._filePath) {
        context.filePath = this._filePath;
      }
      if (this._slideshowSpec) {
        context.slideshowSpec = this._slideshowSpec;
      }
      context.accountId = this._accountId;

      return context;
    }
  }, {
    key: 'getFinishRequestContext',
    value: function getFinishRequestContext() {
      var context = new VideoUploadRequestContext();

      context.sessionId = this._sessionId;
      context.accountId = this._accountId;

      if (this._filePath) {
        context.fileName = path.basename(this._filePath);
      }

      return context;
    }
  }]);
  return VideoUploadSession;
}();

/**
 * Abstract class for request managers
 **/


var VideoUploadRequestManager = function VideoUploadRequestManager(api) {
  classCallCheck(this, VideoUploadRequestManager);

  this._api = api;

  // Check subclass method implementation
  if (this.sendRequest === undefined) {
    throw new TypeError('Class extending VideoUploadRequestManager must implement ' + 'sendRequest method');
  }

  // Check subclass method implementation
  if (this.getParamsFromContext === undefined) {
    throw new TypeError('Class extending VideoUploadRequestManager must implement ' + 'getParamsFromContext method');
  }
};

var VideoUploadStartRequestManager = function (_VideoUploadRequestMa) {
  inherits(VideoUploadStartRequestManager, _VideoUploadRequestMa);

  function VideoUploadStartRequestManager() {
    classCallCheck(this, VideoUploadStartRequestManager);
    return possibleConstructorReturn(this, (VideoUploadStartRequestManager.__proto__ || Object.getPrototypeOf(VideoUploadStartRequestManager)).apply(this, arguments));
  }

  createClass(VideoUploadStartRequestManager, [{
    key: 'sendRequest',

    /**
     * Send start request with the given context
     **/
    value: function sendRequest(context) {
      var request,
          response,
          _this6 = this;

      return Promise.resolve().then(function () {
        // Init a VideoUploadRequest and send the request
        request = new VideoUploadRequest(_this6._api);

        request.setParams(_this6.getParamsFromContext(context));

        return request.send([context.accountId, 'advideos']);
      }).then(function (_resp) {
        response = _resp;


        return response;
      });
    }
  }, {
    key: 'getParamsFromContext',
    value: function getParamsFromContext(context) {
      return {
        file_size: context.fileSize,
        upload_phase: 'start'
      };
    }
  }]);
  return VideoUploadStartRequestManager;
}(VideoUploadRequestManager);

var VideoUploadTransferRequestManager = function (_VideoUploadRequestMa2) {
  inherits(VideoUploadTransferRequestManager, _VideoUploadRequestMa2);

  function VideoUploadTransferRequestManager() {
    classCallCheck(this, VideoUploadTransferRequestManager);
    return possibleConstructorReturn(this, (VideoUploadTransferRequestManager.__proto__ || Object.getPrototypeOf(VideoUploadTransferRequestManager)).apply(this, arguments));
  }

  createClass(VideoUploadTransferRequestManager, [{
    key: 'sendRequest',


    /**
     * Send transfer request with the given context
     **/
    value: function sendRequest(context) {
      function _recursive() {
        var _this8 = this;

        if (_this8._startOffset !== _this8._endOffset) {
          return Promise.resolve().then(function () {
            context.startOffset = _this8._startOffset;
            context.endOffset = _this8._endOffset;
            request.setParams(_this8.getParamsFromContext(context), {
              video_file_chunk: fs.createReadStream(context.filePath, {
                start: context.startOffset,
                end: context.endOffset - 1
              })
            });
            // Send the request
            return Promise.resolve().then(function () {
              return request.send([context.accountId, 'advideos']);
            }).then(function (_resp) {
              _response = _resp;


              _this8._startOffset = parseInt(_response['start_offset']);
              _this8._endOffset = parseInt(_response['end_offset']);
            }).catch(function (error) {
              if (numRetry > 0) {
                numRetry = Math.max(numRetry - 1, 0);
                return _recursive();
              }
              fs.close(videoFileDescriptor);
              throw error;
            });
          }).then(function () {
            return _recursive();
          });
        }
      }

      var request,
          filePath,
          fileSize,
          numRetry,
          response,
          videoFileDescriptor,
          _response,
          _this7 = this;

      return Promise.resolve().then(function () {
        // Init a VideoUploadRequest
        request = new VideoUploadRequest(_this7._api);

        _this7._startOffset = context.startOffset;
        _this7._endOffset = context.endOffset;
        filePath = context.filePath;
        fileSize = fs.statSync(filePath).size;

        // Give a chance to retry every 10M, or at least twice

        numRetry = Math.max(fileSize / (1024 * 1024 * 10), 2);
        response = null;
        // While there are still more chunks to send

        videoFileDescriptor = fs.openSync(filePath, 'r');
        return _recursive();
      }).then(function () {
        fs.close(videoFileDescriptor);

        return response;
      });
    }
  }, {
    key: 'getParamsFromContext',
    value: function getParamsFromContext(context) {
      return {
        upload_phase: 'transfer',
        start_offset: context.startOffset,
        upload_session_id: context.sessionId,
        video_file_chunk: context.videoFileChunk
      };
    }
  }]);
  return VideoUploadTransferRequestManager;
}(VideoUploadRequestManager);

var VideoUploadFinishRequestManager = function (_VideoUploadRequestMa3) {
  inherits(VideoUploadFinishRequestManager, _VideoUploadRequestMa3);

  function VideoUploadFinishRequestManager() {
    classCallCheck(this, VideoUploadFinishRequestManager);
    return possibleConstructorReturn(this, (VideoUploadFinishRequestManager.__proto__ || Object.getPrototypeOf(VideoUploadFinishRequestManager)).apply(this, arguments));
  }

  createClass(VideoUploadFinishRequestManager, [{
    key: 'sendRequest',

    /**
     * Send transfer request with the given context
     **/
    value: function sendRequest(context) {
      var request,
          response,
          _this11 = this;

      return Promise.resolve().then(function () {
        // Init a VideoUploadRequest
        request = new VideoUploadRequest(_this11._api);

        // Parse the context

        request.setParams(_this11.getParamsFromContext(context));

        // Sent the request
        return request.send([context.accountId, 'advideos']);
      }).then(function (_resp) {
        response = _resp;


        return response;
      });
    }
  }, {
    key: 'getParamsFromContext',
    value: function getParamsFromContext(context) {
      return {
        upload_phase: 'finish',
        upload_session_id: context.sessionId,
        title: context.fileName
      };
    }
  }]);
  return VideoUploadFinishRequestManager;
}(VideoUploadRequestManager);

/**
 * Upload request context that contains the param data
 **/


var VideoUploadRequestContext = function () {
  function VideoUploadRequestContext() {
    classCallCheck(this, VideoUploadRequestContext);
  }

  createClass(VideoUploadRequestContext, [{
    key: 'accountId',
    get: function get() {
      return this._accountId;
    },
    set: function set(accountId) {
      this._accountId = accountId;
    }
  }, {
    key: 'fileName',
    get: function get() {
      return this._fileName;
    },
    set: function set(fileName) {
      this._fileName = fileName;
    }
  }, {
    key: 'filePath',
    get: function get() {
      return this._filePath;
    },
    set: function set(filePath) {
      this._filePath = filePath;
    }
  }, {
    key: 'fileSize',
    get: function get() {
      return this._fileSize;
    },
    set: function set(fileSize) {
      this._fileSize = fileSize;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    },
    set: function set(name) {
      this._name = name;
    }
  }, {
    key: 'sessionId',
    get: function get() {
      return this._sessionId;
    },
    set: function set(sessionId) {
      this._sessionId = sessionId;
    }
  }, {
    key: 'startOffset',
    get: function get() {
      return this._startOffset;
    },
    set: function set(startOffset) {
      this._startOffset = startOffset;
    }
  }, {
    key: 'endOffset',
    get: function get() {
      return this._endOffset;
    },
    set: function set(endOffset) {
      this._endOffset = endOffset;
    }
  }, {
    key: 'slideshowSpec',
    get: function get() {
      return this._slideshowSpec;
    },
    set: function set(slideshowSpec) {
      this._slideshowSpec = slideshowSpec;
    }
  }]);
  return VideoUploadRequestContext;
}();

var VideoUploadRequest = function () {
  function VideoUploadRequest(api) {
    classCallCheck(this, VideoUploadRequest);

    this._params = null;
    this._files = null;
    this._api = api;
  }

  /**
   * Send the current request
   **/


  createClass(VideoUploadRequest, [{
    key: 'send',
    value: function send(path$$1) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4._api.call('POST', path$$1, _this4._params, _this4._files, true, // use multipart/form-data
        FacebookAdsApi.GRAPH_VIDEO // override graph.facebook.com
        ).then(function (response) {
          return resolve(JSON.parse(response));
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'setParams',
    value: function setParams(params) {
      var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this._params = params;
      this._files = files;
    }
  }]);
  return VideoUploadRequest;
}();

function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

var VideoEncodingStatusChecker = function () {
  function VideoEncodingStatusChecker() {
    classCallCheck(this, VideoEncodingStatusChecker);
  }

  createClass(VideoEncodingStatusChecker, null, [{
    key: 'waitUntilReady',
    value: function waitUntilReady(api, videoId, interval, timeout) {
      function _recursive2() {
        var _test;

        _test = true;

        if (_test) {
          status = VideoEncodingStatusChecker.getStatus(api, videoId);
          status = status['video_status'];
        }

        if (_test && status !== 'processing') {
          return _recursive2;
        } else {

          if (_test && startTime + timeout <= new Date().getTime()) {
            throw Error('Video encoding timeout: ' + timeout);
          }

          if (_test) {
            return Promise.resolve().then(function () {
              return sleep(interval);
            }).then(function () {
              return _recursive2();
            });
          }
        }
      }

      var startTime, status;
      return Promise.resolve().then(function () {
        startTime = new Date().getTime();
        status = null;
        return _recursive2();
      }).then(function () {

        if (status !== 'ready') {
          throw Error('Video encoding status ' + status);
        }
      });
    }
  }, {
    key: 'getStatus',
    value: function getStatus(api, videoId) {
      var result = api.call('GET', [parseInt(videoId)], { fields: 'status' });

      return result['status'];
    }
  }]);
  return VideoEncodingStatusChecker;
}();

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdVideo
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdVideo = function (_AbstractCrudObject) {
  inherits(AdVideo, _AbstractCrudObject);

  function AdVideo() {
    classCallCheck(this, AdVideo);
    return possibleConstructorReturn(this, (AdVideo.__proto__ || Object.getPrototypeOf(AdVideo)).apply(this, arguments));
  }

  createClass(AdVideo, [{
    key: 'create',


    /**
     * Uploads filepath and creates the AdVideo object from it.
     * It requires 'filepath' property to be defined.
     **/
    value: function create(batch, failureHandler, successHandler) {
      var response = null;

      if (this[AdVideo.Fields.slideshow_spec]) {
        var request = new VideoUploadRequest(this.getApi());

        request.setParams({
          'slideshow_spec[images_urls]': JSON.stringify(this[AdVideo.Fields.slideshow_spec]['images_urls']),
          'slideshow_spec[duration_ms]': this[AdVideo.Fields.slideshow_spec]['duration_ms'],
          'slideshow_spec[transition_ms]': this[AdVideo.Fields.slideshow_spec]['transition_ms']
        });
        response = request.send([this.getParentId(), 'advideos']);
      } else if (this[AdVideo.Fields.filepath]) {
        var videoUploader = new VideoUploader();

        response = videoUploader.upload(this);
      } else {
        throw Error('AdVideo requires a filepath or slideshow_spec to be defined.');
      }

      this.setData(response);

      return response;
    }
  }, {
    key: 'waitUntilEncodingReady',
    value: function waitUntilEncodingReady() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 600;

      if (!this['id']) {
        throw Error('Invalid Video ID');
      }

      VideoEncodingStatusChecker.waitUntilReady(this.getApi(), this['id'], interval, timeout);
    }

    /**
     *  Returns all the thumbnails associated with the ad video
     */

  }, {
    key: 'getThumbnails',
    value: function getThumbnails(fields, params) {
      return this.getEdge(VideoThumbnail, fields, params, 'thumbnails');
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        filepath: 'filepath',
        id: 'id',
        slideshow_spec: 'slideshow_spec'
      });
    }
  }]);
  return AdVideo;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdActivity
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdActivity = function (_AbstractCrudObject) {
  inherits(AdActivity, _AbstractCrudObject);

  function AdActivity() {
    classCallCheck(this, AdActivity);
    return possibleConstructorReturn(this, (AdActivity.__proto__ || Object.getPrototypeOf(AdActivity)).apply(this, arguments));
  }

  createClass(AdActivity, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        actor_id: 'actor_id',
        actor_name: 'actor_name',
        application_id: 'application_id',
        application_name: 'application_name',
        date_time_in_timezone: 'date_time_in_timezone',
        event_time: 'event_time',
        event_type: 'event_type',
        extra_data: 'extra_data',
        object_id: 'object_id',
        object_name: 'object_name',
        translated_event_type: 'translated_event_type'
      });
    }
  }, {
    key: 'EventType',
    get: function get() {
      return Object.freeze({
        ad_account_update_spend_limit: 'ad_account_update_spend_limit',
        ad_account_reset_spend_limit: 'ad_account_reset_spend_limit',
        ad_account_remove_spend_limit: 'ad_account_remove_spend_limit',
        ad_account_set_business_information: 'ad_account_set_business_information',
        ad_account_update_status: 'ad_account_update_status',
        ad_account_add_user_to_role: 'ad_account_add_user_to_role',
        ad_account_remove_user_from_role: 'ad_account_remove_user_from_role',
        add_images: 'add_images',
        edit_images: 'edit_images',
        delete_images: 'delete_images',
        ad_account_billing_charge: 'ad_account_billing_charge',
        ad_account_billing_charge_failed: 'ad_account_billing_charge_failed',
        ad_account_billing_chargeback: 'ad_account_billing_chargeback',
        ad_account_billing_chargeback_reversal: 'ad_account_billing_chargeback_reversal',
        ad_account_billing_decline: 'ad_account_billing_decline',
        ad_account_billing_refund: 'ad_account_billing_refund',
        billing_event: 'billing_event',
        add_funding_source: 'add_funding_source',
        remove_funding_source: 'remove_funding_source',
        create_campaign_group: 'create_campaign_group',
        update_campaign_name: 'update_campaign_name',
        update_campaign_run_status: 'update_campaign_run_status',
        update_campaign_group_spend_cap: 'update_campaign_group_spend_cap',
        create_campaign_legacy: 'create_campaign_legacy',
        update_campaign_budget: 'update_campaign_budget',
        update_campaign_duration: 'update_campaign_duration',
        campaign_ended: 'campaign_ended',
        create_ad_set: 'create_ad_set',
        update_ad_set_bidding: 'update_ad_set_bidding',
        update_ad_set_bid_strategy: 'update_ad_set_bid_strategy',
        update_ad_set_budget: 'update_ad_set_budget',
        update_ad_set_duration: 'update_ad_set_duration',
        update_ad_set_run_status: 'update_ad_set_run_status',
        update_ad_set_name: 'update_ad_set_name',
        update_ad_set_target_spec: 'update_ad_set_target_spec',
        update_ad_set_bid_adjustments: 'update_ad_set_bid_adjustments',
        create_ad: 'create_ad',
        ad_review_approved: 'ad_review_approved',
        ad_review_declined: 'ad_review_declined',
        update_ad_creative: 'update_ad_creative',
        edit_and_update_ad_creative: 'edit_and_update_ad_creative',
        update_ad_bid_info: 'update_ad_bid_info',
        update_ad_bid_type: 'update_ad_bid_type',
        update_ad_run_status: 'update_ad_run_status',
        update_ad_friendly_name: 'update_ad_friendly_name',
        update_ad_targets_spec: 'update_ad_targets_spec',
        update_adgroup_stop_delivery: 'update_adgroup_stop_delivery',
        first_delivery_event: 'first_delivery_event',
        create_audience: 'create_audience',
        update_audience: 'update_audience',
        delete_audience: 'delete_audience',
        share_audience: 'share_audience',
        receive_audience: 'receive_audience',
        unshare_audience: 'unshare_audience',
        remove_shared_audience: 'remove_shared_audience',
        unknown: 'unknown',
        account_spending_limit_reached: 'account_spending_limit_reached',
        campaign_spending_limit_reached: 'campaign_spending_limit_reached',
        lifetime_budget_spent: 'lifetime_budget_spent',
        funding_event_initiated: 'funding_event_initiated',
        funding_event_successful: 'funding_event_successful',
        update_ad_labels: 'update_ad_labels'
      });
    }
  }, {
    key: 'Category',
    get: function get() {
      return Object.freeze({
        account: 'ACCOUNT',
        ad: 'AD',
        ad_set: 'AD_SET',
        audience: 'AUDIENCE',
        bid: 'BID',
        budget: 'BUDGET',
        campaign: 'CAMPAIGN',
        date: 'DATE',
        status: 'STATUS',
        targeting: 'TARGETING'
      });
    }
  }]);
  return AdActivity;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdPlacePageSet
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdPlacePageSet = function (_AbstractCrudObject) {
  inherits(AdPlacePageSet, _AbstractCrudObject);

  function AdPlacePageSet() {
    classCallCheck(this, AdPlacePageSet);
    return possibleConstructorReturn(this, (AdPlacePageSet.__proto__ || Object.getPrototypeOf(AdPlacePageSet)).apply(this, arguments));
  }

  createClass(AdPlacePageSet, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdPlacePageSet.prototype.__proto__ || Object.getPrototypeOf(AdPlacePageSet.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        id: 'id',
        location_types: 'location_types',
        name: 'name',
        pages_count: 'pages_count',
        parent_page: 'parent_page'
      });
    }
  }, {
    key: 'LocationTypes',
    get: function get() {
      return Object.freeze({
        recent: 'recent',
        home: 'home'
      });
    }
  }]);
  return AdPlacePageSet;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleHistory
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleHistory = function (_AbstractCrudObject) {
  inherits(AdRuleHistory, _AbstractCrudObject);

  function AdRuleHistory() {
    classCallCheck(this, AdRuleHistory);
    return possibleConstructorReturn(this, (AdRuleHistory.__proto__ || Object.getPrototypeOf(AdRuleHistory)).apply(this, arguments));
  }

  createClass(AdRuleHistory, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        evaluation_spec: 'evaluation_spec',
        exception_code: 'exception_code',
        exception_message: 'exception_message',
        execution_spec: 'execution_spec',
        is_manual: 'is_manual',
        results: 'results',
        schedule_spec: 'schedule_spec',
        timestamp: 'timestamp'
      });
    }
  }, {
    key: 'Action',
    get: function get() {
      return Object.freeze({
        budget_not_redistributed: 'BUDGET_NOT_REDISTRIBUTED',
        changed_bid: 'CHANGED_BID',
        changed_budget: 'CHANGED_BUDGET',
        email: 'EMAIL',
        endpoint_pinged: 'ENDPOINT_PINGED',
        error: 'ERROR',
        facebook_notification_sent: 'FACEBOOK_NOTIFICATION_SENT',
        message_sent: 'MESSAGE_SENT',
        not_changed: 'NOT_CHANGED',
        paused: 'PAUSED',
        unpaused: 'UNPAUSED'
      });
    }
  }]);
  return AdRuleHistory;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRule
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRule = function (_AbstractCrudObject) {
  inherits(AdRule, _AbstractCrudObject);

  function AdRule() {
    classCallCheck(this, AdRule);
    return possibleConstructorReturn(this, (AdRule.__proto__ || Object.getPrototypeOf(AdRule)).apply(this, arguments));
  }

  createClass(AdRule, [{
    key: 'getHistory',
    value: function getHistory(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdRuleHistory, fields, params, fetchFirstPage, '/history');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(AdRule.prototype.__proto__ || Object.getPrototypeOf(AdRule.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdRule.prototype.__proto__ || Object.getPrototypeOf(AdRule.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        created_by: 'created_by',
        created_time: 'created_time',
        evaluation_spec: 'evaluation_spec',
        execution_spec: 'execution_spec',
        id: 'id',
        name: 'name',
        schedule_spec: 'schedule_spec',
        status: 'status',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        enabled: 'ENABLED',
        disabled: 'DISABLED',
        deleted: 'DELETED'
      });
    }
  }]);
  return AdRule;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdsInsights
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdsInsights = function (_AbstractCrudObject) {
  inherits(AdsInsights, _AbstractCrudObject);

  function AdsInsights() {
    classCallCheck(this, AdsInsights);
    return possibleConstructorReturn(this, (AdsInsights.__proto__ || Object.getPrototypeOf(AdsInsights)).apply(this, arguments));
  }

  createClass(AdsInsights, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_currency: 'account_currency',
        account_id: 'account_id',
        account_name: 'account_name',
        action_values: 'action_values',
        actions: 'actions',
        ad_id: 'ad_id',
        ad_name: 'ad_name',
        adset_id: 'adset_id',
        adset_name: 'adset_name',
        buying_type: 'buying_type',
        call_to_action_clicks: 'call_to_action_clicks',
        campaign_id: 'campaign_id',
        campaign_name: 'campaign_name',
        canvas_avg_view_percent: 'canvas_avg_view_percent',
        canvas_avg_view_time: 'canvas_avg_view_time',
        clicks: 'clicks',
        cost_per_10_sec_video_view: 'cost_per_10_sec_video_view',
        cost_per_action_type: 'cost_per_action_type',
        cost_per_estimated_ad_recallers: 'cost_per_estimated_ad_recallers',
        cost_per_inline_link_click: 'cost_per_inline_link_click',
        cost_per_inline_post_engagement: 'cost_per_inline_post_engagement',
        cost_per_outbound_click: 'cost_per_outbound_click',
        cost_per_total_action: 'cost_per_total_action',
        cost_per_unique_action_type: 'cost_per_unique_action_type',
        cost_per_unique_click: 'cost_per_unique_click',
        cost_per_unique_inline_link_click: 'cost_per_unique_inline_link_click',
        cost_per_unique_outbound_click: 'cost_per_unique_outbound_click',
        cpc: 'cpc',
        cpm: 'cpm',
        cpp: 'cpp',
        ctr: 'ctr',
        date_start: 'date_start',
        date_stop: 'date_stop',
        estimated_ad_recall_rate: 'estimated_ad_recall_rate',
        estimated_ad_recallers: 'estimated_ad_recallers',
        frequency: 'frequency',
        impressions: 'impressions',
        inline_link_click_ctr: 'inline_link_click_ctr',
        inline_link_clicks: 'inline_link_clicks',
        inline_post_engagement: 'inline_post_engagement',
        mobile_app_purchase_roas: 'mobile_app_purchase_roas',
        objective: 'objective',
        outbound_clicks: 'outbound_clicks',
        outbound_clicks_ctr: 'outbound_clicks_ctr',
        place_page_name: 'place_page_name',
        reach: 'reach',
        relevance_score: 'relevance_score',
        social_clicks: 'social_clicks',
        social_impressions: 'social_impressions',
        social_reach: 'social_reach',
        social_spend: 'social_spend',
        spend: 'spend',
        total_action_value: 'total_action_value',
        total_actions: 'total_actions',
        total_unique_actions: 'total_unique_actions',
        unique_actions: 'unique_actions',
        unique_clicks: 'unique_clicks',
        unique_ctr: 'unique_ctr',
        unique_inline_link_click_ctr: 'unique_inline_link_click_ctr',
        unique_inline_link_clicks: 'unique_inline_link_clicks',
        unique_link_clicks_ctr: 'unique_link_clicks_ctr',
        unique_outbound_clicks: 'unique_outbound_clicks',
        unique_outbound_clicks_ctr: 'unique_outbound_clicks_ctr',
        unique_social_clicks: 'unique_social_clicks',
        video_10_sec_watched_actions: 'video_10_sec_watched_actions',
        video_30_sec_watched_actions: 'video_30_sec_watched_actions',
        video_avg_percent_watched_actions: 'video_avg_percent_watched_actions',
        video_avg_time_watched_actions: 'video_avg_time_watched_actions',
        video_p100_watched_actions: 'video_p100_watched_actions',
        video_p25_watched_actions: 'video_p25_watched_actions',
        video_p50_watched_actions: 'video_p50_watched_actions',
        video_p75_watched_actions: 'video_p75_watched_actions',
        video_p95_watched_actions: 'video_p95_watched_actions',
        website_ctr: 'website_ctr',
        website_purchase_roas: 'website_purchase_roas'
      });
    }
  }, {
    key: 'ActionAttributionWindows',
    get: function get() {
      return Object.freeze({
        value_1d_view: '1d_view',
        value_7d_view: '7d_view',
        value_28d_view: '28d_view',
        value_1d_click: '1d_click',
        value_7d_click: '7d_click',
        value_28d_click: '28d_click',
        default: 'default'
      });
    }
  }, {
    key: 'ActionBreakdowns',
    get: function get() {
      return Object.freeze({
        action_canvas_component_name: 'action_canvas_component_name',
        action_carousel_card_id: 'action_carousel_card_id',
        action_carousel_card_name: 'action_carousel_card_name',
        action_destination: 'action_destination',
        action_device: 'action_device',
        action_link_click_destination: 'action_link_click_destination',
        action_reaction: 'action_reaction',
        action_target_id: 'action_target_id',
        action_type: 'action_type',
        action_video_sound: 'action_video_sound',
        action_video_type: 'action_video_type'
      });
    }
  }, {
    key: 'ActionReportTime',
    get: function get() {
      return Object.freeze({
        impression: 'impression',
        conversion: 'conversion'
      });
    }
  }, {
    key: 'Breakdowns',
    get: function get() {
      return Object.freeze({
        age: 'age',
        country: 'country',
        dma: 'dma',
        gender: 'gender',
        frequency_value: 'frequency_value',
        hourly_stats_aggregated_by_advertiser_time_zone: 'hourly_stats_aggregated_by_advertiser_time_zone',
        hourly_stats_aggregated_by_audience_time_zone: 'hourly_stats_aggregated_by_audience_time_zone',
        impression_device: 'impression_device',
        place_page_id: 'place_page_id',
        publisher_platform: 'publisher_platform',
        platform_position: 'platform_position',
        device_platform: 'device_platform',
        product_id: 'product_id',
        region: 'region',
        ad_format_asset: 'ad_format_asset',
        body_asset: 'body_asset',
        call_to_action_asset: 'call_to_action_asset',
        description_asset: 'description_asset',
        image_asset: 'image_asset',
        link_url_asset: 'link_url_asset',
        title_asset: 'title_asset',
        video_asset: 'video_asset'
      });
    }
  }, {
    key: 'DatePreset',
    get: function get() {
      return Object.freeze({
        today: 'today',
        yesterday: 'yesterday',
        this_month: 'this_month',
        last_month: 'last_month',
        this_quarter: 'this_quarter',
        lifetime: 'lifetime',
        last_3d: 'last_3d',
        last_7d: 'last_7d',
        last_14d: 'last_14d',
        last_28d: 'last_28d',
        last_30d: 'last_30d',
        last_90d: 'last_90d',
        last_week_mon_sun: 'last_week_mon_sun',
        last_week_sun_sat: 'last_week_sun_sat',
        last_quarter: 'last_quarter',
        last_year: 'last_year',
        this_week_mon_today: 'this_week_mon_today',
        this_week_sun_today: 'this_week_sun_today',
        this_year: 'this_year'
      });
    }
  }, {
    key: 'Level',
    get: function get() {
      return Object.freeze({
        ad: 'ad',
        adset: 'adset',
        campaign: 'campaign',
        account: 'account'
      });
    }
  }, {
    key: 'SummaryActionBreakdowns',
    get: function get() {
      return Object.freeze({
        action_canvas_component_name: 'action_canvas_component_name',
        action_carousel_card_id: 'action_carousel_card_id',
        action_carousel_card_name: 'action_carousel_card_name',
        action_destination: 'action_destination',
        action_device: 'action_device',
        action_link_click_destination: 'action_link_click_destination',
        action_reaction: 'action_reaction',
        action_target_id: 'action_target_id',
        action_type: 'action_type',
        action_video_sound: 'action_video_sound',
        action_video_type: 'action_video_type'
      });
    }
  }, {
    key: 'Summary',
    get: function get() {
      return Object.freeze({
        id: 'id',
        account_id: 'account_id',
        async_percent_completion: 'async_percent_completion',
        async_status: 'async_status',
        date_start: 'date_start',
        date_stop: 'date_stop',
        emails: 'emails',
        friendly_name: 'friendly_name',
        is_bookmarked: 'is_bookmarked',
        is_running: 'is_running',
        schedule_id: 'schedule_id',
        time_completed: 'time_completed',
        time_ref: 'time_ref'
      });
    }
  }]);
  return AdsInsights;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdReportRun
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdReportRun = function (_AbstractCrudObject) {
  inherits(AdReportRun, _AbstractCrudObject);

  function AdReportRun() {
    classCallCheck(this, AdReportRun);
    return possibleConstructorReturn(this, (AdReportRun.__proto__ || Object.getPrototypeOf(AdReportRun)).apply(this, arguments));
  }

  createClass(AdReportRun, [{
    key: 'getInsights',
    value: function getInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsInsights, fields, params, fetchFirstPage, '/insights');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        async_percent_completion: 'async_percent_completion',
        async_status: 'async_status',
        date_start: 'date_start',
        date_stop: 'date_stop',
        emails: 'emails',
        friendly_name: 'friendly_name',
        id: 'id',
        is_bookmarked: 'is_bookmarked',
        is_running: 'is_running',
        schedule_id: 'schedule_id',
        time_completed: 'time_completed',
        time_ref: 'time_ref'
      });
    }
  }]);
  return AdReportRun;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdKeywordStats
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdKeywordStats = function (_AbstractCrudObject) {
  inherits(AdKeywordStats, _AbstractCrudObject);

  function AdKeywordStats() {
    classCallCheck(this, AdKeywordStats);
    return possibleConstructorReturn(this, (AdKeywordStats.__proto__ || Object.getPrototypeOf(AdKeywordStats)).apply(this, arguments));
  }

  createClass(AdKeywordStats, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        actions: 'actions',
        clicks: 'clicks',
        cost_per_total_action: 'cost_per_total_action',
        cost_per_unique_click: 'cost_per_unique_click',
        cpc: 'cpc',
        cpm: 'cpm',
        cpp: 'cpp',
        ctr: 'ctr',
        frequency: 'frequency',
        id: 'id',
        impressions: 'impressions',
        name: 'name',
        reach: 'reach',
        spend: 'spend',
        total_actions: 'total_actions',
        total_unique_actions: 'total_unique_actions',
        unique_actions: 'unique_actions',
        unique_clicks: 'unique_clicks',
        unique_ctr: 'unique_ctr',
        unique_impressions: 'unique_impressions'
      });
    }
  }]);
  return AdKeywordStats;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Lead
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Lead = function (_AbstractCrudObject) {
  inherits(Lead, _AbstractCrudObject);

  function Lead() {
    classCallCheck(this, Lead);
    return possibleConstructorReturn(this, (Lead.__proto__ || Object.getPrototypeOf(Lead)).apply(this, arguments));
  }

  createClass(Lead, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(Lead.prototype.__proto__ || Object.getPrototypeOf(Lead.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ad_id: 'ad_id',
        ad_name: 'ad_name',
        adset_id: 'adset_id',
        adset_name: 'adset_name',
        campaign_id: 'campaign_id',
        campaign_name: 'campaign_name',
        created_time: 'created_time',
        custom_disclaimer_responses: 'custom_disclaimer_responses',
        field_data: 'field_data',
        form_id: 'form_id',
        id: 'id',
        is_organic: 'is_organic',
        post: 'post',
        retailer_item_id: 'retailer_item_id'
      });
    }
  }]);
  return Lead;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdPreview
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdPreview = function (_AbstractCrudObject) {
  inherits(AdPreview, _AbstractCrudObject);

  function AdPreview() {
    classCallCheck(this, AdPreview);
    return possibleConstructorReturn(this, (AdPreview.__proto__ || Object.getPrototypeOf(AdPreview)).apply(this, arguments));
  }

  createClass(AdPreview, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        body: 'body'
      });
    }
  }, {
    key: 'AdFormat',
    get: function get() {
      return Object.freeze({
        right_column_standard: 'RIGHT_COLUMN_STANDARD',
        desktop_feed_standard: 'DESKTOP_FEED_STANDARD',
        mobile_feed_standard: 'MOBILE_FEED_STANDARD',
        mobile_feed_basic: 'MOBILE_FEED_BASIC',
        mobile_interstitial: 'MOBILE_INTERSTITIAL',
        mobile_banner: 'MOBILE_BANNER',
        mobile_medium_rectangle: 'MOBILE_MEDIUM_RECTANGLE',
        mobile_fullwidth: 'MOBILE_FULLWIDTH',
        mobile_native: 'MOBILE_NATIVE',
        instagram_standard: 'INSTAGRAM_STANDARD',
        instagram_story: 'INSTAGRAM_STORY',
        audience_network_instream_video: 'AUDIENCE_NETWORK_INSTREAM_VIDEO',
        audience_network_outstream_video: 'AUDIENCE_NETWORK_OUTSTREAM_VIDEO',
        audience_network_instream_video_mobile: 'AUDIENCE_NETWORK_INSTREAM_VIDEO_MOBILE',
        audience_network_rewarded_video: 'AUDIENCE_NETWORK_REWARDED_VIDEO',
        instant_article_standard: 'INSTANT_ARTICLE_STANDARD',
        instream_video_desktop: 'INSTREAM_VIDEO_DESKTOP',
        instream_video_mobile: 'INSTREAM_VIDEO_MOBILE',
        messenger_mobile_inbox_media: 'MESSENGER_MOBILE_INBOX_MEDIA',
        suggested_video_desktop: 'SUGGESTED_VIDEO_DESKTOP',
        suggested_video_mobile: 'SUGGESTED_VIDEO_MOBILE',
        marketplace_mobile: 'MARKETPLACE_MOBILE'
      });
    }
  }]);
  return AdPreview;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingSentenceLine
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingSentenceLine = function (_AbstractCrudObject) {
  inherits(TargetingSentenceLine, _AbstractCrudObject);

  function TargetingSentenceLine() {
    classCallCheck(this, TargetingSentenceLine);
    return possibleConstructorReturn(this, (TargetingSentenceLine.__proto__ || Object.getPrototypeOf(TargetingSentenceLine)).apply(this, arguments));
  }

  createClass(TargetingSentenceLine, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        params: 'params',
        targetingsentencelines: 'targetingsentencelines'
      });
    }
  }]);
  return TargetingSentenceLine;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Ad
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Ad = function (_AbstractCrudObject) {
  inherits(Ad, _AbstractCrudObject);

  function Ad() {
    classCallCheck(this, Ad);
    return possibleConstructorReturn(this, (Ad.__proto__ || Object.getPrototypeOf(Ad)).apply(this, arguments));
  }

  createClass(Ad, [{
    key: 'getAdCreatives',
    value: function getAdCreatives(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdCreative, fields, params, fetchFirstPage, '/adcreatives');
    }
  }, {
    key: 'deleteAdLabels',
    value: function deleteAdLabels(params) {
      return get$1(Ad.prototype.__proto__ || Object.getPrototypeOf(Ad.prototype), 'deleteEdge', this).call(this, '/adlabels', params);
    }
  }, {
    key: 'createAdLabel',
    value: function createAdLabel(fields, params) {
      return this.createEdge('/adlabels', fields, params, AdLabel);
    }
  }, {
    key: 'getAdRulesGoverned',
    value: function getAdRulesGoverned(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdRule, fields, params, fetchFirstPage, '/adrules_governed');
    }
  }, {
    key: 'createCopy',
    value: function createCopy(fields, params) {
      return this.createEdge('/copies', fields, params, Ad);
    }
  }, {
    key: 'getInsights',
    value: function getInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsInsights, fields, params, fetchFirstPage, '/insights');
    }
  }, {
    key: 'getInsightsAsync',
    value: function getInsightsAsync(fields, params) {
      return this.createEdge('/insights', fields, params, AdReportRun);
    }
  }, {
    key: 'getKeywordStats',
    value: function getKeywordStats(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdKeywordStats, fields, params, fetchFirstPage, '/keywordstats');
    }
  }, {
    key: 'getLeads',
    value: function getLeads(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Lead, fields, params, fetchFirstPage, '/leads');
    }
  }, {
    key: 'createLead',
    value: function createLead(fields, params) {
      return this.createEdge('/leads', fields, params);
    }
  }, {
    key: 'getPreviews',
    value: function getPreviews(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdPreview, fields, params, fetchFirstPage, '/previews');
    }
  }, {
    key: 'getTargetingSentenceLines',
    value: function getTargetingSentenceLines(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(TargetingSentenceLine, fields, params, fetchFirstPage, '/targetingsentencelines');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(Ad.prototype.__proto__ || Object.getPrototypeOf(Ad.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(Ad.prototype.__proto__ || Object.getPrototypeOf(Ad.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        ad_review_feedback: 'ad_review_feedback',
        adlabels: 'adlabels',
        adset: 'adset',
        adset_id: 'adset_id',
        bid_amount: 'bid_amount',
        bid_info: 'bid_info',
        bid_type: 'bid_type',
        campaign: 'campaign',
        campaign_id: 'campaign_id',
        configured_status: 'configured_status',
        conversion_specs: 'conversion_specs',
        created_time: 'created_time',
        creative: 'creative',
        effective_status: 'effective_status',
        id: 'id',
        last_updated_by_app_id: 'last_updated_by_app_id',
        name: 'name',
        recommendations: 'recommendations',
        source_ad: 'source_ad',
        source_ad_id: 'source_ad_id',
        status: 'status',
        tracking_specs: 'tracking_specs',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'BidType',
    get: function get() {
      return Object.freeze({
        cpc: 'CPC',
        cpm: 'CPM',
        multi_premium: 'MULTI_PREMIUM',
        absolute_ocpm: 'ABSOLUTE_OCPM',
        cpa: 'CPA'
      });
    }
  }, {
    key: 'ConfiguredStatus',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        archived: 'ARCHIVED'
      });
    }
  }, {
    key: 'EffectiveStatus',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        pending_review: 'PENDING_REVIEW',
        disapproved: 'DISAPPROVED',
        preapproved: 'PREAPPROVED',
        pending_billing_info: 'PENDING_BILLING_INFO',
        campaign_paused: 'CAMPAIGN_PAUSED',
        archived: 'ARCHIVED',
        adset_paused: 'ADSET_PAUSED'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        archived: 'ARCHIVED'
      });
    }
  }, {
    key: 'DatePreset',
    get: function get() {
      return Object.freeze({
        today: 'today',
        yesterday: 'yesterday',
        this_month: 'this_month',
        last_month: 'last_month',
        this_quarter: 'this_quarter',
        lifetime: 'lifetime',
        last_3d: 'last_3d',
        last_7d: 'last_7d',
        last_14d: 'last_14d',
        last_28d: 'last_28d',
        last_30d: 'last_30d',
        last_90d: 'last_90d',
        last_week_mon_sun: 'last_week_mon_sun',
        last_week_sun_sat: 'last_week_sun_sat',
        last_quarter: 'last_quarter',
        last_year: 'last_year',
        this_week_mon_today: 'this_week_mon_today',
        this_week_sun_today: 'this_week_sun_today',
        this_year: 'this_year'
      });
    }
  }, {
    key: 'ExecutionOptions',
    get: function get() {
      return Object.freeze({
        validate_only: 'validate_only',
        synchronous_ad_review: 'synchronous_ad_review',
        include_recommendations: 'include_recommendations'
      });
    }
  }, {
    key: 'Operator',
    get: function get() {
      return Object.freeze({
        all: 'ALL',
        any: 'ANY'
      });
    }
  }, {
    key: 'StatusOption',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        inherited_from_source: 'INHERITED_FROM_SOURCE'
      });
    }
  }]);
  return Ad;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAsyncRequest
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAsyncRequest = function (_AbstractCrudObject) {
  inherits(AdAsyncRequest, _AbstractCrudObject);

  function AdAsyncRequest() {
    classCallCheck(this, AdAsyncRequest);
    return possibleConstructorReturn(this, (AdAsyncRequest.__proto__ || Object.getPrototypeOf(AdAsyncRequest)).apply(this, arguments));
  }

  createClass(AdAsyncRequest, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        async_request_set: 'async_request_set',
        created_time: 'created_time',
        id: 'id',
        input: 'input',
        result: 'result',
        scope_object_id: 'scope_object_id',
        status: 'status',
        type: 'type',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        initial: 'INITIAL',
        in_progress: 'IN_PROGRESS',
        success: 'SUCCESS',
        error: 'ERROR',
        canceled: 'CANCELED',
        pending_dependency: 'PENDING_DEPENDENCY',
        canceled_dependency: 'CANCELED_DEPENDENCY',
        error_dependency: 'ERROR_DEPENDENCY',
        error_conflicts: 'ERROR_CONFLICTS'
      });
    }
  }, {
    key: 'Statuses',
    get: function get() {
      return Object.freeze({
        initial: 'INITIAL',
        in_progress: 'IN_PROGRESS',
        success: 'SUCCESS',
        error: 'ERROR',
        canceled: 'CANCELED',
        pending_dependency: 'PENDING_DEPENDENCY',
        canceled_dependency: 'CANCELED_DEPENDENCY',
        error_dependency: 'ERROR_DEPENDENCY',
        error_conflicts: 'ERROR_CONFLICTS'
      });
    }
  }]);
  return AdAsyncRequest;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCampaignDeliveryEstimate
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCampaignDeliveryEstimate = function (_AbstractCrudObject) {
  inherits(AdCampaignDeliveryEstimate, _AbstractCrudObject);

  function AdCampaignDeliveryEstimate() {
    classCallCheck(this, AdCampaignDeliveryEstimate);
    return possibleConstructorReturn(this, (AdCampaignDeliveryEstimate.__proto__ || Object.getPrototypeOf(AdCampaignDeliveryEstimate)).apply(this, arguments));
  }

  createClass(AdCampaignDeliveryEstimate, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        daily_outcomes_curve: 'daily_outcomes_curve',
        estimate_dau: 'estimate_dau',
        estimate_mau: 'estimate_mau',
        estimate_ready: 'estimate_ready'
      });
    }
  }, {
    key: 'OptimizationGoal',
    get: function get() {
      return Object.freeze({
        none: 'NONE',
        app_installs: 'APP_INSTALLS',
        brand_awareness: 'BRAND_AWARENESS',
        ad_recall_lift: 'AD_RECALL_LIFT',
        clicks: 'CLICKS',
        engaged_users: 'ENGAGED_USERS',
        event_responses: 'EVENT_RESPONSES',
        impressions: 'IMPRESSIONS',
        lead_generation: 'LEAD_GENERATION',
        link_clicks: 'LINK_CLICKS',
        offer_claims: 'OFFER_CLAIMS',
        offsite_conversions: 'OFFSITE_CONVERSIONS',
        page_engagement: 'PAGE_ENGAGEMENT',
        page_likes: 'PAGE_LIKES',
        post_engagement: 'POST_ENGAGEMENT',
        reach: 'REACH',
        social_impressions: 'SOCIAL_IMPRESSIONS',
        video_views: 'VIDEO_VIEWS',
        app_downloads: 'APP_DOWNLOADS',
        landing_page_views: 'LANDING_PAGE_VIEWS',
        value: 'VALUE',
        replies: 'REPLIES'
      });
    }
  }]);
  return AdCampaignDeliveryEstimate;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdSet
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdSet = function (_AbstractCrudObject) {
  inherits(AdSet, _AbstractCrudObject);

  function AdSet() {
    classCallCheck(this, AdSet);
    return possibleConstructorReturn(this, (AdSet.__proto__ || Object.getPrototypeOf(AdSet)).apply(this, arguments));
  }

  createClass(AdSet, [{
    key: 'getActivities',
    value: function getActivities(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdActivity, fields, params, fetchFirstPage, '/activities');
    }
  }, {
    key: 'getAdCreatives',
    value: function getAdCreatives(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdCreative, fields, params, fetchFirstPage, '/adcreatives');
    }
  }, {
    key: 'deleteAdLabels',
    value: function deleteAdLabels(params) {
      return get$1(AdSet.prototype.__proto__ || Object.getPrototypeOf(AdSet.prototype), 'deleteEdge', this).call(this, '/adlabels', params);
    }
  }, {
    key: 'createAdLabel',
    value: function createAdLabel(fields, params) {
      return this.createEdge('/adlabels', fields, params, AdLabel);
    }
  }, {
    key: 'getAdRulesGoverned',
    value: function getAdRulesGoverned(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdRule, fields, params, fetchFirstPage, '/adrules_governed');
    }
  }, {
    key: 'getAds',
    value: function getAds(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Ad, fields, params, fetchFirstPage, '/ads');
    }
  }, {
    key: 'getAsyncAdRequests',
    value: function getAsyncAdRequests(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAsyncRequest, fields, params, fetchFirstPage, '/asyncadrequests');
    }
  }, {
    key: 'getCopies',
    value: function getCopies(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdSet, fields, params, fetchFirstPage, '/copies');
    }
  }, {
    key: 'getDeliveryEstimate',
    value: function getDeliveryEstimate(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdCampaignDeliveryEstimate, fields, params, fetchFirstPage, '/delivery_estimate');
    }
  }, {
    key: 'getInsights',
    value: function getInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsInsights, fields, params, fetchFirstPage, '/insights');
    }
  }, {
    key: 'getInsightsAsync',
    value: function getInsightsAsync(fields, params) {
      return this.createEdge('/insights', fields, params, AdReportRun);
    }
  }, {
    key: 'getTargetingSentenceLines',
    value: function getTargetingSentenceLines(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(TargetingSentenceLine, fields, params, fetchFirstPage, '/targetingsentencelines');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(AdSet.prototype.__proto__ || Object.getPrototypeOf(AdSet.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdSet.prototype.__proto__ || Object.getPrototypeOf(AdSet.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        adlabels: 'adlabels',
        adset_schedule: 'adset_schedule',
        attribution_spec: 'attribution_spec',
        bid_amount: 'bid_amount',
        bid_info: 'bid_info',
        bid_strategy: 'bid_strategy',
        billing_event: 'billing_event',
        budget_remaining: 'budget_remaining',
        campaign: 'campaign',
        campaign_id: 'campaign_id',
        configured_status: 'configured_status',
        created_time: 'created_time',
        creative_sequence: 'creative_sequence',
        daily_budget: 'daily_budget',
        destination_type: 'destination_type',
        effective_status: 'effective_status',
        end_time: 'end_time',
        frequency_control_specs: 'frequency_control_specs',
        id: 'id',
        instagram_actor_id: 'instagram_actor_id',
        lifetime_budget: 'lifetime_budget',
        lifetime_imps: 'lifetime_imps',
        name: 'name',
        optimization_goal: 'optimization_goal',
        pacing_type: 'pacing_type',
        promoted_object: 'promoted_object',
        recommendations: 'recommendations',
        recurring_budget_semantics: 'recurring_budget_semantics',
        rf_prediction_id: 'rf_prediction_id',
        rtb_flag: 'rtb_flag',
        source_adset: 'source_adset',
        source_adset_id: 'source_adset_id',
        start_time: 'start_time',
        status: 'status',
        targeting: 'targeting',
        time_based_ad_rotation_id_blocks: 'time_based_ad_rotation_id_blocks',
        time_based_ad_rotation_intervals: 'time_based_ad_rotation_intervals',
        updated_time: 'updated_time',
        use_new_app_click: 'use_new_app_click'
      });
    }
  }, {
    key: 'BidStrategy',
    get: function get() {
      return Object.freeze({
        lowest_cost_without_cap: 'LOWEST_COST_WITHOUT_CAP',
        lowest_cost_with_bid_cap: 'LOWEST_COST_WITH_BID_CAP',
        target_cost: 'TARGET_COST'
      });
    }
  }, {
    key: 'BillingEvent',
    get: function get() {
      return Object.freeze({
        app_installs: 'APP_INSTALLS',
        clicks: 'CLICKS',
        impressions: 'IMPRESSIONS',
        link_clicks: 'LINK_CLICKS',
        none: 'NONE',
        offer_claims: 'OFFER_CLAIMS',
        page_likes: 'PAGE_LIKES',
        post_engagement: 'POST_ENGAGEMENT',
        video_views: 'VIDEO_VIEWS'
      });
    }
  }, {
    key: 'ConfiguredStatus',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        archived: 'ARCHIVED'
      });
    }
  }, {
    key: 'EffectiveStatus',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        pending_review: 'PENDING_REVIEW',
        disapproved: 'DISAPPROVED',
        preapproved: 'PREAPPROVED',
        pending_billing_info: 'PENDING_BILLING_INFO',
        campaign_paused: 'CAMPAIGN_PAUSED',
        archived: 'ARCHIVED',
        adset_paused: 'ADSET_PAUSED'
      });
    }
  }, {
    key: 'OptimizationGoal',
    get: function get() {
      return Object.freeze({
        none: 'NONE',
        app_installs: 'APP_INSTALLS',
        brand_awareness: 'BRAND_AWARENESS',
        ad_recall_lift: 'AD_RECALL_LIFT',
        clicks: 'CLICKS',
        engaged_users: 'ENGAGED_USERS',
        event_responses: 'EVENT_RESPONSES',
        impressions: 'IMPRESSIONS',
        lead_generation: 'LEAD_GENERATION',
        link_clicks: 'LINK_CLICKS',
        offer_claims: 'OFFER_CLAIMS',
        offsite_conversions: 'OFFSITE_CONVERSIONS',
        page_engagement: 'PAGE_ENGAGEMENT',
        page_likes: 'PAGE_LIKES',
        post_engagement: 'POST_ENGAGEMENT',
        reach: 'REACH',
        social_impressions: 'SOCIAL_IMPRESSIONS',
        video_views: 'VIDEO_VIEWS',
        app_downloads: 'APP_DOWNLOADS',
        landing_page_views: 'LANDING_PAGE_VIEWS',
        value: 'VALUE',
        replies: 'REPLIES'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        archived: 'ARCHIVED'
      });
    }
  }, {
    key: 'DatePreset',
    get: function get() {
      return Object.freeze({
        today: 'today',
        yesterday: 'yesterday',
        this_month: 'this_month',
        last_month: 'last_month',
        this_quarter: 'this_quarter',
        lifetime: 'lifetime',
        last_3d: 'last_3d',
        last_7d: 'last_7d',
        last_14d: 'last_14d',
        last_28d: 'last_28d',
        last_30d: 'last_30d',
        last_90d: 'last_90d',
        last_week_mon_sun: 'last_week_mon_sun',
        last_week_sun_sat: 'last_week_sun_sat',
        last_quarter: 'last_quarter',
        last_year: 'last_year',
        this_week_mon_today: 'this_week_mon_today',
        this_week_sun_today: 'this_week_sun_today',
        this_year: 'this_year'
      });
    }
  }, {
    key: 'DestinationType',
    get: function get() {
      return Object.freeze({
        undefined: 'UNDEFINED',
        website: 'WEBSITE',
        app: 'APP',
        messenger: 'MESSENGER',
        applinks_automatic: 'APPLINKS_AUTOMATIC'
      });
    }
  }, {
    key: 'ExecutionOptions',
    get: function get() {
      return Object.freeze({
        validate_only: 'validate_only',
        include_recommendations: 'include_recommendations'
      });
    }
  }, {
    key: 'Operator',
    get: function get() {
      return Object.freeze({
        all: 'ALL',
        any: 'ANY'
      });
    }
  }]);
  return AdSet;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Campaign
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Campaign = function (_AbstractCrudObject) {
  inherits(Campaign, _AbstractCrudObject);

  function Campaign() {
    classCallCheck(this, Campaign);
    return possibleConstructorReturn(this, (Campaign.__proto__ || Object.getPrototypeOf(Campaign)).apply(this, arguments));
  }

  createClass(Campaign, [{
    key: 'deleteAdLabels',
    value: function deleteAdLabels(params) {
      return get$1(Campaign.prototype.__proto__ || Object.getPrototypeOf(Campaign.prototype), 'deleteEdge', this).call(this, '/adlabels', params);
    }
  }, {
    key: 'createAdLabel',
    value: function createAdLabel(fields, params) {
      return this.createEdge('/adlabels', fields, params, AdLabel);
    }
  }, {
    key: 'getAdRulesGoverned',
    value: function getAdRulesGoverned(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdRule, fields, params, fetchFirstPage, '/adrules_governed');
    }
  }, {
    key: 'getAds',
    value: function getAds(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Ad, fields, params, fetchFirstPage, '/ads');
    }
  }, {
    key: 'getAdSets',
    value: function getAdSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdSet, fields, params, fetchFirstPage, '/adsets');
    }
  }, {
    key: 'getCopies',
    value: function getCopies(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Campaign, fields, params, fetchFirstPage, '/copies');
    }
  }, {
    key: 'getInsights',
    value: function getInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsInsights, fields, params, fetchFirstPage, '/insights');
    }
  }, {
    key: 'getInsightsAsync',
    value: function getInsightsAsync(fields, params) {
      return this.createEdge('/insights', fields, params, AdReportRun);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(Campaign.prototype.__proto__ || Object.getPrototypeOf(Campaign.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(Campaign.prototype.__proto__ || Object.getPrototypeOf(Campaign.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        adlabels: 'adlabels',
        boosted_object_id: 'boosted_object_id',
        brand_lift_studies: 'brand_lift_studies',
        budget_rebalance_flag: 'budget_rebalance_flag',
        buying_type: 'buying_type',
        can_create_brand_lift_study: 'can_create_brand_lift_study',
        can_use_spend_cap: 'can_use_spend_cap',
        configured_status: 'configured_status',
        created_time: 'created_time',
        effective_status: 'effective_status',
        id: 'id',
        name: 'name',
        objective: 'objective',
        recommendations: 'recommendations',
        source_campaign: 'source_campaign',
        source_campaign_id: 'source_campaign_id',
        spend_cap: 'spend_cap',
        start_time: 'start_time',
        status: 'status',
        stop_time: 'stop_time',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'ConfiguredStatus',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        archived: 'ARCHIVED'
      });
    }
  }, {
    key: 'EffectiveStatus',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        pending_review: 'PENDING_REVIEW',
        disapproved: 'DISAPPROVED',
        preapproved: 'PREAPPROVED',
        pending_billing_info: 'PENDING_BILLING_INFO',
        campaign_paused: 'CAMPAIGN_PAUSED',
        archived: 'ARCHIVED',
        adset_paused: 'ADSET_PAUSED'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        paused: 'PAUSED',
        deleted: 'DELETED',
        archived: 'ARCHIVED'
      });
    }
  }, {
    key: 'DatePreset',
    get: function get() {
      return Object.freeze({
        today: 'today',
        yesterday: 'yesterday',
        this_month: 'this_month',
        last_month: 'last_month',
        this_quarter: 'this_quarter',
        lifetime: 'lifetime',
        last_3d: 'last_3d',
        last_7d: 'last_7d',
        last_14d: 'last_14d',
        last_28d: 'last_28d',
        last_30d: 'last_30d',
        last_90d: 'last_90d',
        last_week_mon_sun: 'last_week_mon_sun',
        last_week_sun_sat: 'last_week_sun_sat',
        last_quarter: 'last_quarter',
        last_year: 'last_year',
        this_week_mon_today: 'this_week_mon_today',
        this_week_sun_today: 'this_week_sun_today',
        this_year: 'this_year'
      });
    }
  }, {
    key: 'DeleteStrategy',
    get: function get() {
      return Object.freeze({
        delete_any: 'DELETE_ANY',
        delete_oldest: 'DELETE_OLDEST',
        delete_archived_before: 'DELETE_ARCHIVED_BEFORE'
      });
    }
  }, {
    key: 'ExecutionOptions',
    get: function get() {
      return Object.freeze({
        validate_only: 'validate_only',
        include_recommendations: 'include_recommendations'
      });
    }
  }, {
    key: 'Objective',
    get: function get() {
      return Object.freeze({
        app_installs: 'APP_INSTALLS',
        brand_awareness: 'BRAND_AWARENESS',
        conversions: 'CONVERSIONS',
        event_responses: 'EVENT_RESPONSES',
        lead_generation: 'LEAD_GENERATION',
        link_clicks: 'LINK_CLICKS',
        local_awareness: 'LOCAL_AWARENESS',
        messages: 'MESSAGES',
        offer_claims: 'OFFER_CLAIMS',
        page_likes: 'PAGE_LIKES',
        post_engagement: 'POST_ENGAGEMENT',
        product_catalog_sales: 'PRODUCT_CATALOG_SALES',
        reach: 'REACH',
        video_views: 'VIDEO_VIEWS'
      });
    }
  }, {
    key: 'Operator',
    get: function get() {
      return Object.freeze({
        all: 'ALL',
        any: 'ANY'
      });
    }
  }]);
  return Campaign;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdLabel
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdLabel = function (_AbstractCrudObject) {
  inherits(AdLabel, _AbstractCrudObject);

  function AdLabel() {
    classCallCheck(this, AdLabel);
    return possibleConstructorReturn(this, (AdLabel.__proto__ || Object.getPrototypeOf(AdLabel)).apply(this, arguments));
  }

  createClass(AdLabel, [{
    key: 'getAdCreatives',
    value: function getAdCreatives(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdCreative, fields, params, fetchFirstPage, '/adcreatives');
    }
  }, {
    key: 'getAds',
    value: function getAds(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Ad, fields, params, fetchFirstPage, '/ads');
    }
  }, {
    key: 'getAdSets',
    value: function getAdSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdSet, fields, params, fetchFirstPage, '/adsets');
    }
  }, {
    key: 'getCampaigns',
    value: function getCampaigns(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Campaign, fields, params, fetchFirstPage, '/campaigns');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(AdLabel.prototype.__proto__ || Object.getPrototypeOf(AdLabel.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdLabel.prototype.__proto__ || Object.getPrototypeOf(AdLabel.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account: 'account',
        created_time: 'created_time',
        id: 'id',
        name: 'name',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'ExecutionOptions',
    get: function get() {
      return Object.freeze({
        validate_only: 'validate_only'
      });
    }
  }]);
  return AdLabel;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreative
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreative = function (_AbstractCrudObject) {
  inherits(AdCreative, _AbstractCrudObject);

  function AdCreative() {
    classCallCheck(this, AdCreative);
    return possibleConstructorReturn(this, (AdCreative.__proto__ || Object.getPrototypeOf(AdCreative)).apply(this, arguments));
  }

  createClass(AdCreative, [{
    key: 'deleteAdLabels',
    value: function deleteAdLabels(params) {
      return get$1(AdCreative.prototype.__proto__ || Object.getPrototypeOf(AdCreative.prototype), 'deleteEdge', this).call(this, '/adlabels', params);
    }
  }, {
    key: 'createAdLabel',
    value: function createAdLabel(fields, params) {
      return this.createEdge('/adlabels', fields, params, AdLabel);
    }
  }, {
    key: 'getPreviews',
    value: function getPreviews(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdPreview, fields, params, fetchFirstPage, '/previews');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(AdCreative.prototype.__proto__ || Object.getPrototypeOf(AdCreative.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdCreative.prototype.__proto__ || Object.getPrototypeOf(AdCreative.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        actor_id: 'actor_id',
        adlabels: 'adlabels',
        applink_treatment: 'applink_treatment',
        asset_feed_spec: 'asset_feed_spec',
        body: 'body',
        branded_content_sponsor_page_id: 'branded_content_sponsor_page_id',
        call_to_action_type: 'call_to_action_type',
        effective_instagram_story_id: 'effective_instagram_story_id',
        effective_object_story_id: 'effective_object_story_id',
        id: 'id',
        image_crops: 'image_crops',
        image_hash: 'image_hash',
        image_url: 'image_url',
        instagram_actor_id: 'instagram_actor_id',
        instagram_permalink_url: 'instagram_permalink_url',
        instagram_story_id: 'instagram_story_id',
        link_og_id: 'link_og_id',
        link_url: 'link_url',
        messenger_sponsored_message: 'messenger_sponsored_message',
        name: 'name',
        object_id: 'object_id',
        object_story_id: 'object_story_id',
        object_story_spec: 'object_story_spec',
        object_type: 'object_type',
        object_url: 'object_url',
        platform_customizations: 'platform_customizations',
        product_set_id: 'product_set_id',
        recommender_settings: 'recommender_settings',
        status: 'status',
        template_url: 'template_url',
        template_url_spec: 'template_url_spec',
        thumbnail_url: 'thumbnail_url',
        title: 'title',
        url_tags: 'url_tags',
        use_page_actor_override: 'use_page_actor_override',
        video_id: 'video_id'
      });
    }
  }, {
    key: 'ApplinkTreatment',
    get: function get() {
      return Object.freeze({
        deeplink_with_web_fallback: 'deeplink_with_web_fallback',
        deeplink_with_appstore_fallback: 'deeplink_with_appstore_fallback',
        web_only: 'web_only'
      });
    }
  }, {
    key: 'CallToActionType',
    get: function get() {
      return Object.freeze({
        open_link: 'OPEN_LINK',
        like_page: 'LIKE_PAGE',
        shop_now: 'SHOP_NOW',
        play_game: 'PLAY_GAME',
        install_app: 'INSTALL_APP',
        use_app: 'USE_APP',
        call: 'CALL',
        call_me: 'CALL_ME',
        install_mobile_app: 'INSTALL_MOBILE_APP',
        use_mobile_app: 'USE_MOBILE_APP',
        mobile_download: 'MOBILE_DOWNLOAD',
        book_travel: 'BOOK_TRAVEL',
        listen_music: 'LISTEN_MUSIC',
        watch_video: 'WATCH_VIDEO',
        learn_more: 'LEARN_MORE',
        sign_up: 'SIGN_UP',
        download: 'DOWNLOAD',
        watch_more: 'WATCH_MORE',
        no_button: 'NO_BUTTON',
        visit_pages_feed: 'VISIT_PAGES_FEED',
        apply_now: 'APPLY_NOW',
        buy_now: 'BUY_NOW',
        get_offer: 'GET_OFFER',
        get_offer_view: 'GET_OFFER_VIEW',
        buy_tickets: 'BUY_TICKETS',
        update_app: 'UPDATE_APP',
        get_directions: 'GET_DIRECTIONS',
        buy: 'BUY',
        message_page: 'MESSAGE_PAGE',
        donate: 'DONATE',
        subscribe: 'SUBSCRIBE',
        say_thanks: 'SAY_THANKS',
        sell_now: 'SELL_NOW',
        share: 'SHARE',
        donate_now: 'DONATE_NOW',
        get_quote: 'GET_QUOTE',
        contact_us: 'CONTACT_US',
        order_now: 'ORDER_NOW',
        add_to_cart: 'ADD_TO_CART',
        video_annotation: 'VIDEO_ANNOTATION',
        moments: 'MOMENTS',
        record_now: 'RECORD_NOW',
        get_showtimes: 'GET_SHOWTIMES',
        listen_now: 'LISTEN_NOW',
        event_rsvp: 'EVENT_RSVP',
        whatsapp_message: 'WHATSAPP_MESSAGE'
      });
    }
  }, {
    key: 'ObjectType',
    get: function get() {
      return Object.freeze({
        application: 'APPLICATION',
        domain: 'DOMAIN',
        event: 'EVENT',
        offer: 'OFFER',
        page: 'PAGE',
        photo: 'PHOTO',
        share: 'SHARE',
        status: 'STATUS',
        store_item: 'STORE_ITEM',
        video: 'VIDEO',
        invalid: 'INVALID'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        deleted: 'DELETED'
      });
    }
  }, {
    key: 'DynamicAdVoice',
    get: function get() {
      return Object.freeze({
        dynamic: 'DYNAMIC',
        story_owner: 'STORY_OWNER'
      });
    }
  }, {
    key: 'Operator',
    get: function get() {
      return Object.freeze({
        all: 'ALL',
        any: 'ANY'
      });
    }
  }]);
  return AdCreative;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdImage
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdImage = function (_AbstractCrudObject) {
  inherits(AdImage, _AbstractCrudObject);

  function AdImage() {
    classCallCheck(this, AdImage);
    return possibleConstructorReturn(this, (AdImage.__proto__ || Object.getPrototypeOf(AdImage)).apply(this, arguments));
  }

  createClass(AdImage, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        created_time: 'created_time',
        creatives: 'creatives',
        hash: 'hash',
        height: 'height',
        id: 'id',
        is_associated_creatives_in_adgroups: 'is_associated_creatives_in_adgroups',
        name: 'name',
        original_height: 'original_height',
        original_width: 'original_width',
        permalink_url: 'permalink_url',
        status: 'status',
        updated_time: 'updated_time',
        url: 'url',
        url_128: 'url_128',
        width: 'width'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        deleted: 'DELETED'
      });
    }
  }]);
  return AdImage;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAccountAdRulesHistory
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAccountAdRulesHistory = function (_AbstractCrudObject) {
  inherits(AdAccountAdRulesHistory, _AbstractCrudObject);

  function AdAccountAdRulesHistory() {
    classCallCheck(this, AdAccountAdRulesHistory);
    return possibleConstructorReturn(this, (AdAccountAdRulesHistory.__proto__ || Object.getPrototypeOf(AdAccountAdRulesHistory)).apply(this, arguments));
  }

  createClass(AdAccountAdRulesHistory, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        evaluation_spec: 'evaluation_spec',
        exception_code: 'exception_code',
        exception_message: 'exception_message',
        execution_spec: 'execution_spec',
        is_manual: 'is_manual',
        results: 'results',
        rule_id: 'rule_id',
        schedule_spec: 'schedule_spec',
        timestamp: 'timestamp'
      });
    }
  }, {
    key: 'Action',
    get: function get() {
      return Object.freeze({
        budget_not_redistributed: 'BUDGET_NOT_REDISTRIBUTED',
        changed_bid: 'CHANGED_BID',
        changed_budget: 'CHANGED_BUDGET',
        email: 'EMAIL',
        endpoint_pinged: 'ENDPOINT_PINGED',
        error: 'ERROR',
        facebook_notification_sent: 'FACEBOOK_NOTIFICATION_SENT',
        message_sent: 'MESSAGE_SENT',
        not_changed: 'NOT_CHANGED',
        paused: 'PAUSED',
        unpaused: 'UNPAUSED'
      });
    }
  }]);
  return AdAccountAdRulesHistory;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomAudiencePrefillState
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomAudiencePrefillState = function (_AbstractCrudObject) {
  inherits(CustomAudiencePrefillState, _AbstractCrudObject);

  function CustomAudiencePrefillState() {
    classCallCheck(this, CustomAudiencePrefillState);
    return possibleConstructorReturn(this, (CustomAudiencePrefillState.__proto__ || Object.getPrototypeOf(CustomAudiencePrefillState)).apply(this, arguments));
  }

  createClass(CustomAudiencePrefillState, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        description: 'description',
        num_added: 'num_added',
        status: 'status'
      });
    }
  }]);
  return CustomAudiencePrefillState;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomAudienceSession
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomAudienceSession = function (_AbstractCrudObject) {
  inherits(CustomAudienceSession, _AbstractCrudObject);

  function CustomAudienceSession() {
    classCallCheck(this, CustomAudienceSession);
    return possibleConstructorReturn(this, (CustomAudienceSession.__proto__ || Object.getPrototypeOf(CustomAudienceSession)).apply(this, arguments));
  }

  createClass(CustomAudienceSession, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        end_time: 'end_time',
        num_invalid_entries: 'num_invalid_entries',
        num_matched: 'num_matched',
        num_received: 'num_received',
        progress: 'progress',
        session_id: 'session_id',
        stage: 'stage',
        start_time: 'start_time'
      });
    }
  }]);
  return CustomAudienceSession;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageAdminNote
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageAdminNote = function (_AbstractCrudObject) {
  inherits(PageAdminNote, _AbstractCrudObject);

  function PageAdminNote() {
    classCallCheck(this, PageAdminNote);
    return possibleConstructorReturn(this, (PageAdminNote.__proto__ || Object.getPrototypeOf(PageAdminNote)).apply(this, arguments));
  }

  createClass(PageAdminNote, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(PageAdminNote.prototype.__proto__ || Object.getPrototypeOf(PageAdminNote.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        body: 'body',
        from: 'from',
        id: 'id',
        user: 'user'
      });
    }
  }]);
  return PageAdminNote;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Photo
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Photo = function (_AbstractCrudObject) {
  inherits(Photo, _AbstractCrudObject);

  function Photo() {
    classCallCheck(this, Photo);
    return possibleConstructorReturn(this, (Photo.__proto__ || Object.getPrototypeOf(Photo)).apply(this, arguments));
  }

  createClass(Photo, [{
    key: 'deleteLikes',
    value: function deleteLikes(params) {
      return get$1(Photo.prototype.__proto__ || Object.getPrototypeOf(Photo.prototype), 'deleteEdge', this).call(this, '/likes', params);
    }
  }, {
    key: 'createLike',
    value: function createLike(fields, params) {
      return this.createEdge('/likes', fields, params);
    }
  }, {
    key: 'createTag',
    value: function createTag(fields, params) {
      return this.createEdge('/tags', fields, params);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(Photo.prototype.__proto__ || Object.getPrototypeOf(Photo.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(Photo.prototype.__proto__ || Object.getPrototypeOf(Photo.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        album: 'album',
        backdated_time: 'backdated_time',
        backdated_time_granularity: 'backdated_time_granularity',
        can_backdate: 'can_backdate',
        can_delete: 'can_delete',
        can_tag: 'can_tag',
        created_time: 'created_time',
        event: 'event',
        from: 'from',
        height: 'height',
        icon: 'icon',
        id: 'id',
        images: 'images',
        link: 'link',
        name: 'name',
        name_tags: 'name_tags',
        page_story_id: 'page_story_id',
        picture: 'picture',
        place: 'place',
        position: 'position',
        source: 'source',
        target: 'target',
        updated_time: 'updated_time',
        webp_images: 'webp_images',
        width: 'width'
      });
    }
  }, {
    key: 'BackdatedTimeGranularity',
    get: function get() {
      return Object.freeze({
        year: 'year',
        month: 'month',
        day: 'day',
        hour: 'hour',
        min: 'min',
        none: 'none'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        profile: 'profile',
        tagged: 'tagged',
        uploaded: 'uploaded'
      });
    }
  }, {
    key: 'UnpublishedContentType',
    get: function get() {
      return Object.freeze({
        scheduled: 'SCHEDULED',
        draft: 'DRAFT',
        ads_post: 'ADS_POST',
        inline_created: 'INLINE_CREATED',
        published: 'PUBLISHED'
      });
    }
  }, {
    key: 'CheckinEntryPoint',
    get: function get() {
      return Object.freeze({
        branding_checkin: 'BRANDING_CHECKIN',
        branding_status: 'BRANDING_STATUS',
        branding_photo: 'BRANDING_PHOTO',
        branding_other: 'BRANDING_OTHER'
      });
    }
  }]);
  return Photo;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Album
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Album = function (_AbstractCrudObject) {
  inherits(Album, _AbstractCrudObject);

  function Album() {
    classCallCheck(this, Album);
    return possibleConstructorReturn(this, (Album.__proto__ || Object.getPrototypeOf(Album)).apply(this, arguments));
  }

  createClass(Album, [{
    key: 'createPhoto',
    value: function createPhoto(fields, params) {
      return this.createEdge('/photos', fields, params, Photo);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        backdated_time: 'backdated_time',
        backdated_time_granularity: 'backdated_time_granularity',
        can_backdate: 'can_backdate',
        can_upload: 'can_upload',
        count: 'count',
        cover_photo: 'cover_photo',
        created_time: 'created_time',
        description: 'description',
        edit_link: 'edit_link',
        event: 'event',
        from: 'from',
        id: 'id',
        is_user_facing: 'is_user_facing',
        link: 'link',
        location: 'location',
        modified_major: 'modified_major',
        name: 'name',
        photo_count: 'photo_count',
        place: 'place',
        privacy: 'privacy',
        type: 'type',
        updated_time: 'updated_time',
        video_count: 'video_count'
      });
    }
  }]);
  return Album;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AssignedUser
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AssignedUser = function (_AbstractCrudObject) {
  inherits(AssignedUser, _AbstractCrudObject);

  function AssignedUser() {
    classCallCheck(this, AssignedUser);
    return possibleConstructorReturn(this, (AssignedUser.__proto__ || Object.getPrototypeOf(AssignedUser)).apply(this, arguments));
  }

  createClass(AssignedUser, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        business: 'business',
        id: 'id',
        name: 'name',
        user_type: 'user_type'
      });
    }
  }]);
  return AssignedUser;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AudioCopyright
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AudioCopyright = function (_AbstractCrudObject) {
  inherits(AudioCopyright, _AbstractCrudObject);

  function AudioCopyright() {
    classCallCheck(this, AudioCopyright);
    return possibleConstructorReturn(this, (AudioCopyright.__proto__ || Object.getPrototypeOf(AudioCopyright)).apply(this, arguments));
  }

  createClass(AudioCopyright, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        creation_time: 'creation_time',
        displayed_matches_count: 'displayed_matches_count',
        id: 'id',
        in_conflict: 'in_conflict',
        isrc: 'isrc',
        match_rule: 'match_rule',
        ownership_countries: 'ownership_countries',
        reference_file_status: 'reference_file_status',
        ridge_monitoring_status: 'ridge_monitoring_status',
        update_time: 'update_time',
        whitelisted_fb_users: 'whitelisted_fb_users',
        whitelisted_ig_users: 'whitelisted_ig_users'
      });
    }
  }]);
  return AudioCopyright;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProfilePictureSource
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProfilePictureSource = function (_AbstractCrudObject) {
  inherits(ProfilePictureSource, _AbstractCrudObject);

  function ProfilePictureSource() {
    classCallCheck(this, ProfilePictureSource);
    return possibleConstructorReturn(this, (ProfilePictureSource.__proto__ || Object.getPrototypeOf(ProfilePictureSource)).apply(this, arguments));
  }

  createClass(ProfilePictureSource, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        bottom: 'bottom',
        cache_key: 'cache_key',
        height: 'height',
        is_silhouette: 'is_silhouette',
        left: 'left',
        right: 'right',
        top: 'top',
        url: 'url',
        width: 'width'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        small: 'small',
        normal: 'normal',
        album: 'album',
        large: 'large',
        square: 'square'
      });
    }
  }]);
  return ProfilePictureSource;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Profile
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Profile = function (_AbstractCrudObject) {
  inherits(Profile, _AbstractCrudObject);

  function Profile() {
    classCallCheck(this, Profile);
    return possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
  }

  createClass(Profile, [{
    key: 'getPicture',
    value: function getPicture(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProfilePictureSource, fields, params, fetchFirstPage, '/picture');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        can_post: 'can_post',
        id: 'id',
        link: 'link',
        name: 'name',
        pic: 'pic',
        pic_crop: 'pic_crop',
        pic_large: 'pic_large',
        pic_small: 'pic_small',
        pic_square: 'pic_square',
        profile_type: 'profile_type',
        username: 'username'
      });
    }
  }, {
    key: 'ProfileType',
    get: function get() {
      return Object.freeze({
        user: 'user',
        page: 'page',
        event: 'event',
        group: 'group',
        application: 'application'
      });
    }
  }]);
  return Profile;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessActivityLogEvent
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessActivityLogEvent = function (_AbstractCrudObject) {
  inherits(BusinessActivityLogEvent, _AbstractCrudObject);

  function BusinessActivityLogEvent() {
    classCallCheck(this, BusinessActivityLogEvent);
    return possibleConstructorReturn(this, (BusinessActivityLogEvent.__proto__ || Object.getPrototypeOf(BusinessActivityLogEvent)).apply(this, arguments));
  }

  createClass(BusinessActivityLogEvent, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        acted_upon_business_id: 'acted_upon_business_id',
        acted_upon_business_name: 'acted_upon_business_name',
        acted_upon_business_object_id: 'acted_upon_business_object_id',
        acted_upon_business_object_name: 'acted_upon_business_object_name',
        acted_upon_business_object_type: 'acted_upon_business_object_type',
        acted_upon_user_id: 'acted_upon_user_id',
        acted_upon_user_name: 'acted_upon_user_name',
        acting_business_id: 'acting_business_id',
        acting_business_name: 'acting_business_name',
        acting_user_id: 'acting_user_id',
        acting_user_name: 'acting_user_name',
        event_time: 'event_time',
        event_type: 'event_type',
        extra_data: 'extra_data',
        target_business_id: 'target_business_id',
        target_business_name: 'target_business_name',
        target_business_object_id: 'target_business_object_id',
        target_business_object_name: 'target_business_object_name',
        target_business_object_type: 'target_business_object_type'
      });
    }
  }]);
  return BusinessActivityLogEvent;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageCallToAction
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageCallToAction = function (_AbstractCrudObject) {
  inherits(PageCallToAction, _AbstractCrudObject);

  function PageCallToAction() {
    classCallCheck(this, PageCallToAction);
    return possibleConstructorReturn(this, (PageCallToAction.__proto__ || Object.getPrototypeOf(PageCallToAction)).apply(this, arguments));
  }

  createClass(PageCallToAction, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(PageCallToAction.prototype.__proto__ || Object.getPrototypeOf(PageCallToAction.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(PageCallToAction.prototype.__proto__ || Object.getPrototypeOf(PageCallToAction.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        android_app: 'android_app',
        android_deeplink: 'android_deeplink',
        android_destination_type: 'android_destination_type',
        android_package_name: 'android_package_name',
        android_url: 'android_url',
        created_time: 'created_time',
        email_address: 'email_address',
        from: 'from',
        id: 'id',
        intl_number_with_plus: 'intl_number_with_plus',
        iphone_app: 'iphone_app',
        iphone_deeplink: 'iphone_deeplink',
        iphone_destination_type: 'iphone_destination_type',
        iphone_url: 'iphone_url',
        status: 'status',
        type: 'type',
        updated_time: 'updated_time',
        web_destination_type: 'web_destination_type',
        web_url: 'web_url'
      });
    }
  }, {
    key: 'AndroidDestinationType',
    get: function get() {
      return Object.freeze({
        website: 'WEBSITE',
        app_deeplink: 'APP_DEEPLINK',
        facebook_app: 'FACEBOOK_APP',
        phone_call: 'PHONE_CALL',
        messenger: 'MESSENGER',
        email: 'EMAIL',
        none: 'NONE'
      });
    }
  }, {
    key: 'IphoneDestinationType',
    get: function get() {
      return Object.freeze({
        website: 'WEBSITE',
        app_deeplink: 'APP_DEEPLINK',
        facebook_app: 'FACEBOOK_APP',
        phone_call: 'PHONE_CALL',
        messenger: 'MESSENGER',
        email: 'EMAIL',
        none: 'NONE'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        book_now: 'BOOK_NOW',
        call_now: 'CALL_NOW',
        charity_donate: 'CHARITY_DONATE',
        contact_us: 'CONTACT_US',
        donate_now: 'DONATE_NOW',
        message: 'MESSAGE',
        open_app: 'OPEN_APP',
        play_now: 'PLAY_NOW',
        shop_now: 'SHOP_NOW',
        sign_up: 'SIGN_UP',
        watch_now: 'WATCH_NOW',
        get_offer: 'GET_OFFER',
        get_offer_view: 'GET_OFFER_VIEW',
        request_quote: 'REQUEST_QUOTE',
        book_appointment: 'BOOK_APPOINTMENT',
        listen: 'LISTEN',
        email: 'EMAIL',
        learn_more: 'LEARN_MORE',
        request_appointment: 'REQUEST_APPOINTMENT',
        get_directions: 'GET_DIRECTIONS',
        buy_tickets: 'BUY_TICKETS',
        play_music: 'PLAY_MUSIC',
        visit_group: 'VISIT_GROUP'
      });
    }
  }, {
    key: 'WebDestinationType',
    get: function get() {
      return Object.freeze({
        email: 'EMAIL',
        messenger: 'MESSENGER',
        none: 'NONE',
        website: 'WEBSITE'
      });
    }
  }]);
  return PageCallToAction;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CanvasBodyElement
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CanvasBodyElement = function (_AbstractCrudObject) {
  inherits(CanvasBodyElement, _AbstractCrudObject);

  function CanvasBodyElement() {
    classCallCheck(this, CanvasBodyElement);
    return possibleConstructorReturn(this, (CanvasBodyElement.__proto__ || Object.getPrototypeOf(CanvasBodyElement)).apply(this, arguments));
  }

  createClass(CanvasBodyElement, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        element: 'element'
      });
    }
  }]);
  return CanvasBodyElement;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Canvas
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Canvas = function (_AbstractCrudObject) {
  inherits(Canvas, _AbstractCrudObject);

  function Canvas() {
    classCallCheck(this, Canvas);
    return possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).apply(this, arguments));
  }

  createClass(Canvas, [{
    key: 'createDuplicateCanva',
    value: function createDuplicateCanva(fields, params) {
      return this.createEdge('/duplicate_canvas', fields, params, Canvas);
    }
  }, {
    key: 'createPreviewNotification',
    value: function createPreviewNotification(fields, params) {
      return this.createEdge('/preview_notifications', fields, params);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(Canvas.prototype.__proto__ || Object.getPrototypeOf(Canvas.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        background_color: 'background_color',
        body_elements: 'body_elements',
        canvas_link: 'canvas_link',
        id: 'id',
        is_hidden: 'is_hidden',
        is_published: 'is_published',
        last_editor: 'last_editor',
        name: 'name',
        owner: 'owner',
        update_time: 'update_time'
      });
    }
  }]);
  return Canvas;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageChangeProposal
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageChangeProposal = function (_AbstractCrudObject) {
  inherits(PageChangeProposal, _AbstractCrudObject);

  function PageChangeProposal() {
    classCallCheck(this, PageChangeProposal);
    return possibleConstructorReturn(this, (PageChangeProposal.__proto__ || Object.getPrototypeOf(PageChangeProposal)).apply(this, arguments));
  }

  createClass(PageChangeProposal, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(PageChangeProposal.prototype.__proto__ || Object.getPrototypeOf(PageChangeProposal.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        acceptance_status: 'acceptance_status',
        category: 'category',
        current_value: 'current_value',
        id: 'id',
        proposed_value: 'proposed_value',
        upcoming_change_info: 'upcoming_change_info'
      });
    }
  }]);
  return PageChangeProposal;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * URL
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var URL = function (_AbstractCrudObject) {
  inherits(URL, _AbstractCrudObject);

  function URL() {
    classCallCheck(this, URL);
    return possibleConstructorReturn(this, (URL.__proto__ || Object.getPrototypeOf(URL)).apply(this, arguments));
  }

  createClass(URL, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        app_links: 'app_links',
        development_instant_article: 'development_instant_article',
        engagement: 'engagement',
        id: 'id',
        instant_article: 'instant_article',
        og_object: 'og_object',
        ownership_permissions: 'ownership_permissions'
      });
    }
  }]);
  return URL;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * UnifiedThread
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var UnifiedThread = function (_AbstractCrudObject) {
  inherits(UnifiedThread, _AbstractCrudObject);

  function UnifiedThread() {
    classCallCheck(this, UnifiedThread);
    return possibleConstructorReturn(this, (UnifiedThread.__proto__ || Object.getPrototypeOf(UnifiedThread)).apply(this, arguments));
  }

  createClass(UnifiedThread, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        can_reply: 'can_reply',
        former_participants: 'former_participants',
        id: 'id',
        is_subscribed: 'is_subscribed',
        link: 'link',
        message_count: 'message_count',
        name: 'name',
        participants: 'participants',
        scoped_thread_key: 'scoped_thread_key',
        senders: 'senders',
        snippet: 'snippet',
        subject: 'subject',
        unread_count: 'unread_count',
        updated_time: 'updated_time',
        wallpaper: 'wallpaper'
      });
    }
  }]);
  return UnifiedThread;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Event
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Event = function (_AbstractCrudObject) {
  inherits(Event, _AbstractCrudObject);

  function Event() {
    classCallCheck(this, Event);
    return possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).apply(this, arguments));
  }

  createClass(Event, [{
    key: 'createLiveVideo',
    value: function createLiveVideo(fields, params) {
      return this.createEdge('/live_videos', fields, params);
    }
  }, {
    key: 'createPhoto',
    value: function createPhoto(fields, params) {
      return this.createEdge('/photos', fields, params, Photo);
    }
  }, {
    key: 'createVideo',
    value: function createVideo(fields, params) {
      return this.createEdge('/videos', fields, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        attending_count: 'attending_count',
        can_guests_invite: 'can_guests_invite',
        category: 'category',
        cover: 'cover',
        declined_count: 'declined_count',
        description: 'description',
        end_time: 'end_time',
        event_times: 'event_times',
        guest_list_enabled: 'guest_list_enabled',
        id: 'id',
        interested_count: 'interested_count',
        is_canceled: 'is_canceled',
        is_draft: 'is_draft',
        is_page_owned: 'is_page_owned',
        maybe_count: 'maybe_count',
        name: 'name',
        noreply_count: 'noreply_count',
        owner: 'owner',
        parent_group: 'parent_group',
        place: 'place',
        scheduled_publish_time: 'scheduled_publish_time',
        start_time: 'start_time',
        ticket_uri: 'ticket_uri',
        ticket_uri_start_sales_time: 'ticket_uri_start_sales_time',
        ticketing_privacy_uri: 'ticketing_privacy_uri',
        ticketing_terms_uri: 'ticketing_terms_uri',
        timezone: 'timezone',
        type: 'type',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        private: 'private',
        public: 'public',
        group: 'group',
        community: 'community'
      });
    }
  }, {
    key: 'EventStateFilter',
    get: function get() {
      return Object.freeze({
        canceled: 'canceled',
        draft: 'draft',
        scheduled_draft_for_publication: 'scheduled_draft_for_publication',
        published: 'published'
      });
    }
  }, {
    key: 'TimeFilter',
    get: function get() {
      return Object.freeze({
        upcoming: 'upcoming',
        past: 'past'
      });
    }
  }, {
    key: 'PromotableEventTypes',
    get: function get() {
      return Object.freeze({
        offsite_ticket: 'OFFSITE_TICKET',
        onsite_ticket: 'ONSITE_TICKET'
      });
    }
  }]);
  return Event;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PagePost
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PagePost = function (_AbstractCrudObject) {
  inherits(PagePost, _AbstractCrudObject);

  function PagePost() {
    classCallCheck(this, PagePost);
    return possibleConstructorReturn(this, (PagePost.__proto__ || Object.getPrototypeOf(PagePost)).apply(this, arguments));
  }

  createClass(PagePost, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(PagePost.prototype.__proto__ || Object.getPrototypeOf(PagePost.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(PagePost.prototype.__proto__ || Object.getPrototypeOf(PagePost.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        actions: 'actions',
        admin_creator: 'admin_creator',
        allowed_advertising_objectives: 'allowed_advertising_objectives',
        application: 'application',
        backdated_time: 'backdated_time',
        call_to_action: 'call_to_action',
        can_reply_privately: 'can_reply_privately',
        caption: 'caption',
        child_attachments: 'child_attachments',
        comments_mirroring_domain: 'comments_mirroring_domain',
        coordinates: 'coordinates',
        created_time: 'created_time',
        description: 'description',
        event: 'event',
        expanded_height: 'expanded_height',
        expanded_width: 'expanded_width',
        feed_targeting: 'feed_targeting',
        from: 'from',
        full_picture: 'full_picture',
        height: 'height',
        icon: 'icon',
        id: 'id',
        instagram_eligibility: 'instagram_eligibility',
        is_app_share: 'is_app_share',
        is_expired: 'is_expired',
        is_hidden: 'is_hidden',
        is_instagram_eligible: 'is_instagram_eligible',
        is_popular: 'is_popular',
        is_published: 'is_published',
        is_spherical: 'is_spherical',
        link: 'link',
        message: 'message',
        message_tags: 'message_tags',
        multi_share_end_card: 'multi_share_end_card',
        multi_share_optimized: 'multi_share_optimized',
        name: 'name',
        object_id: 'object_id',
        parent_id: 'parent_id',
        permalink_url: 'permalink_url',
        picture: 'picture',
        place: 'place',
        privacy: 'privacy',
        promotable_id: 'promotable_id',
        promotion_status: 'promotion_status',
        properties: 'properties',
        scheduled_publish_time: 'scheduled_publish_time',
        shares: 'shares',
        source: 'source',
        status_type: 'status_type',
        story: 'story',
        story_tags: 'story_tags',
        subscribed: 'subscribed',
        target: 'target',
        targeting: 'targeting',
        timeline_visibility: 'timeline_visibility',
        type: 'type',
        updated_time: 'updated_time',
        via: 'via',
        video_buying_eligibility: 'video_buying_eligibility',
        width: 'width'
      });
    }
  }, {
    key: 'BackdatedTimeGranularity',
    get: function get() {
      return Object.freeze({
        year: 'year',
        month: 'month',
        day: 'day',
        hour: 'hour',
        min: 'min',
        none: 'none'
      });
    }
  }, {
    key: 'CheckinEntryPoint',
    get: function get() {
      return Object.freeze({
        branding_checkin: 'BRANDING_CHECKIN',
        branding_status: 'BRANDING_STATUS',
        branding_photo: 'BRANDING_PHOTO',
        branding_other: 'BRANDING_OTHER'
      });
    }
  }, {
    key: 'Formatting',
    get: function get() {
      return Object.freeze({
        plaintext: 'PLAINTEXT',
        markdown: 'MARKDOWN'
      });
    }
  }, {
    key: 'PlaceAttachmentSetting',
    get: function get() {
      return Object.freeze({
        value_1: '1',
        value_2: '2'
      });
    }
  }, {
    key: 'PostSurfacesBlacklist',
    get: function get() {
      return Object.freeze({
        value_1: '1',
        value_2: '2',
        value_3: '3',
        value_4: '4',
        value_5: '5'
      });
    }
  }, {
    key: 'PostingToRedspace',
    get: function get() {
      return Object.freeze({
        enabled: 'enabled',
        disabled: 'disabled'
      });
    }
  }, {
    key: 'TargetSurface',
    get: function get() {
      return Object.freeze({
        story: 'STORY',
        timeline: 'TIMELINE'
      });
    }
  }, {
    key: 'UnpublishedContentType',
    get: function get() {
      return Object.freeze({
        scheduled: 'SCHEDULED',
        draft: 'DRAFT',
        ads_post: 'ADS_POST',
        inline_created: 'INLINE_CREATED',
        published: 'PUBLISHED'
      });
    }
  }, {
    key: 'With',
    get: function get() {
      return Object.freeze({
        location: 'LOCATION'
      });
    }
  }, {
    key: 'FeedStoryVisibility',
    get: function get() {
      return Object.freeze({
        hidden: 'hidden',
        visible: 'visible'
      });
    }
  }, {
    key: 'TimelineVisibility',
    get: function get() {
      return Object.freeze({
        hidden: 'hidden',
        normal: 'normal',
        forced_allow: 'forced_allow'
      });
    }
  }]);
  return PagePost;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * InsightsResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var InsightsResult = function (_AbstractCrudObject) {
  inherits(InsightsResult, _AbstractCrudObject);

  function InsightsResult() {
    classCallCheck(this, InsightsResult);
    return possibleConstructorReturn(this, (InsightsResult.__proto__ || Object.getPrototypeOf(InsightsResult)).apply(this, arguments));
  }

  createClass(InsightsResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        description: 'description',
        description_from_api_doc: 'description_from_api_doc',
        id: 'id',
        name: 'name',
        period: 'period',
        title: 'title',
        values: 'values'
      });
    }
  }, {
    key: 'DatePreset',
    get: function get() {
      return Object.freeze({
        today: 'today',
        yesterday: 'yesterday',
        this_month: 'this_month',
        last_month: 'last_month',
        this_quarter: 'this_quarter',
        lifetime: 'lifetime',
        last_3d: 'last_3d',
        last_7d: 'last_7d',
        last_14d: 'last_14d',
        last_28d: 'last_28d',
        last_30d: 'last_30d',
        last_90d: 'last_90d',
        last_week_mon_sun: 'last_week_mon_sun',
        last_week_sun_sat: 'last_week_sun_sat',
        last_quarter: 'last_quarter',
        last_year: 'last_year',
        this_week_mon_today: 'this_week_mon_today',
        this_week_sun_today: 'this_week_sun_today',
        this_year: 'this_year'
      });
    }
  }, {
    key: 'Period',
    get: function get() {
      return Object.freeze({
        day: 'day',
        week: 'week',
        days_28: 'days_28',
        month: 'month',
        lifetime: 'lifetime',
        total_over_range: 'total_over_range'
      });
    }
  }]);
  return InsightsResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageInsightsAsyncExportRun
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageInsightsAsyncExportRun = function (_AbstractCrudObject) {
  inherits(PageInsightsAsyncExportRun, _AbstractCrudObject);

  function PageInsightsAsyncExportRun() {
    classCallCheck(this, PageInsightsAsyncExportRun);
    return possibleConstructorReturn(this, (PageInsightsAsyncExportRun.__proto__ || Object.getPrototypeOf(PageInsightsAsyncExportRun)).apply(this, arguments));
  }

  createClass(PageInsightsAsyncExportRun, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        data_level: 'data_level',
        filters: 'filters',
        format: 'format',
        gen_report_date: 'gen_report_date',
        id: 'id',
        report_end_date: 'report_end_date',
        report_start_date: 'report_start_date',
        sorters: 'sorters',
        status: 'status'
      });
    }
  }]);
  return PageInsightsAsyncExportRun;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * InstantArticle
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var InstantArticle = function (_AbstractCrudObject) {
  inherits(InstantArticle, _AbstractCrudObject);

  function InstantArticle() {
    classCallCheck(this, InstantArticle);
    return possibleConstructorReturn(this, (InstantArticle.__proto__ || Object.getPrototypeOf(InstantArticle)).apply(this, arguments));
  }

  createClass(InstantArticle, [{
    key: 'deleteInstantArticles',
    value: function deleteInstantArticles(params) {
      return get$1(InstantArticle.prototype.__proto__ || Object.getPrototypeOf(InstantArticle.prototype), 'deleteEdge', this).call(this, '/instant_articles', params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        canonical_url: 'canonical_url',
        development_mode: 'development_mode',
        html_source: 'html_source',
        id: 'id',
        most_recent_import_status: 'most_recent_import_status',
        photos: 'photos',
        publish_status: 'publish_status',
        published: 'published',
        videos: 'videos'
      });
    }
  }]);
  return InstantArticle;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * InstantArticleInsightsQueryResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var InstantArticleInsightsQueryResult = function (_AbstractCrudObject) {
  inherits(InstantArticleInsightsQueryResult, _AbstractCrudObject);

  function InstantArticleInsightsQueryResult() {
    classCallCheck(this, InstantArticleInsightsQueryResult);
    return possibleConstructorReturn(this, (InstantArticleInsightsQueryResult.__proto__ || Object.getPrototypeOf(InstantArticleInsightsQueryResult)).apply(this, arguments));
  }

  createClass(InstantArticleInsightsQueryResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        breakdowns: 'breakdowns',
        name: 'name',
        time: 'time',
        value: 'value'
      });
    }
  }, {
    key: 'Breakdown',
    get: function get() {
      return Object.freeze({
        no_breakdown: 'no_breakdown',
        platform: 'platform',
        age: 'age',
        region: 'region',
        country: 'country',
        is_shared_by_ia_owner: 'is_shared_by_ia_owner',
        gender: 'gender',
        gender_and_age: 'gender_and_age',
        is_organic: 'is_organic'
      });
    }
  }, {
    key: 'Period',
    get: function get() {
      return Object.freeze({
        day: 'day',
        week: 'week',
        days_28: 'days_28',
        month: 'month',
        lifetime: 'lifetime',
        total_over_range: 'total_over_range'
      });
    }
  }]);
  return InstantArticleInsightsQueryResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageLabel
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageLabel = function (_AbstractCrudObject) {
  inherits(PageLabel, _AbstractCrudObject);

  function PageLabel() {
    classCallCheck(this, PageLabel);
    return possibleConstructorReturn(this, (PageLabel.__proto__ || Object.getPrototypeOf(PageLabel)).apply(this, arguments));
  }

  createClass(PageLabel, [{
    key: 'deleteUsers',
    value: function deleteUsers(params) {
      return get$1(PageLabel.prototype.__proto__ || Object.getPrototypeOf(PageLabel.prototype), 'deleteEdge', this).call(this, '/users', params);
    }
  }, {
    key: 'createUser',
    value: function createUser(fields, params) {
      return this.createEdge('/users', fields, params, User);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(PageLabel.prototype.__proto__ || Object.getPrototypeOf(PageLabel.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        creation_time: 'creation_time',
        creator_id: 'creator_id',
        from: 'from',
        id: 'id',
        name: 'name'
      });
    }
  }]);
  return PageLabel;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LiveVideo
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LiveVideo = function (_AbstractCrudObject) {
  inherits(LiveVideo, _AbstractCrudObject);

  function LiveVideo() {
    classCallCheck(this, LiveVideo);
    return possibleConstructorReturn(this, (LiveVideo.__proto__ || Object.getPrototypeOf(LiveVideo)).apply(this, arguments));
  }

  createClass(LiveVideo, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(LiveVideo.prototype.__proto__ || Object.getPrototypeOf(LiveVideo.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(LiveVideo.prototype.__proto__ || Object.getPrototypeOf(LiveVideo.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ad_break_config: 'ad_break_config',
        ad_break_failure_reason: 'ad_break_failure_reason',
        broadcast_start_time: 'broadcast_start_time',
        copyright: 'copyright',
        creation_time: 'creation_time',
        dash_preview_url: 'dash_preview_url',
        description: 'description',
        embed_html: 'embed_html',
        from: 'from',
        id: 'id',
        is_manual_mode: 'is_manual_mode',
        is_reference_only: 'is_reference_only',
        live_encoders: 'live_encoders',
        live_views: 'live_views',
        permalink_url: 'permalink_url',
        planned_start_time: 'planned_start_time',
        seconds_left: 'seconds_left',
        secure_stream_url: 'secure_stream_url',
        status: 'status',
        stream_url: 'stream_url',
        title: 'title',
        video: 'video'
      });
    }
  }, {
    key: 'LiveCommentModerationSetting',
    get: function get() {
      return Object.freeze({
        follower: 'FOLLOWER',
        slow: 'SLOW',
        discussion: 'DISCUSSION'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        unpublished: 'UNPUBLISHED',
        live_now: 'LIVE_NOW',
        scheduled_unpublished: 'SCHEDULED_UNPUBLISHED',
        scheduled_live: 'SCHEDULED_LIVE',
        scheduled_canceled: 'SCHEDULED_CANCELED'
      });
    }
  }, {
    key: 'StreamType',
    get: function get() {
      return Object.freeze({
        regular: 'REGULAR',
        ambient: 'AMBIENT'
      });
    }
  }, {
    key: 'BroadcastStatus',
    get: function get() {
      return Object.freeze({
        unpublished: 'UNPUBLISHED',
        live: 'LIVE',
        live_stopped: 'LIVE_STOPPED',
        processing: 'PROCESSING',
        vod: 'VOD',
        scheduled_unpublished: 'SCHEDULED_UNPUBLISHED',
        scheduled_live: 'SCHEDULED_LIVE',
        scheduled_expired: 'SCHEDULED_EXPIRED',
        scheduled_canceled: 'SCHEDULED_CANCELED'
      });
    }
  }, {
    key: 'Projection',
    get: function get() {
      return Object.freeze({
        equirectangular: 'EQUIRECTANGULAR',
        cubemap: 'CUBEMAP',
        single_fish_eye: 'SINGLE_FISH_EYE'
      });
    }
  }, {
    key: 'SpatialAudioFormat',
    get: function get() {
      return Object.freeze({
        ambix_4: 'ambiX_4'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        tagged: 'tagged',
        uploaded: 'uploaded'
      });
    }
  }]);
  return LiveVideo;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Location
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Location = function (_AbstractCrudObject) {
  inherits(Location, _AbstractCrudObject);

  function Location() {
    classCallCheck(this, Location);
    return possibleConstructorReturn(this, (Location.__proto__ || Object.getPrototypeOf(Location)).apply(this, arguments));
  }

  createClass(Location, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        city: 'city',
        city_id: 'city_id',
        country: 'country',
        country_code: 'country_code',
        latitude: 'latitude',
        located_in: 'located_in',
        longitude: 'longitude',
        name: 'name',
        region: 'region',
        region_id: 'region_id',
        state: 'state',
        street: 'street',
        zip: 'zip'
      });
    }
  }]);
  return Location;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * MediaFingerprint
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var MediaFingerprint = function (_AbstractCrudObject) {
  inherits(MediaFingerprint, _AbstractCrudObject);

  function MediaFingerprint() {
    classCallCheck(this, MediaFingerprint);
    return possibleConstructorReturn(this, (MediaFingerprint.__proto__ || Object.getPrototypeOf(MediaFingerprint)).apply(this, arguments));
  }

  createClass(MediaFingerprint, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(MediaFingerprint.prototype.__proto__ || Object.getPrototypeOf(MediaFingerprint.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(MediaFingerprint.prototype.__proto__ || Object.getPrototypeOf(MediaFingerprint.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        duration_in_sec: 'duration_in_sec',
        fingerprint_content_type: 'fingerprint_content_type',
        fingerprint_type: 'fingerprint_type',
        id: 'id',
        metadata: 'metadata',
        title: 'title',
        universal_content_id: 'universal_content_id'
      });
    }
  }, {
    key: 'FingerprintContentType',
    get: function get() {
      return Object.freeze({
        songtrack: 'SONGTRACK',
        episode: 'EPISODE',
        other: 'OTHER',
        movie: 'MOVIE',
        am_songtrack: 'AM_SONGTRACK'
      });
    }
  }]);
  return MediaFingerprint;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * MessagingFeatureReview
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var MessagingFeatureReview = function (_AbstractCrudObject) {
  inherits(MessagingFeatureReview, _AbstractCrudObject);

  function MessagingFeatureReview() {
    classCallCheck(this, MessagingFeatureReview);
    return possibleConstructorReturn(this, (MessagingFeatureReview.__proto__ || Object.getPrototypeOf(MessagingFeatureReview)).apply(this, arguments));
  }

  createClass(MessagingFeatureReview, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        feature: 'feature',
        status: 'status'
      });
    }
  }]);
  return MessagingFeatureReview;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * MessengerProfile
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var MessengerProfile = function (_AbstractCrudObject) {
  inherits(MessengerProfile, _AbstractCrudObject);

  function MessengerProfile() {
    classCallCheck(this, MessengerProfile);
    return possibleConstructorReturn(this, (MessengerProfile.__proto__ || Object.getPrototypeOf(MessengerProfile)).apply(this, arguments));
  }

  createClass(MessengerProfile, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_linking_url: 'account_linking_url',
        get_started: 'get_started',
        greeting: 'greeting',
        home_url: 'home_url',
        payment_settings: 'payment_settings',
        persistent_menu: 'persistent_menu',
        target_audience: 'target_audience',
        whitelisted_domains: 'whitelisted_domains'
      });
    }
  }]);
  return MessengerProfile;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LifeEvent
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LifeEvent = function (_AbstractCrudObject) {
  inherits(LifeEvent, _AbstractCrudObject);

  function LifeEvent() {
    classCallCheck(this, LifeEvent);
    return possibleConstructorReturn(this, (LifeEvent.__proto__ || Object.getPrototypeOf(LifeEvent)).apply(this, arguments));
  }

  createClass(LifeEvent, [{
    key: 'createComment',
    value: function createComment(fields, params) {
      return this.createEdge('/comments', fields, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        created_time: 'created_time',
        description: 'description',
        end_time: 'end_time',
        from: 'from',
        id: 'id',
        is_hidden: 'is_hidden',
        start_time: 'start_time',
        title: 'title',
        updated_time: 'updated_time'
      });
    }
  }]);
  return LifeEvent;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * NativeOffer
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var NativeOffer = function (_AbstractCrudObject) {
  inherits(NativeOffer, _AbstractCrudObject);

  function NativeOffer() {
    classCallCheck(this, NativeOffer);
    return possibleConstructorReturn(this, (NativeOffer.__proto__ || Object.getPrototypeOf(NativeOffer)).apply(this, arguments));
  }

  createClass(NativeOffer, [{
    key: 'createCode',
    value: function createCode(fields, params) {
      return this.createEdge('/codes', fields, params, NativeOffer);
    }
  }, {
    key: 'createNativeOfferView',
    value: function createNativeOfferView(fields, params) {
      return this.createEdge('/nativeofferviews', fields, params, NativeOffer);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        barcode_photo: 'barcode_photo',
        barcode_photo_uri: 'barcode_photo_uri',
        barcode_type: 'barcode_type',
        barcode_value: 'barcode_value',
        details: 'details',
        disable_location: 'disable_location',
        discounts: 'discounts',
        expiration_time: 'expiration_time',
        id: 'id',
        instore_code: 'instore_code',
        location_type: 'location_type',
        max_save_count: 'max_save_count',
        online_code: 'online_code',
        page: 'page',
        page_set_id: 'page_set_id',
        redemption_link: 'redemption_link',
        save_count: 'save_count',
        terms: 'terms',
        title: 'title',
        total_unique_codes: 'total_unique_codes',
        unique_codes: 'unique_codes',
        unique_codes_file_code_type: 'unique_codes_file_code_type',
        unique_codes_file_name: 'unique_codes_file_name',
        unique_codes_file_upload_status: 'unique_codes_file_upload_status'
      });
    }
  }, {
    key: 'UniqueCodesFileCodeType',
    get: function get() {
      return Object.freeze({
        discount_codes: 'discount_codes',
        barcodes: 'barcodes',
        online_discount_codes: 'online_discount_codes',
        instore_discount_codes: 'instore_discount_codes',
        instore_barcodes: 'instore_barcodes',
        discount_and_barcodes: 'discount_and_barcodes',
        discount_and_discount: 'discount_and_discount'
      });
    }
  }, {
    key: 'BarcodeType',
    get: function get() {
      return Object.freeze({
        code128: 'CODE128',
        code128b: 'CODE128B',
        code93: 'CODE93',
        databar: 'DATABAR',
        databar_expanded: 'DATABAR_EXPANDED',
        databar_expanded_stacked: 'DATABAR_EXPANDED_STACKED',
        databar_limited: 'DATABAR_LIMITED',
        datamatrix: 'DATAMATRIX',
        ean: 'EAN',
        pdf417: 'PDF417',
        qr: 'QR',
        upc_a: 'UPC_A',
        upc_e: 'UPC_E'
      });
    }
  }, {
    key: 'LocationType',
    get: function get() {
      return Object.freeze({
        online: 'online',
        offline: 'offline',
        both: 'both'
      });
    }
  }]);
  return NativeOffer;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessRoleRequest
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessRoleRequest = function (_AbstractCrudObject) {
  inherits(BusinessRoleRequest, _AbstractCrudObject);

  function BusinessRoleRequest() {
    classCallCheck(this, BusinessRoleRequest);
    return possibleConstructorReturn(this, (BusinessRoleRequest.__proto__ || Object.getPrototypeOf(BusinessRoleRequest)).apply(this, arguments));
  }

  createClass(BusinessRoleRequest, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(BusinessRoleRequest.prototype.__proto__ || Object.getPrototypeOf(BusinessRoleRequest.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(BusinessRoleRequest.prototype.__proto__ || Object.getPrototypeOf(BusinessRoleRequest.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        created_by: 'created_by',
        created_time: 'created_time',
        email: 'email',
        expiration_time: 'expiration_time',
        finance_role: 'finance_role',
        id: 'id',
        invite_link: 'invite_link',
        ip_role: 'ip_role',
        owner: 'owner',
        role: 'role',
        status: 'status',
        updated_by: 'updated_by',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'Role',
    get: function get() {
      return Object.freeze({
        finance_editor: 'FINANCE_EDITOR',
        finance_analyst: 'FINANCE_ANALYST',
        ads_rights_reviewer: 'ADS_RIGHTS_REVIEWER',
        admin: 'ADMIN',
        employee: 'EMPLOYEE',
        fb_employee_sales_rep: 'FB_EMPLOYEE_SALES_REP'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        pending: 'PENDING',
        accepted: 'ACCEPTED',
        declined: 'DECLINED',
        expired: 'EXPIRED'
      });
    }
  }]);
  return BusinessRoleRequest;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Persona
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Persona = function (_AbstractCrudObject) {
  inherits(Persona, _AbstractCrudObject);

  function Persona() {
    classCallCheck(this, Persona);
    return possibleConstructorReturn(this, (Persona.__proto__ || Object.getPrototypeOf(Persona)).apply(this, arguments));
  }

  createClass(Persona, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        name: 'name',
        profile_picture_url: 'profile_picture_url'
      });
    }
  }]);
  return Persona;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PlaceTopic
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PlaceTopic = function (_AbstractCrudObject) {
  inherits(PlaceTopic, _AbstractCrudObject);

  function PlaceTopic() {
    classCallCheck(this, PlaceTopic);
    return possibleConstructorReturn(this, (PlaceTopic.__proto__ || Object.getPrototypeOf(PlaceTopic)).apply(this, arguments));
  }

  createClass(PlaceTopic, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        count: 'count',
        has_children: 'has_children',
        icon_url: 'icon_url',
        id: 'id',
        name: 'name',
        parent_ids: 'parent_ids',
        plural_name: 'plural_name',
        top_subtopic_names: 'top_subtopic_names'
      });
    }
  }, {
    key: 'IconSize',
    get: function get() {
      return Object.freeze({
        value_24: '24',
        value_36: '36',
        value_48: '48',
        value_72: '72'
      });
    }
  }]);
  return PlaceTopic;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdStudyObjective
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdStudyObjective = function (_AbstractCrudObject) {
  inherits(AdStudyObjective, _AbstractCrudObject);

  function AdStudyObjective() {
    classCallCheck(this, AdStudyObjective);
    return possibleConstructorReturn(this, (AdStudyObjective.__proto__ || Object.getPrototypeOf(AdStudyObjective)).apply(this, arguments));
  }

  createClass(AdStudyObjective, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(AdStudyObjective.prototype.__proto__ || Object.getPrototypeOf(AdStudyObjective.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdStudyObjective.prototype.__proto__ || Object.getPrototypeOf(AdStudyObjective.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        custom_attributes: 'custom_attributes',
        id: 'id',
        is_primary: 'is_primary',
        last_updated_results: 'last_updated_results',
        name: 'name',
        results: 'results',
        type: 'type'
      });
    }
  }, {
    key: 'Breakdowns',
    get: function get() {
      return Object.freeze({
        age: 'age',
        cell_id: 'cell_id',
        gender: 'gender',
        country: 'country'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        sales: 'SALES',
        nonsales: 'NONSALES',
        mae: 'MAE',
        telco: 'TELCO',
        ftl: 'FTL',
        mai: 'MAI',
        partner: 'PARTNER',
        brandlift: 'BRANDLIFT',
        brand: 'BRAND'
      });
    }
  }]);
  return AdStudyObjective;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdStudy
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdStudy = function (_AbstractCrudObject) {
  inherits(AdStudy, _AbstractCrudObject);

  function AdStudy() {
    classCallCheck(this, AdStudy);
    return possibleConstructorReturn(this, (AdStudy.__proto__ || Object.getPrototypeOf(AdStudy)).apply(this, arguments));
  }

  createClass(AdStudy, [{
    key: 'createCustomAudience',
    value: function createCustomAudience(fields, params) {
      return this.createEdge('/customaudiences', fields, params, AdStudy);
    }
  }, {
    key: 'createObjective',
    value: function createObjective(fields, params) {
      return this.createEdge('/objectives', fields, params, AdStudyObjective);
    }
  }, {
    key: 'deleteUserPermissions',
    value: function deleteUserPermissions(params) {
      return get$1(AdStudy.prototype.__proto__ || Object.getPrototypeOf(AdStudy.prototype), 'deleteEdge', this).call(this, '/userpermissions', params);
    }
  }, {
    key: 'createUserPermission',
    value: function createUserPermission(fields, params) {
      return this.createEdge('/userpermissions', fields, params, AdStudy);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdStudy.prototype.__proto__ || Object.getPrototypeOf(AdStudy.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        business: 'business',
        canceled_time: 'canceled_time',
        cooldown_start_time: 'cooldown_start_time',
        created_by: 'created_by',
        created_time: 'created_time',
        description: 'description',
        end_time: 'end_time',
        id: 'id',
        name: 'name',
        observation_end_time: 'observation_end_time',
        start_time: 'start_time',
        type: 'type',
        updated_by: 'updated_by',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'AudienceType',
    get: function get() {
      return Object.freeze({
        most_responsive: 'MOST_RESPONSIVE',
        not_most_responsive: 'NOT_MOST_RESPONSIVE'
      });
    }
  }, {
    key: 'Role',
    get: function get() {
      return Object.freeze({
        admin: 'ADMIN',
        analyst: 'ANALYST'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        lift: 'LIFT',
        split_test: 'SPLIT_TEST'
      });
    }
  }]);
  return AdStudy;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAccountCreationRequest
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAccountCreationRequest = function (_AbstractCrudObject) {
  inherits(AdAccountCreationRequest, _AbstractCrudObject);

  function AdAccountCreationRequest() {
    classCallCheck(this, AdAccountCreationRequest);
    return possibleConstructorReturn(this, (AdAccountCreationRequest.__proto__ || Object.getPrototypeOf(AdAccountCreationRequest)).apply(this, arguments));
  }

  createClass(AdAccountCreationRequest, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(AdAccountCreationRequest.prototype.__proto__ || Object.getPrototypeOf(AdAccountCreationRequest.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdAccountCreationRequest.prototype.__proto__ || Object.getPrototypeOf(AdAccountCreationRequest.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ad_accounts_info: 'ad_accounts_info',
        additional_comment: 'additional_comment',
        address_in_chinese: 'address_in_chinese',
        address_in_english: 'address_in_english',
        advertiser_business: 'advertiser_business',
        appeal_reason: 'appeal_reason',
        business: 'business',
        business_registration_id: 'business_registration_id',
        chinese_legal_entity_name: 'chinese_legal_entity_name',
        contact: 'contact',
        creator: 'creator',
        disapproval_reasons: 'disapproval_reasons',
        english_legal_entity_name: 'english_legal_entity_name',
        extended_credit_id: 'extended_credit_id',
        id: 'id',
        is_smb: 'is_smb',
        is_test: 'is_test',
        is_under_authorization: 'is_under_authorization',
        official_website_url: 'official_website_url',
        planning_agency_business: 'planning_agency_business',
        promotable_app_ids: 'promotable_app_ids',
        promotable_page_ids: 'promotable_page_ids',
        promotable_urls: 'promotable_urls',
        request_change_reasons: 'request_change_reasons',
        status: 'status',
        subvertical: 'subvertical',
        time_created: 'time_created',
        vertical: 'vertical'
      });
    }
  }, {
    key: 'Subvertical',
    get: function get() {
      return Object.freeze({
        accounting_and_taxes_and_legal: 'ACCOUNTING_AND_TAXES_AND_LEGAL',
        agriculture_and_farming: 'AGRICULTURE_AND_FARMING',
        ecommerce_agriculture_and_farming: 'ECOMMERCE_AGRICULTURE_AND_FARMING',
        air: 'AIR',
        air_freight_or_package: 'AIR_FREIGHT_OR_PACKAGE',
        apparel_and_accessories: 'APPAREL_AND_ACCESSORIES',
        arts: 'ARTS',
        auctions: 'AUCTIONS',
        auto_rental: 'AUTO_RENTAL',
        b2b: 'B2B',
        b2b_manufacturing: 'B2B_MANUFACTURING',
        beauty_and_personal_care: 'BEAUTY_AND_PERSONAL_CARE',
        beer_and_wine_and_liquor: 'BEER_AND_WINE_AND_LIQUOR',
        bookstores: 'BOOKSTORES',
        bus_and_taxi_and_auto_retal: 'BUS_AND_TAXI_AND_AUTO_RETAL',
        business_support_services: 'BUSINESS_SUPPORT_SERVICES',
        cable_and_satellite: 'CABLE_AND_SATELLITE',
        career: 'CAREER',
        computing_and_peripherals: 'COMPUTING_AND_PERIPHERALS',
        console_developer: 'CONSOLE_DEVELOPER',
        console_device: 'CONSOLE_DEVICE',
        construction_and_mining: 'CONSTRUCTION_AND_MINING',
        consulting: 'CONSULTING',
        consumer_electronics: 'CONSUMER_ELECTRONICS',
        consumer_tech: 'CONSUMER_TECH',
        credit_and_financing_and_mortages: 'CREDIT_AND_FINANCING_AND_MORTAGES',
        cruises_and_marine: 'CRUISES_AND_MARINE',
        cvb_convention_and_visitors_bureau: 'CVB_CONVENTION_AND_VISITORS_BUREAU',
        dailydeals: 'DAILYDEALS',
        dating: 'DATING',
        department_store: 'DEPARTMENT_STORE',
        desktop_software: 'DESKTOP_SOFTWARE',
        digital_advertising_and_marketing_or_untagged_agencies: 'DIGITAL_ADVERTISING_AND_MARKETING_OR_UNTAGGED_AGENCIES',
        ecatalog: 'ECATALOG',
        ed_tech: 'ED_TECH',
        education_resources: 'EDUCATION_RESOURCES',
        elearning_and_massive_online_open_courses: 'ELEARNING_AND_MASSIVE_ONLINE_OPEN_COURSES',
        engineering_and_design: 'ENGINEERING_AND_DESIGN',
        events: 'EVENTS',
        family_and_health: 'FAMILY_AND_HEALTH',
        fitness: 'FITNESS',
        food: 'FOOD',
        footwear: 'FOOTWEAR',
        for_profit_colleges_and_universities: 'FOR_PROFIT_COLLEGES_AND_UNIVERSITIES',
        gambling: 'GAMBLING',
        government: 'GOVERNMENT',
        grocery_and_drug_and_convenience: 'GROCERY_AND_DRUG_AND_CONVENIENCE',
        highways: 'HIGHWAYS',
        home_and_office: 'HOME_AND_OFFICE',
        home_improvement: 'HOME_IMPROVEMENT',
        home_service: 'HOME_SERVICE',
        hotel_and_accomodation: 'HOTEL_AND_ACCOMODATION',
        household_goods: 'HOUSEHOLD_GOODS',
        insurance: 'INSURANCE',
        investment_bank_and_brokerage: 'INVESTMENT_BANK_AND_BROKERAGE',
        media: 'MEDIA',
        mobile_and_social: 'MOBILE_AND_SOCIAL',
        mobile_apps: 'MOBILE_APPS',
        movies: 'MOVIES',
        museums_and_parks_and_libraries: 'MUSEUMS_AND_PARKS_AND_LIBRARIES',
        music_and_radio: 'MUSIC_AND_RADIO',
        non_profit: 'NON_PROFIT',
        not_for_profit_colleges_and_universities: 'NOT_FOR_PROFIT_COLLEGES_AND_UNIVERSITIES',
        office: 'OFFICE',
        oil_and_gas_and_consumable_fuel: 'OIL_AND_GAS_AND_CONSUMABLE_FUEL',
        online_or_software: 'ONLINE_OR_SOFTWARE',
        pet: 'PET',
        pet_retail: 'PET_RETAIL',
        pharmaceutical_or_health: 'PHARMACEUTICAL_OR_HEALTH',
        photography_and_filming_services: 'PHOTOGRAPHY_AND_FILMING_SERVICES',
        political: 'POLITICAL',
        pr: 'PR',
        publishing_internet: 'PUBLISHING_INTERNET',
        railroads: 'RAILROADS',
        real_estate: 'REAL_ESTATE',
        real_money_or_skilled_gaming: 'REAL_MONEY_OR_SKILLED_GAMING',
        religious: 'RELIGIOUS',
        restaurant: 'RESTAURANT',
        retail_and_credit_union_and_commercial_bank: 'RETAIL_AND_CREDIT_UNION_AND_COMMERCIAL_BANK',
        school_and_early_children_edcation: 'SCHOOL_AND_EARLY_CHILDREN_EDCATION',
        seasonal_political_spenders: 'SEASONAL_POLITICAL_SPENDERS',
        smb_agents_and_promoters: 'SMB_AGENTS_AND_PROMOTERS',
        smb_artists_and_performers: 'SMB_ARTISTS_AND_PERFORMERS',
        smb_canvas: 'SMB_CANVAS',
        smb_catalog: 'SMB_CATALOG',
        smb_consumer_mobile_device: 'SMB_CONSUMER_MOBILE_DEVICE',
        smb_cross_platform: 'SMB_CROSS_PLATFORM',
        smb_electronics_and_appliances: 'SMB_ELECTRONICS_AND_APPLIANCES',
        smb_energy: 'SMB_ENERGY',
        smb_game_and_toy: 'SMB_GAME_AND_TOY',
        smb_information: 'SMB_INFORMATION',
        smb_navigation_and_measurement: 'SMB_NAVIGATION_AND_MEASUREMENT',
        smb_operations_and_other: 'SMB_OPERATIONS_AND_OTHER',
        smb_other: 'SMB_OTHER',
        smb_personal_care: 'SMB_PERSONAL_CARE',
        smb_religious: 'SMB_RELIGIOUS',
        smb_rentals: 'SMB_RENTALS',
        smb_repair_and_maintenance: 'SMB_REPAIR_AND_MAINTENANCE',
        smb_wireline_services: 'SMB_WIRELINE_SERVICES',
        software: 'SOFTWARE',
        sporting: 'SPORTING',
        sports: 'SPORTS',
        streaming: 'STREAMING',
        television: 'TELEVISION',
        tobacco: 'TOBACCO',
        toy_and_hobby: 'TOY_AND_HOBBY',
        trade_school: 'TRADE_SCHOOL',
        transportation_equipment: 'TRANSPORTATION_EQUIPMENT',
        traval_agency: 'TRAVAL_AGENCY',
        truck_and_moving: 'TRUCK_AND_MOVING',
        utilities_and_energy_equipment_and_services: 'UTILITIES_AND_ENERGY_EQUIPMENT_AND_SERVICES',
        water_and_soft_drink_and_baverage: 'WATER_AND_SOFT_DRINK_AND_BAVERAGE',
        wireless_services: 'WIRELESS_SERVICES'
      });
    }
  }, {
    key: 'Vertical',
    get: function get() {
      return Object.freeze({
        advertising_and_marketing: 'ADVERTISING_AND_MARKETING',
        auto_agency: 'AUTO_AGENCY',
        consumer_packaged_goods: 'CONSUMER_PACKAGED_GOODS',
        cpg_and_beverage: 'CPG_AND_BEVERAGE',
        ecommerce: 'ECOMMERCE',
        education: 'EDUCATION',
        energy_and_utilities: 'ENERGY_AND_UTILITIES',
        entertainment_and_media: 'ENTERTAINMENT_AND_MEDIA',
        financial_services: 'FINANCIAL_SERVICES',
        gaming: 'GAMING',
        goverment_and_politics: 'GOVERMENT_AND_POLITICS',
        motorcycles: 'MOTORCYCLES',
        organizations_and_associations: 'ORGANIZATIONS_AND_ASSOCIATIONS',
        other: 'OTHER',
        professional_services: 'PROFESSIONAL_SERVICES',
        retail: 'RETAIL',
        technology: 'TECHNOLOGY',
        telecom: 'TELECOM',
        travel: 'TRAVEL'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        pending: 'PENDING',
        under_review: 'UNDER_REVIEW',
        approved: 'APPROVED',
        disapproved: 'DISAPPROVED',
        requested_change: 'REQUESTED_CHANGE',
        cancelled: 'CANCELLED',
        auto_approved: 'AUTO_APPROVED',
        auto_disapproved: 'AUTO_DISAPPROVED',
        appeal_pending: 'APPEAL_PENDING',
        appeal_under_review: 'APPEAL_UNDER_REVIEW',
        appeal_approved: 'APPEAL_APPROVED',
        appeal_disapproved: 'APPEAL_DISAPPROVED'
      });
    }
  }]);
  return AdAccountCreationRequest;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdNetworkAnalyticsSyncQueryResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdNetworkAnalyticsSyncQueryResult = function (_AbstractCrudObject) {
  inherits(AdNetworkAnalyticsSyncQueryResult, _AbstractCrudObject);

  function AdNetworkAnalyticsSyncQueryResult() {
    classCallCheck(this, AdNetworkAnalyticsSyncQueryResult);
    return possibleConstructorReturn(this, (AdNetworkAnalyticsSyncQueryResult.__proto__ || Object.getPrototypeOf(AdNetworkAnalyticsSyncQueryResult)).apply(this, arguments));
  }

  createClass(AdNetworkAnalyticsSyncQueryResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        query_id: 'query_id',
        results: 'results'
      });
    }
  }]);
  return AdNetworkAnalyticsSyncQueryResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdNetworkAnalyticsAsyncQueryResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdNetworkAnalyticsAsyncQueryResult = function (_AbstractCrudObject) {
  inherits(AdNetworkAnalyticsAsyncQueryResult, _AbstractCrudObject);

  function AdNetworkAnalyticsAsyncQueryResult() {
    classCallCheck(this, AdNetworkAnalyticsAsyncQueryResult);
    return possibleConstructorReturn(this, (AdNetworkAnalyticsAsyncQueryResult.__proto__ || Object.getPrototypeOf(AdNetworkAnalyticsAsyncQueryResult)).apply(this, arguments));
  }

  createClass(AdNetworkAnalyticsAsyncQueryResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        data: 'data',
        error: 'error',
        query_id: 'query_id',
        results: 'results',
        status: 'status'
      });
    }
  }]);
  return AdNetworkAnalyticsAsyncQueryResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessAdvertisableApplicationsResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessAdvertisableApplicationsResult = function (_AbstractCrudObject) {
  inherits(BusinessAdvertisableApplicationsResult, _AbstractCrudObject);

  function BusinessAdvertisableApplicationsResult() {
    classCallCheck(this, BusinessAdvertisableApplicationsResult);
    return possibleConstructorReturn(this, (BusinessAdvertisableApplicationsResult.__proto__ || Object.getPrototypeOf(BusinessAdvertisableApplicationsResult)).apply(this, arguments));
  }

  createClass(BusinessAdvertisableApplicationsResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        has_insight_permission: 'has_insight_permission',
        id: 'id',
        name: 'name'
      });
    }
  }]);
  return BusinessAdvertisableApplicationsResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * OracleTransaction
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var OracleTransaction = function (_AbstractCrudObject) {
  inherits(OracleTransaction, _AbstractCrudObject);

  function OracleTransaction() {
    classCallCheck(this, OracleTransaction);
    return possibleConstructorReturn(this, (OracleTransaction.__proto__ || Object.getPrototypeOf(OracleTransaction)).apply(this, arguments));
  }

  createClass(OracleTransaction, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ad_account_ids: 'ad_account_ids',
        amount: 'amount',
        amount_due: 'amount_due',
        billed_amount_details: 'billed_amount_details',
        billing_period: 'billing_period',
        currency: 'currency',
        download_uri: 'download_uri',
        due_date: 'due_date',
        entity: 'entity',
        id: 'id',
        invoice_date: 'invoice_date',
        invoice_id: 'invoice_id',
        invoice_type: 'invoice_type',
        liability_type: 'liability_type',
        payment_status: 'payment_status',
        payment_term: 'payment_term',
        type: 'type'
      });
    }
  }]);
  return OracleTransaction;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessUser
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessUser = function (_AbstractCrudObject) {
  inherits(BusinessUser, _AbstractCrudObject);

  function BusinessUser() {
    classCallCheck(this, BusinessUser);
    return possibleConstructorReturn(this, (BusinessUser.__proto__ || Object.getPrototypeOf(BusinessUser)).apply(this, arguments));
  }

  createClass(BusinessUser, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(BusinessUser.prototype.__proto__ || Object.getPrototypeOf(BusinessUser.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(BusinessUser.prototype.__proto__ || Object.getPrototypeOf(BusinessUser.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        business: 'business',
        email: 'email',
        first_name: 'first_name',
        id: 'id',
        last_name: 'last_name',
        marked_for_removal: 'marked_for_removal',
        name: 'name',
        pending_email: 'pending_email',
        role: 'role',
        title: 'title',
        two_fac_status: 'two_fac_status'
      });
    }
  }, {
    key: 'Role',
    get: function get() {
      return Object.freeze({
        finance_editor: 'FINANCE_EDITOR',
        finance_analyst: 'FINANCE_ANALYST',
        ads_rights_reviewer: 'ADS_RIGHTS_REVIEWER',
        admin: 'ADMIN',
        employee: 'EMPLOYEE',
        fb_employee_sales_rep: 'FB_EMPLOYEE_SALES_REP'
      });
    }
  }]);
  return BusinessUser;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessProject
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessProject = function (_AbstractCrudObject) {
  inherits(BusinessProject, _AbstractCrudObject);

  function BusinessProject() {
    classCallCheck(this, BusinessProject);
    return possibleConstructorReturn(this, (BusinessProject.__proto__ || Object.getPrototypeOf(BusinessProject)).apply(this, arguments));
  }

  createClass(BusinessProject, [{
    key: 'deleteAssets',
    value: function deleteAssets(params) {
      return get$1(BusinessProject.prototype.__proto__ || Object.getPrototypeOf(BusinessProject.prototype), 'deleteEdge', this).call(this, '/assets', params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        business: 'business',
        created_time: 'created_time',
        creator: 'creator',
        id: 'id',
        name: 'name'
      });
    }
  }]);
  return BusinessProject;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * DirectDeal
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var DirectDeal = function (_AbstractCrudObject) {
  inherits(DirectDeal, _AbstractCrudObject);

  function DirectDeal() {
    classCallCheck(this, DirectDeal);
    return possibleConstructorReturn(this, (DirectDeal.__proto__ || Object.getPrototypeOf(DirectDeal)).apply(this, arguments));
  }

  createClass(DirectDeal, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adbreaks_enabled: 'adbreaks_enabled',
        adset: 'adset',
        advertiser: 'advertiser',
        advertiser_lead_email: 'advertiser_lead_email',
        advertiser_page: 'advertiser_page',
        cpe_amount: 'cpe_amount',
        cpe_currency: 'cpe_currency',
        end_time: 'end_time',
        id: 'id',
        lifetime_budget_amount: 'lifetime_budget_amount',
        lifetime_budget_currency: 'lifetime_budget_currency',
        lifetime_impressions: 'lifetime_impressions',
        name: 'name',
        pages: 'pages',
        placements: 'placements',
        priced_by: 'priced_by',
        publisher_name: 'publisher_name',
        review_requirement: 'review_requirement',
        sales_lead_email: 'sales_lead_email',
        start_time: 'start_time',
        status: 'status',
        targeting: 'targeting'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        value_0: '0',
        value_1: '1',
        value_2: '2',
        value_3: '3',
        value_4: '4',
        value_5: '5',
        value_6: '6'
      });
    }
  }]);
  return DirectDeal;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * EventSourceGroup
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var EventSourceGroup = function (_AbstractCrudObject) {
  inherits(EventSourceGroup, _AbstractCrudObject);

  function EventSourceGroup() {
    classCallCheck(this, EventSourceGroup);
    return possibleConstructorReturn(this, (EventSourceGroup.__proto__ || Object.getPrototypeOf(EventSourceGroup)).apply(this, arguments));
  }

  createClass(EventSourceGroup, [{
    key: 'createSharedAccount',
    value: function createSharedAccount(fields, params) {
      return this.createEdge('/shared_accounts', fields, params, EventSourceGroup);
    }
  }, {
    key: 'deleteUserPermissions',
    value: function deleteUserPermissions(params) {
      return get$1(EventSourceGroup.prototype.__proto__ || Object.getPrototypeOf(EventSourceGroup.prototype), 'deleteEdge', this).call(this, '/userpermissions', params);
    }
  }, {
    key: 'createUserPermission',
    value: function createUserPermission(fields, params) {
      return this.createEdge('/userpermissions', fields, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(EventSourceGroup.prototype.__proto__ || Object.getPrototypeOf(EventSourceGroup.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        business: 'business',
        event_sources: 'event_sources',
        id: 'id',
        name: 'name'
      });
    }
  }]);
  return EventSourceGroup;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ExtendedCreditInvoiceGroup
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ExtendedCreditInvoiceGroup = function (_AbstractCrudObject) {
  inherits(ExtendedCreditInvoiceGroup, _AbstractCrudObject);

  function ExtendedCreditInvoiceGroup() {
    classCallCheck(this, ExtendedCreditInvoiceGroup);
    return possibleConstructorReturn(this, (ExtendedCreditInvoiceGroup.__proto__ || Object.getPrototypeOf(ExtendedCreditInvoiceGroup)).apply(this, arguments));
  }

  createClass(ExtendedCreditInvoiceGroup, [{
    key: 'deleteAdAccounts',
    value: function deleteAdAccounts(params) {
      return get$1(ExtendedCreditInvoiceGroup.prototype.__proto__ || Object.getPrototypeOf(ExtendedCreditInvoiceGroup.prototype), 'deleteEdge', this).call(this, '/ad_accounts', params);
    }
  }, {
    key: 'getAdAccounts',
    value: function getAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccount, fields, params, fetchFirstPage, '/ad_accounts');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(ExtendedCreditInvoiceGroup.prototype.__proto__ || Object.getPrototypeOf(ExtendedCreditInvoiceGroup.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(ExtendedCreditInvoiceGroup.prototype.__proto__ || Object.getPrototypeOf(ExtendedCreditInvoiceGroup.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        email: 'email',
        emails: 'emails',
        id: 'id',
        name: 'name'
      });
    }
  }]);
  return ExtendedCreditInvoiceGroup;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ExtendedCreditAllocationConfig
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ExtendedCreditAllocationConfig = function (_AbstractCrudObject) {
  inherits(ExtendedCreditAllocationConfig, _AbstractCrudObject);

  function ExtendedCreditAllocationConfig() {
    classCallCheck(this, ExtendedCreditAllocationConfig);
    return possibleConstructorReturn(this, (ExtendedCreditAllocationConfig.__proto__ || Object.getPrototypeOf(ExtendedCreditAllocationConfig)).apply(this, arguments));
  }

  createClass(ExtendedCreditAllocationConfig, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(ExtendedCreditAllocationConfig.prototype.__proto__ || Object.getPrototypeOf(ExtendedCreditAllocationConfig.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        currency_amount: 'currency_amount',
        id: 'id',
        liability_type: 'liability_type',
        owning_business: 'owning_business',
        owning_credential: 'owning_credential',
        partition_type: 'partition_type',
        receiving_business: 'receiving_business',
        receiving_credential: 'receiving_credential',
        request_status: 'request_status',
        send_bill_to: 'send_bill_to'
      });
    }
  }, {
    key: 'LiabilityType',
    get: function get() {
      return Object.freeze({
        normal: 'Normal',
        sequential: 'Sequential',
        msa: 'MSA'
      });
    }
  }, {
    key: 'PartitionType',
    get: function get() {
      return Object.freeze({
        fixed: 'FIXED',
        auth: 'AUTH'
      });
    }
  }, {
    key: 'SendBillTo',
    get: function get() {
      return Object.freeze({
        agency: 'Agency',
        advertiser: 'Advertiser'
      });
    }
  }]);
  return ExtendedCreditAllocationConfig;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ExtendedCredit
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ExtendedCredit = function (_AbstractCrudObject) {
  inherits(ExtendedCredit, _AbstractCrudObject);

  function ExtendedCredit() {
    classCallCheck(this, ExtendedCredit);
    return possibleConstructorReturn(this, (ExtendedCredit.__proto__ || Object.getPrototypeOf(ExtendedCredit)).apply(this, arguments));
  }

  createClass(ExtendedCredit, [{
    key: 'getExtendedCreditInvoiceGroups',
    value: function getExtendedCreditInvoiceGroups(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ExtendedCreditInvoiceGroup, fields, params, fetchFirstPage, '/extended_credit_invoice_groups');
    }
  }, {
    key: 'createExtendedCreditInvoiceGroup',
    value: function createExtendedCreditInvoiceGroup(fields, params) {
      return this.createEdge('/extended_credit_invoice_groups', fields, params, ExtendedCredit);
    }
  }, {
    key: 'getOwningCreditAllocationConfigs',
    value: function getOwningCreditAllocationConfigs(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ExtendedCreditAllocationConfig, fields, params, fetchFirstPage, '/owning_credit_allocation_configs');
    }
  }, {
    key: 'createOwningCreditAllocationConfig',
    value: function createOwningCreditAllocationConfig(fields, params) {
      return this.createEdge('/owning_credit_allocation_configs', fields, params, ExtendedCreditAllocationConfig);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        allocated_amount: 'allocated_amount',
        balance: 'balance',
        credit_available: 'credit_available',
        credit_type: 'credit_type',
        id: 'id',
        last_payment_time: 'last_payment_time',
        legal_entity_name: 'legal_entity_name',
        liable_biz_name: 'liable_biz_name',
        max_balance: 'max_balance',
        online_max_balance: 'online_max_balance',
        owner_business: 'owner_business',
        owner_business_name: 'owner_business_name',
        partition_from: 'partition_from',
        receiving_credit_allocation_config: 'receiving_credit_allocation_config',
        send_bill_to_biz_name: 'send_bill_to_biz_name'
      });
    }
  }]);
  return ExtendedCredit;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ReachFrequencyPrediction
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ReachFrequencyPrediction = function (_AbstractCrudObject) {
  inherits(ReachFrequencyPrediction, _AbstractCrudObject);

  function ReachFrequencyPrediction() {
    classCallCheck(this, ReachFrequencyPrediction);
    return possibleConstructorReturn(this, (ReachFrequencyPrediction.__proto__ || Object.getPrototypeOf(ReachFrequencyPrediction)).apply(this, arguments));
  }

  createClass(ReachFrequencyPrediction, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        campaign_group_id: 'campaign_group_id',
        campaign_id: 'campaign_id',
        campaign_time_start: 'campaign_time_start',
        campaign_time_stop: 'campaign_time_stop',
        curve_budget_reach: 'curve_budget_reach',
        daily_impression_curve: 'daily_impression_curve',
        destination_id: 'destination_id',
        expiration_time: 'expiration_time',
        external_budget: 'external_budget',
        external_impression: 'external_impression',
        external_maximum_budget: 'external_maximum_budget',
        external_maximum_impression: 'external_maximum_impression',
        external_maximum_reach: 'external_maximum_reach',
        external_minimum_budget: 'external_minimum_budget',
        external_minimum_impression: 'external_minimum_impression',
        external_minimum_reach: 'external_minimum_reach',
        external_reach: 'external_reach',
        frequency_cap: 'frequency_cap',
        frequency_distribution: 'frequency_distribution',
        frequency_distribution_map: 'frequency_distribution_map',
        frequency_distribution_map_agg: 'frequency_distribution_map_agg',
        grp_dmas_audience_size: 'grp_dmas_audience_size',
        holdout_percentage: 'holdout_percentage',
        id: 'id',
        instagram_destination_id: 'instagram_destination_id',
        interval_frequency_cap: 'interval_frequency_cap',
        interval_frequency_cap_reset_period: 'interval_frequency_cap_reset_period',
        name: 'name',
        pause_periods: 'pause_periods',
        placement_breakdown: 'placement_breakdown',
        prediction_mode: 'prediction_mode',
        prediction_progress: 'prediction_progress',
        reservation_status: 'reservation_status',
        status: 'status',
        story_event_type: 'story_event_type',
        target_audience_size: 'target_audience_size',
        target_spec: 'target_spec',
        time_created: 'time_created',
        time_updated: 'time_updated'
      });
    }
  }, {
    key: 'InstreamPackages',
    get: function get() {
      return Object.freeze({
        normal: 'NORMAL',
        premium: 'PREMIUM',
        sports: 'SPORTS',
        entertainment: 'ENTERTAINMENT',
        beauty: 'BEAUTY'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        expired: 'EXPIRED',
        draft: 'DRAFT',
        pending: 'PENDING',
        active: 'ACTIVE',
        completed: 'COMPLETED'
      });
    }
  }]);
  return ReachFrequencyPrediction;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessMatchedSearchApplicationsEdgeData
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessMatchedSearchApplicationsEdgeData = function (_AbstractCrudObject) {
  inherits(BusinessMatchedSearchApplicationsEdgeData, _AbstractCrudObject);

  function BusinessMatchedSearchApplicationsEdgeData() {
    classCallCheck(this, BusinessMatchedSearchApplicationsEdgeData);
    return possibleConstructorReturn(this, (BusinessMatchedSearchApplicationsEdgeData.__proto__ || Object.getPrototypeOf(BusinessMatchedSearchApplicationsEdgeData)).apply(this, arguments));
  }

  createClass(BusinessMatchedSearchApplicationsEdgeData, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        app_id: 'app_id',
        icon_url: 'icon_url',
        name: 'name',
        search_source_store: 'search_source_store',
        store: 'store',
        unique_id: 'unique_id',
        url: 'url'
      });
    }
  }, {
    key: 'AppStore',
    get: function get() {
      return Object.freeze({
        amazon_app_store: 'AMAZON_APP_STORE',
        google_play: 'GOOGLE_PLAY',
        itunes: 'ITUNES',
        itunes_ipad: 'ITUNES_IPAD',
        fb_canvas: 'FB_CANVAS',
        fb_gameroom: 'FB_GAMEROOM',
        windows_store: 'WINDOWS_STORE',
        fb_android_store: 'FB_ANDROID_STORE',
        windows_10_store: 'WINDOWS_10_STORE',
        roku_store: 'ROKU_STORE',
        instant_game: 'INSTANT_GAME',
        does_not_exist: 'DOES_NOT_EXIST'
      });
    }
  }]);
  return BusinessMatchedSearchApplicationsEdgeData;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * MeasurementReport
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var MeasurementReport = function (_AbstractCrudObject) {
  inherits(MeasurementReport, _AbstractCrudObject);

  function MeasurementReport() {
    classCallCheck(this, MeasurementReport);
    return possibleConstructorReturn(this, (MeasurementReport.__proto__ || Object.getPrototypeOf(MeasurementReport)).apply(this, arguments));
  }

  createClass(MeasurementReport, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(MeasurementReport.prototype.__proto__ || Object.getPrototypeOf(MeasurementReport.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(MeasurementReport.prototype.__proto__ || Object.getPrototypeOf(MeasurementReport.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        download_urls: 'download_urls',
        id: 'id',
        metadata: 'metadata',
        report_type: 'report_type',
        status: 'status',
        upload_urls: 'upload_urls'
      });
    }
  }, {
    key: 'ReportType',
    get: function get() {
      return Object.freeze({
        multi_channel_report: 'multi_channel_report',
        video_metrics_report: 'video_metrics_report',
        fruit_rollup_report: 'fruit_rollup_report',
        third_party_mta_report: 'third_party_mta_report',
        partner_lift_study_report: 'partner_lift_study_report',
        mmm_report: 'mmm_report'
      });
    }
  }]);
  return MeasurementReport;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * OfflineConversionDataSet
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var OfflineConversionDataSet = function (_AbstractCrudObject) {
  inherits(OfflineConversionDataSet, _AbstractCrudObject);

  function OfflineConversionDataSet() {
    classCallCheck(this, OfflineConversionDataSet);
    return possibleConstructorReturn(this, (OfflineConversionDataSet.__proto__ || Object.getPrototypeOf(OfflineConversionDataSet)).apply(this, arguments));
  }

  createClass(OfflineConversionDataSet, [{
    key: 'getActivities',
    value: function getActivities(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/activities');
    }
  }, {
    key: 'deleteAdAccounts',
    value: function deleteAdAccounts(params) {
      return get$1(OfflineConversionDataSet.prototype.__proto__ || Object.getPrototypeOf(OfflineConversionDataSet.prototype), 'deleteEdge', this).call(this, '/adaccounts', params);
    }
  }, {
    key: 'getAdAccounts',
    value: function getAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccount, fields, params, fetchFirstPage, '/adaccounts');
    }
  }, {
    key: 'createAdAccount',
    value: function createAdAccount(fields, params) {
      return this.createEdge('/adaccounts', fields, params);
    }
  }, {
    key: 'deleteAgencies',
    value: function deleteAgencies(params) {
      return get$1(OfflineConversionDataSet.prototype.__proto__ || Object.getPrototypeOf(OfflineConversionDataSet.prototype), 'deleteEdge', this).call(this, '/agencies', params);
    }
  }, {
    key: 'createAgency',
    value: function createAgency(fields, params) {
      return this.createEdge('/agencies', fields, params, Business);
    }
  }, {
    key: 'createEvent',
    value: function createEvent(fields, params) {
      return this.createEdge('/events', fields, params);
    }
  }, {
    key: 'getStats',
    value: function getStats(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/stats');
    }
  }, {
    key: 'getUploads',
    value: function getUploads(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/uploads');
    }
  }, {
    key: 'createUpload',
    value: function createUpload(fields, params) {
      return this.createEdge('/uploads', fields, params);
    }
  }, {
    key: 'deleteUserPermissions',
    value: function deleteUserPermissions(params) {
      return get$1(OfflineConversionDataSet.prototype.__proto__ || Object.getPrototypeOf(OfflineConversionDataSet.prototype), 'deleteEdge', this).call(this, '/userpermissions', params);
    }
  }, {
    key: 'createUserPermission',
    value: function createUserPermission(fields, params) {
      return this.createEdge('/userpermissions', fields, params);
    }
  }, {
    key: 'createValidate',
    value: function createValidate(fields, params) {
      return this.createEdge('/validate', fields, params, OfflineConversionDataSet);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(OfflineConversionDataSet.prototype.__proto__ || Object.getPrototypeOf(OfflineConversionDataSet.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(OfflineConversionDataSet.prototype.__proto__ || Object.getPrototypeOf(OfflineConversionDataSet.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        business: 'business',
        config: 'config',
        creation_time: 'creation_time',
        description: 'description',
        duplicate_entries: 'duplicate_entries',
        enable_auto_assign_to_accounts: 'enable_auto_assign_to_accounts',
        event_stats: 'event_stats',
        event_time_max: 'event_time_max',
        event_time_min: 'event_time_min',
        id: 'id',
        is_restricted_use: 'is_restricted_use',
        last_upload_app: 'last_upload_app',
        matched_entries: 'matched_entries',
        name: 'name',
        usage: 'usage',
        valid_entries: 'valid_entries'
      });
    }
  }]);
  return OfflineConversionDataSet;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * OwnedDomain
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var OwnedDomain = function (_AbstractCrudObject) {
  inherits(OwnedDomain, _AbstractCrudObject);

  function OwnedDomain() {
    classCallCheck(this, OwnedDomain);
    return possibleConstructorReturn(this, (OwnedDomain.__proto__ || Object.getPrototypeOf(OwnedDomain)).apply(this, arguments));
  }

  createClass(OwnedDomain, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        domain_name: 'domain_name',
        id: 'id',
        page_block_list: 'page_block_list'
      });
    }
  }]);
  return OwnedDomain;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessAdAccountRequest
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessAdAccountRequest = function (_AbstractCrudObject) {
  inherits(BusinessAdAccountRequest, _AbstractCrudObject);

  function BusinessAdAccountRequest() {
    classCallCheck(this, BusinessAdAccountRequest);
    return possibleConstructorReturn(this, (BusinessAdAccountRequest.__proto__ || Object.getPrototypeOf(BusinessAdAccountRequest)).apply(this, arguments));
  }

  createClass(BusinessAdAccountRequest, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ad_account: 'ad_account',
        id: 'id'
      });
    }
  }]);
  return BusinessAdAccountRequest;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessApplicationRequest
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessApplicationRequest = function (_AbstractCrudObject) {
  inherits(BusinessApplicationRequest, _AbstractCrudObject);

  function BusinessApplicationRequest() {
    classCallCheck(this, BusinessApplicationRequest);
    return possibleConstructorReturn(this, (BusinessApplicationRequest.__proto__ || Object.getPrototypeOf(BusinessApplicationRequest)).apply(this, arguments));
  }

  createClass(BusinessApplicationRequest, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        application: 'application',
        id: 'id'
      });
    }
  }]);
  return BusinessApplicationRequest;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BusinessPageRequest
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BusinessPageRequest = function (_AbstractCrudObject) {
  inherits(BusinessPageRequest, _AbstractCrudObject);

  function BusinessPageRequest() {
    classCallCheck(this, BusinessPageRequest);
    return possibleConstructorReturn(this, (BusinessPageRequest.__proto__ || Object.getPrototypeOf(BusinessPageRequest)).apply(this, arguments));
  }

  createClass(BusinessPageRequest, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        page: 'page'
      });
    }
  }]);
  return BusinessPageRequest;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LegacyBusinessAdAccountRequest
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LegacyBusinessAdAccountRequest = function (_AbstractCrudObject) {
  inherits(LegacyBusinessAdAccountRequest, _AbstractCrudObject);

  function LegacyBusinessAdAccountRequest() {
    classCallCheck(this, LegacyBusinessAdAccountRequest);
    return possibleConstructorReturn(this, (LegacyBusinessAdAccountRequest.__proto__ || Object.getPrototypeOf(LegacyBusinessAdAccountRequest)).apply(this, arguments));
  }

  createClass(LegacyBusinessAdAccountRequest, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ad_account: 'ad_account',
        id: 'id',
        permitted_roles: 'permitted_roles'
      });
    }
  }]);
  return LegacyBusinessAdAccountRequest;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AudiencePermission
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AudiencePermission = function (_AbstractCrudObject) {
  inherits(AudiencePermission, _AbstractCrudObject);

  function AudiencePermission() {
    classCallCheck(this, AudiencePermission);
    return possibleConstructorReturn(this, (AudiencePermission.__proto__ || Object.getPrototypeOf(AudiencePermission)).apply(this, arguments));
  }

  createClass(AudiencePermission, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        audience: 'audience',
        share_account_id: 'share_account_id',
        share_account_name: 'share_account_name'
      });
    }
  }]);
  return AudiencePermission;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * SystemUser
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var SystemUser = function (_AbstractCrudObject) {
  inherits(SystemUser, _AbstractCrudObject);

  function SystemUser() {
    classCallCheck(this, SystemUser);
    return possibleConstructorReturn(this, (SystemUser.__proto__ || Object.getPrototypeOf(SystemUser)).apply(this, arguments));
  }

  createClass(SystemUser, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(SystemUser.prototype.__proto__ || Object.getPrototypeOf(SystemUser.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        created_by: 'created_by',
        created_time: 'created_time',
        id: 'id',
        name: 'name'
      });
    }
  }, {
    key: 'Role',
    get: function get() {
      return Object.freeze({
        finance_editor: 'FINANCE_EDITOR',
        finance_analyst: 'FINANCE_ANALYST',
        ads_rights_reviewer: 'ADS_RIGHTS_REVIEWER',
        admin: 'ADMIN',
        employee: 'EMPLOYEE',
        fb_employee_sales_rep: 'FB_EMPLOYEE_SALES_REP'
      });
    }
  }]);
  return SystemUser;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Business
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Business = function (_AbstractCrudObject) {
  inherits(Business, _AbstractCrudObject);

  function Business() {
    classCallCheck(this, Business);
    return possibleConstructorReturn(this, (Business.__proto__ || Object.getPrototypeOf(Business)).apply(this, arguments));
  }

  createClass(Business, [{
    key: 'createAccessToken',
    value: function createAccessToken(fields, params) {
      return this.createEdge('/access_token', fields, params);
    }
  }, {
    key: 'createAdStudy',
    value: function createAdStudy(fields, params) {
      return this.createEdge('/ad_studies', fields, params, AdStudy);
    }
  }, {
    key: 'createAdAccount',
    value: function createAdAccount(fields, params) {
      return this.createEdge('/adaccount', fields, params, AdAccount);
    }
  }, {
    key: 'getAdAccountCreationRequests',
    value: function getAdAccountCreationRequests(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountCreationRequest, fields, params, fetchFirstPage, '/adaccountcreationrequests');
    }
  }, {
    key: 'createAdAccountCreationRequest',
    value: function createAdAccountCreationRequest(fields, params) {
      return this.createEdge('/adaccountcreationrequests', fields, params, AdAccountCreationRequest);
    }
  }, {
    key: 'deleteAdAccounts',
    value: function deleteAdAccounts(params) {
      return get$1(Business.prototype.__proto__ || Object.getPrototypeOf(Business.prototype), 'deleteEdge', this).call(this, '/adaccounts', params);
    }
  }, {
    key: 'getAdNetworkAnalytics',
    value: function getAdNetworkAnalytics(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdNetworkAnalyticsSyncQueryResult, fields, params, fetchFirstPage, '/adnetworkanalytics');
    }
  }, {
    key: 'createAdNetworkAnalytic',
    value: function createAdNetworkAnalytic(fields, params) {
      return this.createEdge('/adnetworkanalytics', fields, params);
    }
  }, {
    key: 'getAdNetworkAnalyticsResults',
    value: function getAdNetworkAnalyticsResults(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdNetworkAnalyticsAsyncQueryResult, fields, params, fetchFirstPage, '/adnetworkanalytics_results');
    }
  }, {
    key: 'getAdsPixels',
    value: function getAdsPixels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsPixel, fields, params, fetchFirstPage, '/adspixels');
    }
  }, {
    key: 'createAdsPixel',
    value: function createAdsPixel(fields, params) {
      return this.createEdge('/adspixels', fields, params, AdsPixel);
    }
  }, {
    key: 'getAdvertisableApplications',
    value: function getAdvertisableApplications(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessAdvertisableApplicationsResult, fields, params, fetchFirstPage, '/advertisable_applications');
    }
  }, {
    key: 'deleteAgencies',
    value: function deleteAgencies(params) {
      return get$1(Business.prototype.__proto__ || Object.getPrototypeOf(Business.prototype), 'deleteEdge', this).call(this, '/agencies', params);
    }
  }, {
    key: 'getAgencyPages',
    value: function getAgencyPages(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Page, fields, params, fetchFirstPage, '/agency_pages');
    }
  }, {
    key: 'deleteApps',
    value: function deleteApps(params) {
      return get$1(Business.prototype.__proto__ || Object.getPrototypeOf(Business.prototype), 'deleteEdge', this).call(this, '/apps', params);
    }
  }, {
    key: 'createApp',
    value: function createApp(fields, params) {
      return this.createEdge('/apps', fields, params);
    }
  }, {
    key: 'getBusinessActivities',
    value: function getBusinessActivities(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessActivityLogEvent, fields, params, fetchFirstPage, '/business_activities');
    }
  }, {
    key: 'getBusinessInvoices',
    value: function getBusinessInvoices(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(OracleTransaction, fields, params, fetchFirstPage, '/business_invoices');
    }
  }, {
    key: 'getBusinessUsers',
    value: function getBusinessUsers(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessUser, fields, params, fetchFirstPage, '/business_users');
    }
  }, {
    key: 'createBusinessUser',
    value: function createBusinessUser(fields, params) {
      return this.createEdge('/business_users', fields, params, Business);
    }
  }, {
    key: 'getBusinessProjects',
    value: function getBusinessProjects(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessProject, fields, params, fetchFirstPage, '/businessprojects');
    }
  }, {
    key: 'getClientAdAccounts',
    value: function getClientAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccount, fields, params, fetchFirstPage, '/client_ad_accounts');
    }
  }, {
    key: 'createClientAdAccount',
    value: function createClientAdAccount(fields, params) {
      return this.createEdge('/client_ad_accounts', fields, params, AdAccount);
    }
  }, {
    key: 'getClientApps',
    value: function getClientApps(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/client_apps');
    }
  }, {
    key: 'createClientApp',
    value: function createClientApp(fields, params) {
      return this.createEdge('/client_apps', fields, params);
    }
  }, {
    key: 'getClientBusinesses',
    value: function getClientBusinesses(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Business, fields, params, fetchFirstPage, '/client_businesses');
    }
  }, {
    key: 'getClientPages',
    value: function getClientPages(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Page, fields, params, fetchFirstPage, '/client_pages');
    }
  }, {
    key: 'getClientPixels',
    value: function getClientPixels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsPixel, fields, params, fetchFirstPage, '/client_pixels');
    }
  }, {
    key: 'getClientProductCatalogs',
    value: function getClientProductCatalogs(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductCatalog, fields, params, fetchFirstPage, '/client_product_catalogs');
    }
  }, {
    key: 'deleteClients',
    value: function deleteClients(params) {
      return get$1(Business.prototype.__proto__ || Object.getPrototypeOf(Business.prototype), 'deleteEdge', this).call(this, '/clients', params);
    }
  }, {
    key: 'getDirectDeals',
    value: function getDirectDeals(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(DirectDeal, fields, params, fetchFirstPage, '/direct_deals');
    }
  }, {
    key: 'getEventSourceGroups',
    value: function getEventSourceGroups(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(EventSourceGroup, fields, params, fetchFirstPage, '/event_source_groups');
    }
  }, {
    key: 'createEventSourceGroup',
    value: function createEventSourceGroup(fields, params) {
      return this.createEdge('/event_source_groups', fields, params, EventSourceGroup);
    }
  }, {
    key: 'getExtendedCredits',
    value: function getExtendedCredits(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ExtendedCredit, fields, params, fetchFirstPage, '/extendedcredits');
    }
  }, {
    key: 'getGrpPlans',
    value: function getGrpPlans(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ReachFrequencyPrediction, fields, params, fetchFirstPage, '/grp_plans');
    }
  }, {
    key: 'getInstagramAccounts',
    value: function getInstagramAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/instagram_accounts');
    }
  }, {
    key: 'getMatchedSearchApplications',
    value: function getMatchedSearchApplications(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessMatchedSearchApplicationsEdgeData, fields, params, fetchFirstPage, '/matched_search_applications');
    }
  }, {
    key: 'getMeasurementReports',
    value: function getMeasurementReports(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(MeasurementReport, fields, params, fetchFirstPage, '/measurement_reports');
    }
  }, {
    key: 'createMeasurementReport',
    value: function createMeasurementReport(fields, params) {
      return this.createEdge('/measurement_reports', fields, params, MeasurementReport);
    }
  }, {
    key: 'getOfflineConversionDataSets',
    value: function getOfflineConversionDataSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(OfflineConversionDataSet, fields, params, fetchFirstPage, '/offline_conversion_data_sets');
    }
  }, {
    key: 'createOfflineConversionDataSet',
    value: function createOfflineConversionDataSet(fields, params) {
      return this.createEdge('/offline_conversion_data_sets', fields, params, OfflineConversionDataSet);
    }
  }, {
    key: 'getOwnedAdAccounts',
    value: function getOwnedAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccount, fields, params, fetchFirstPage, '/owned_ad_accounts');
    }
  }, {
    key: 'createOwnedAdAccount',
    value: function createOwnedAdAccount(fields, params) {
      return this.createEdge('/owned_ad_accounts', fields, params, AdAccount);
    }
  }, {
    key: 'getOwnedApps',
    value: function getOwnedApps(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/owned_apps');
    }
  }, {
    key: 'createOwnedApp',
    value: function createOwnedApp(fields, params) {
      return this.createEdge('/owned_apps', fields, params);
    }
  }, {
    key: 'deleteOwnedBusinesses',
    value: function deleteOwnedBusinesses(params) {
      return get$1(Business.prototype.__proto__ || Object.getPrototypeOf(Business.prototype), 'deleteEdge', this).call(this, '/owned_businesses', params);
    }
  }, {
    key: 'getOwnedBusinesses',
    value: function getOwnedBusinesses(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Business, fields, params, fetchFirstPage, '/owned_businesses');
    }
  }, {
    key: 'createOwnedBusiness',
    value: function createOwnedBusiness(fields, params) {
      return this.createEdge('/owned_businesses', fields, params, Business);
    }
  }, {
    key: 'createOwnedDomain',
    value: function createOwnedDomain(fields, params) {
      return this.createEdge('/owned_domains', fields, params, OwnedDomain);
    }
  }, {
    key: 'getOwnedInstagramAccounts',
    value: function getOwnedInstagramAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/owned_instagram_accounts');
    }
  }, {
    key: 'getOwnedPages',
    value: function getOwnedPages(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Page, fields, params, fetchFirstPage, '/owned_pages');
    }
  }, {
    key: 'createOwnedPage',
    value: function createOwnedPage(fields, params) {
      return this.createEdge('/owned_pages', fields, params, Page);
    }
  }, {
    key: 'getOwnedPixels',
    value: function getOwnedPixels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsPixel, fields, params, fetchFirstPage, '/owned_pixels');
    }
  }, {
    key: 'getOwnedProductCatalogs',
    value: function getOwnedProductCatalogs(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductCatalog, fields, params, fetchFirstPage, '/owned_product_catalogs');
    }
  }, {
    key: 'createOwnedProductCatalog',
    value: function createOwnedProductCatalog(fields, params) {
      return this.createEdge('/owned_product_catalogs', fields, params, ProductCatalog);
    }
  }, {
    key: 'deletePages',
    value: function deletePages(params) {
      return get$1(Business.prototype.__proto__ || Object.getPrototypeOf(Business.prototype), 'deleteEdge', this).call(this, '/pages', params);
    }
  }, {
    key: 'getPartners',
    value: function getPartners(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Business, fields, params, fetchFirstPage, '/partners');
    }
  }, {
    key: 'getPendingClientAdAccounts',
    value: function getPendingClientAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessAdAccountRequest, fields, params, fetchFirstPage, '/pending_client_ad_accounts');
    }
  }, {
    key: 'getPendingClientApps',
    value: function getPendingClientApps(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessApplicationRequest, fields, params, fetchFirstPage, '/pending_client_apps');
    }
  }, {
    key: 'getPendingClientPages',
    value: function getPendingClientPages(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessPageRequest, fields, params, fetchFirstPage, '/pending_client_pages');
    }
  }, {
    key: 'getPendingOwnedAdAccounts',
    value: function getPendingOwnedAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(LegacyBusinessAdAccountRequest, fields, params, fetchFirstPage, '/pending_owned_ad_accounts');
    }
  }, {
    key: 'getPendingOwnedPages',
    value: function getPendingOwnedPages(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessPageRequest, fields, params, fetchFirstPage, '/pending_owned_pages');
    }
  }, {
    key: 'getPendingUsers',
    value: function getPendingUsers(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessRoleRequest, fields, params, fetchFirstPage, '/pending_users');
    }
  }, {
    key: 'getPicture',
    value: function getPicture(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProfilePictureSource, fields, params, fetchFirstPage, '/picture');
    }
  }, {
    key: 'getReceivedAudiencePermissions',
    value: function getReceivedAudiencePermissions(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AudiencePermission, fields, params, fetchFirstPage, '/received_audience_permissions');
    }
  }, {
    key: 'getSharedAudiencePermissions',
    value: function getSharedAudiencePermissions(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AudiencePermission, fields, params, fetchFirstPage, '/shared_audience_permissions');
    }
  }, {
    key: 'getSystemUsers',
    value: function getSystemUsers(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(SystemUser, fields, params, fetchFirstPage, '/system_users');
    }
  }, {
    key: 'createSystemUser',
    value: function createSystemUser(fields, params) {
      return this.createEdge('/systemusers', fields, params, SystemUser);
    }
  }, {
    key: 'deleteUserInvitations',
    value: function deleteUserInvitations(params) {
      return get$1(Business.prototype.__proto__ || Object.getPrototypeOf(Business.prototype), 'deleteEdge', this).call(this, '/user_invitations', params);
    }
  }, {
    key: 'getUserInvitations',
    value: function getUserInvitations(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessRoleRequest, fields, params, fetchFirstPage, '/user_invitations');
    }
  }, {
    key: 'deleteUserPermissions',
    value: function deleteUserPermissions(params) {
      return get$1(Business.prototype.__proto__ || Object.getPrototypeOf(Business.prototype), 'deleteEdge', this).call(this, '/userpermissions', params);
    }
  }, {
    key: 'createUserPermission',
    value: function createUserPermission(fields, params) {
      return this.createEdge('/userpermissions', fields, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        created_by: 'created_by',
        created_time: 'created_time',
        id: 'id',
        link: 'link',
        name: 'name',
        payment_account_id: 'payment_account_id',
        primary_page: 'primary_page',
        profile_picture_uri: 'profile_picture_uri',
        timezone_id: 'timezone_id',
        two_factor_type: 'two_factor_type',
        updated_by: 'updated_by',
        updated_time: 'updated_time',
        vertical: 'vertical'
      });
    }
  }, {
    key: 'Role',
    get: function get() {
      return Object.freeze({
        finance_editor: 'FINANCE_EDITOR',
        finance_analyst: 'FINANCE_ANALYST',
        ads_rights_reviewer: 'ADS_RIGHTS_REVIEWER',
        admin: 'ADMIN',
        employee: 'EMPLOYEE',
        fb_employee_sales_rep: 'FB_EMPLOYEE_SALES_REP'
      });
    }
  }, {
    key: 'PagePermittedRoles',
    get: function get() {
      return Object.freeze({
        manager: 'MANAGER',
        content_creator: 'CONTENT_CREATOR',
        moderator: 'MODERATOR',
        advertiser: 'ADVERTISER',
        insights_analyst: 'INSIGHTS_ANALYST'
      });
    }
  }, {
    key: 'SurveyBusinessType',
    get: function get() {
      return Object.freeze({
        agency: 'AGENCY',
        advertiser: 'ADVERTISER',
        app_developer: 'APP_DEVELOPER',
        publisher: 'PUBLISHER'
      });
    }
  }, {
    key: 'Vertical',
    get: function get() {
      return Object.freeze({
        advertising: 'ADVERTISING',
        automotive: 'AUTOMOTIVE',
        consumer_packaged_goods: 'CONSUMER_PACKAGED_GOODS',
        ecommerce: 'ECOMMERCE',
        education: 'EDUCATION',
        energy_and_utilities: 'ENERGY_AND_UTILITIES',
        entertainment_and_media: 'ENTERTAINMENT_AND_MEDIA',
        financial_services: 'FINANCIAL_SERVICES',
        gaming: 'GAMING',
        government_and_politics: 'GOVERNMENT_AND_POLITICS',
        marketing: 'MARKETING',
        organizations_and_associations: 'ORGANIZATIONS_AND_ASSOCIATIONS',
        professional_services: 'PROFESSIONAL_SERVICES',
        retail: 'RETAIL',
        technology: 'TECHNOLOGY',
        telecom: 'TELECOM',
        travel: 'TRAVEL',
        non_profit: 'NON_PROFIT',
        restaurant: 'RESTAURANT',
        health: 'HEALTH',
        luxury: 'LUXURY',
        other: 'OTHER'
      });
    }
  }, {
    key: 'PermittedRoles',
    get: function get() {
      return Object.freeze({
        admin: 'ADMIN',
        uploader: 'UPLOADER',
        advertiser: 'ADVERTISER'
      });
    }
  }]);
  return Business;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductSet
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductSet = function (_AbstractCrudObject) {
  inherits(ProductSet, _AbstractCrudObject);

  function ProductSet() {
    classCallCheck(this, ProductSet);
    return possibleConstructorReturn(this, (ProductSet.__proto__ || Object.getPrototypeOf(ProductSet)).apply(this, arguments));
  }

  createClass(ProductSet, [{
    key: 'getProducts',
    value: function getProducts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductItem, fields, params, fetchFirstPage, '/products');
    }
  }, {
    key: 'getVehicles',
    value: function getVehicles(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/vehicles');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(ProductSet.prototype.__proto__ || Object.getPrototypeOf(ProductSet.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(ProductSet.prototype.__proto__ || Object.getPrototypeOf(ProductSet.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        auto_creation_url: 'auto_creation_url',
        filter: 'filter',
        id: 'id',
        name: 'name',
        product_catalog: 'product_catalog',
        product_count: 'product_count'
      });
    }
  }]);
  return ProductSet;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductItem
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductItem = function (_AbstractCrudObject) {
  inherits(ProductItem, _AbstractCrudObject);

  function ProductItem() {
    classCallCheck(this, ProductItem);
    return possibleConstructorReturn(this, (ProductItem.__proto__ || Object.getPrototypeOf(ProductItem)).apply(this, arguments));
  }

  createClass(ProductItem, [{
    key: 'getProductSets',
    value: function getProductSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductSet, fields, params, fetchFirstPage, '/product_sets');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(ProductItem.prototype.__proto__ || Object.getPrototypeOf(ProductItem.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(ProductItem.prototype.__proto__ || Object.getPrototypeOf(ProductItem.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        additional_image_urls: 'additional_image_urls',
        additional_variant_attributes: 'additional_variant_attributes',
        age_group: 'age_group',
        applinks: 'applinks',
        availability: 'availability',
        brand: 'brand',
        category: 'category',
        color: 'color',
        commerce_insights: 'commerce_insights',
        condition: 'condition',
        currency: 'currency',
        custom_data: 'custom_data',
        custom_label_0: 'custom_label_0',
        custom_label_1: 'custom_label_1',
        custom_label_2: 'custom_label_2',
        custom_label_3: 'custom_label_3',
        custom_label_4: 'custom_label_4',
        description: 'description',
        expiration_date: 'expiration_date',
        gender: 'gender',
        gtin: 'gtin',
        id: 'id',
        image_url: 'image_url',
        inventory: 'inventory',
        manufacturer_part_number: 'manufacturer_part_number',
        material: 'material',
        name: 'name',
        ordering_index: 'ordering_index',
        pattern: 'pattern',
        price: 'price',
        product_catalog: 'product_catalog',
        product_feed: 'product_feed',
        product_group: 'product_group',
        product_type: 'product_type',
        retailer_id: 'retailer_id',
        retailer_product_group_id: 'retailer_product_group_id',
        review_rejection_reasons: 'review_rejection_reasons',
        review_status: 'review_status',
        sale_price: 'sale_price',
        sale_price_end_date: 'sale_price_end_date',
        sale_price_start_date: 'sale_price_start_date',
        shipping_weight_unit: 'shipping_weight_unit',
        shipping_weight_value: 'shipping_weight_value',
        short_description: 'short_description',
        size: 'size',
        start_date: 'start_date',
        url: 'url',
        visibility: 'visibility'
      });
    }
  }, {
    key: 'AgeGroup',
    get: function get() {
      return Object.freeze({
        adult: 'adult',
        infant: 'infant',
        kids: 'kids',
        newborn: 'newborn',
        toddler: 'toddler'
      });
    }
  }, {
    key: 'Availability',
    get: function get() {
      return Object.freeze({
        in_stock: 'in stock',
        out_of_stock: 'out of stock',
        preorder: 'preorder',
        available_for_order: 'available for order',
        discontinued: 'discontinued',
        pending: 'pending'
      });
    }
  }, {
    key: 'Condition',
    get: function get() {
      return Object.freeze({
        new: 'new',
        refurbished: 'refurbished',
        used: 'used',
        cpo: 'cpo'
      });
    }
  }, {
    key: 'Gender',
    get: function get() {
      return Object.freeze({
        female: 'female',
        male: 'male',
        unisex: 'unisex'
      });
    }
  }, {
    key: 'ReviewStatus',
    get: function get() {
      return Object.freeze({
        pending: 'pending',
        rejected: 'rejected',
        approved: 'approved',
        outdated: 'outdated'
      });
    }
  }, {
    key: 'ShippingWeightUnit',
    get: function get() {
      return Object.freeze({
        g: 'g',
        kg: 'kg',
        oz: 'oz',
        lb: 'lb'
      });
    }
  }, {
    key: 'Visibility',
    get: function get() {
      return Object.freeze({
        staging: 'staging',
        published: 'published'
      });
    }
  }]);
  return ProductItem;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CheckBatchRequestStatus
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CheckBatchRequestStatus = function (_AbstractCrudObject) {
  inherits(CheckBatchRequestStatus, _AbstractCrudObject);

  function CheckBatchRequestStatus() {
    classCallCheck(this, CheckBatchRequestStatus);
    return possibleConstructorReturn(this, (CheckBatchRequestStatus.__proto__ || Object.getPrototypeOf(CheckBatchRequestStatus)).apply(this, arguments));
  }

  createClass(CheckBatchRequestStatus, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        errors: 'errors',
        errors_total_count: 'errors_total_count',
        handle: 'handle',
        status: 'status'
      });
    }
  }]);
  return CheckBatchRequestStatus;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductDaEventSamplesBatch
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductDaEventSamplesBatch = function (_AbstractCrudObject) {
  inherits(ProductDaEventSamplesBatch, _AbstractCrudObject);

  function ProductDaEventSamplesBatch() {
    classCallCheck(this, ProductDaEventSamplesBatch);
    return possibleConstructorReturn(this, (ProductDaEventSamplesBatch.__proto__ || Object.getPrototypeOf(ProductDaEventSamplesBatch)).apply(this, arguments));
  }

  createClass(ProductDaEventSamplesBatch, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        samples: 'samples',
        time_start: 'time_start',
        time_stop: 'time_stop'
      });
    }
  }, {
    key: 'AggregationType',
    get: function get() {
      return Object.freeze({
        content_id: 'CONTENT_ID',
        content_url: 'CONTENT_URL'
      });
    }
  }, {
    key: 'Event',
    get: function get() {
      return Object.freeze({
        viewcontent: 'ViewContent',
        addtocart: 'AddToCart',
        purchase: 'Purchase',
        initiatecheckout: 'InitiateCheckout',
        search: 'Search',
        lead: 'Lead',
        addtowishlist: 'AddToWishlist'
      });
    }
  }]);
  return ProductDaEventSamplesBatch;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductEventStat
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductEventStat = function (_AbstractCrudObject) {
  inherits(ProductEventStat, _AbstractCrudObject);

  function ProductEventStat() {
    classCallCheck(this, ProductEventStat);
    return possibleConstructorReturn(this, (ProductEventStat.__proto__ || Object.getPrototypeOf(ProductEventStat)).apply(this, arguments));
  }

  createClass(ProductEventStat, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        date_start: 'date_start',
        date_stop: 'date_stop',
        device_type: 'device_type',
        event: 'event',
        event_source: 'event_source',
        total_content_ids_matched_other_catalogs: 'total_content_ids_matched_other_catalogs',
        total_matched_content_ids: 'total_matched_content_ids',
        total_unmatched_content_ids: 'total_unmatched_content_ids',
        unique_content_ids_matched_other_catalogs: 'unique_content_ids_matched_other_catalogs',
        unique_matched_content_ids: 'unique_matched_content_ids',
        unique_unmatched_content_ids: 'unique_unmatched_content_ids'
      });
    }
  }, {
    key: 'DeviceType',
    get: function get() {
      return Object.freeze({
        desktop: 'desktop',
        mobile_android_phone: 'mobile_android_phone',
        mobile_android_tablet: 'mobile_android_tablet',
        mobile_ipad: 'mobile_ipad',
        mobile_iphone: 'mobile_iphone',
        mobile_ipod: 'mobile_ipod',
        mobile_phone: 'mobile_phone',
        mobile_tablet: 'mobile_tablet',
        mobile_windows_phone: 'mobile_windows_phone',
        unknown: 'unknown'
      });
    }
  }, {
    key: 'Event',
    get: function get() {
      return Object.freeze({
        viewcontent: 'ViewContent',
        addtocart: 'AddToCart',
        purchase: 'Purchase',
        initiatecheckout: 'InitiateCheckout',
        search: 'Search',
        lead: 'Lead',
        addtowishlist: 'AddToWishlist'
      });
    }
  }, {
    key: 'Breakdowns',
    get: function get() {
      return Object.freeze({
        device_type: 'DEVICE_TYPE'
      });
    }
  }]);
  return ProductEventStat;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ExternalEventSource
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ExternalEventSource = function (_AbstractCrudObject) {
  inherits(ExternalEventSource, _AbstractCrudObject);

  function ExternalEventSource() {
    classCallCheck(this, ExternalEventSource);
    return possibleConstructorReturn(this, (ExternalEventSource.__proto__ || Object.getPrototypeOf(ExternalEventSource)).apply(this, arguments));
  }

  createClass(ExternalEventSource, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        name: 'name',
        source_type: 'source_type'
      });
    }
  }]);
  return ExternalEventSource;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductCatalogHotelRoomsBatch
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductCatalogHotelRoomsBatch = function (_AbstractCrudObject) {
  inherits(ProductCatalogHotelRoomsBatch, _AbstractCrudObject);

  function ProductCatalogHotelRoomsBatch() {
    classCallCheck(this, ProductCatalogHotelRoomsBatch);
    return possibleConstructorReturn(this, (ProductCatalogHotelRoomsBatch.__proto__ || Object.getPrototypeOf(ProductCatalogHotelRoomsBatch)).apply(this, arguments));
  }

  createClass(ProductCatalogHotelRoomsBatch, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        errors: 'errors',
        errors_total_count: 'errors_total_count',
        handle: 'handle',
        status: 'status'
      });
    }
  }, {
    key: 'Standard',
    get: function get() {
      return Object.freeze({
        google: 'google'
      });
    }
  }]);
  return ProductCatalogHotelRoomsBatch;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductCatalogPricingVariablesBatch
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductCatalogPricingVariablesBatch = function (_AbstractCrudObject) {
  inherits(ProductCatalogPricingVariablesBatch, _AbstractCrudObject);

  function ProductCatalogPricingVariablesBatch() {
    classCallCheck(this, ProductCatalogPricingVariablesBatch);
    return possibleConstructorReturn(this, (ProductCatalogPricingVariablesBatch.__proto__ || Object.getPrototypeOf(ProductCatalogPricingVariablesBatch)).apply(this, arguments));
  }

  createClass(ProductCatalogPricingVariablesBatch, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        errors: 'errors',
        errors_total_count: 'errors_total_count',
        handle: 'handle',
        status: 'status'
      });
    }
  }, {
    key: 'Standard',
    get: function get() {
      return Object.freeze({
        google: 'google'
      });
    }
  }]);
  return ProductCatalogPricingVariablesBatch;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductFeedUploadError
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductFeedUploadError = function (_AbstractCrudObject) {
  inherits(ProductFeedUploadError, _AbstractCrudObject);

  function ProductFeedUploadError() {
    classCallCheck(this, ProductFeedUploadError);
    return possibleConstructorReturn(this, (ProductFeedUploadError.__proto__ || Object.getPrototypeOf(ProductFeedUploadError)).apply(this, arguments));
  }

  createClass(ProductFeedUploadError, [{
    key: 'getSamples',
    value: function getSamples(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/samples');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        description: 'description',
        error_type: 'error_type',
        id: 'id',
        severity: 'severity',
        summary: 'summary',
        total_count: 'total_count'
      });
    }
  }, {
    key: 'Severity',
    get: function get() {
      return Object.freeze({
        fatal: 'fatal',
        warning: 'warning'
      });
    }
  }]);
  return ProductFeedUploadError;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductFeedUpload
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductFeedUpload = function (_AbstractCrudObject) {
  inherits(ProductFeedUpload, _AbstractCrudObject);

  function ProductFeedUpload() {
    classCallCheck(this, ProductFeedUpload);
    return possibleConstructorReturn(this, (ProductFeedUpload.__proto__ || Object.getPrototypeOf(ProductFeedUpload)).apply(this, arguments));
  }

  createClass(ProductFeedUpload, [{
    key: 'getErrors',
    value: function getErrors(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductFeedUploadError, fields, params, fetchFirstPage, '/errors');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        end_time: 'end_time',
        error_count: 'error_count',
        filename: 'filename',
        id: 'id',
        input_method: 'input_method',
        num_deleted_items: 'num_deleted_items',
        num_detected_items: 'num_detected_items',
        num_invalid_items: 'num_invalid_items',
        num_persisted_items: 'num_persisted_items',
        start_time: 'start_time',
        url: 'url',
        warning_count: 'warning_count'
      });
    }
  }, {
    key: 'InputMethod',
    get: function get() {
      return Object.freeze({
        manual_upload: 'Manual Upload',
        server_fetch: 'Server Fetch',
        reupload_last_file: 'Reupload Last File',
        user_initiated_server_fetch: 'User initiated server fetch'
      });
    }
  }]);
  return ProductFeedUpload;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductFeed
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductFeed = function (_AbstractCrudObject) {
  inherits(ProductFeed, _AbstractCrudObject);

  function ProductFeed() {
    classCallCheck(this, ProductFeed);
    return possibleConstructorReturn(this, (ProductFeed.__proto__ || Object.getPrototypeOf(ProductFeed)).apply(this, arguments));
  }

  createClass(ProductFeed, [{
    key: 'getProducts',
    value: function getProducts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductItem, fields, params, fetchFirstPage, '/products');
    }
  }, {
    key: 'createRule',
    value: function createRule(fields, params) {
      return this.createEdge('/rules', fields, params);
    }
  }, {
    key: 'getUploads',
    value: function getUploads(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductFeedUpload, fields, params, fetchFirstPage, '/uploads');
    }
  }, {
    key: 'createUpload',
    value: function createUpload(fields, params) {
      return this.createEdge('/uploads', fields, params, ProductFeedUpload);
    }
  }, {
    key: 'getVehicles',
    value: function getVehicles(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/vehicles');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(ProductFeed.prototype.__proto__ || Object.getPrototypeOf(ProductFeed.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(ProductFeed.prototype.__proto__ || Object.getPrototypeOf(ProductFeed.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        created_time: 'created_time',
        default_currency: 'default_currency',
        deletion_enabled: 'deletion_enabled',
        delimiter: 'delimiter',
        encoding: 'encoding',
        file_name: 'file_name',
        id: 'id',
        latest_upload: 'latest_upload',
        name: 'name',
        product_count: 'product_count',
        qualified_product_count: 'qualified_product_count',
        quoted_fields_mode: 'quoted_fields_mode',
        schedule: 'schedule',
        update_schedule: 'update_schedule'
      });
    }
  }, {
    key: 'Delimiter',
    get: function get() {
      return Object.freeze({
        autodetect: 'AUTODETECT',
        bar: 'BAR',
        comma: 'COMMA',
        tab: 'TAB',
        tilde: 'TILDE',
        semicolon: 'SEMICOLON'
      });
    }
  }, {
    key: 'QuotedFieldsMode',
    get: function get() {
      return Object.freeze({
        autodetect: 'AUTODETECT',
        on: 'ON',
        off: 'OFF'
      });
    }
  }, {
    key: 'Encoding',
    get: function get() {
      return Object.freeze({
        autodetect: 'AUTODETECT',
        latin1: 'LATIN1',
        utf8: 'UTF8',
        utf16le: 'UTF16LE',
        utf16be: 'UTF16BE',
        utf32le: 'UTF32LE',
        utf32be: 'UTF32BE'
      });
    }
  }, {
    key: 'FeedType',
    get: function get() {
      return Object.freeze({
        auto: 'AUTO',
        auto_offer: 'AUTO_OFFER',
        destination: 'DESTINATION',
        flight: 'FLIGHT',
        home_listing: 'HOME_LISTING',
        home_service_provider: 'HOME_SERVICE_PROVIDER',
        home_service_review: 'HOME_SERVICE_REVIEW',
        hotel: 'HOTEL',
        hotel_room: 'HOTEL_ROOM',
        local_inventory: 'LOCAL_INVENTORY',
        market: 'MARKET',
        media_title: 'MEDIA_TITLE',
        products: 'PRODUCTS',
        test_dynamic_item: 'TEST_DYNAMIC_ITEM',
        vehicle_offer: 'VEHICLE_OFFER',
        vehicles: 'VEHICLES'
      });
    }
  }]);
  return ProductFeed;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductGroup
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductGroup = function (_AbstractCrudObject) {
  inherits(ProductGroup, _AbstractCrudObject);

  function ProductGroup() {
    classCallCheck(this, ProductGroup);
    return possibleConstructorReturn(this, (ProductGroup.__proto__ || Object.getPrototypeOf(ProductGroup)).apply(this, arguments));
  }

  createClass(ProductGroup, [{
    key: 'getProducts',
    value: function getProducts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductItem, fields, params, fetchFirstPage, '/products');
    }
  }, {
    key: 'createProduct',
    value: function createProduct(fields, params) {
      return this.createEdge('/products', fields, params, ProductItem);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(ProductGroup.prototype.__proto__ || Object.getPrototypeOf(ProductGroup.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(ProductGroup.prototype.__proto__ || Object.getPrototypeOf(ProductGroup.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        product_catalog: 'product_catalog',
        retailer_id: 'retailer_id',
        variants: 'variants'
      });
    }
  }]);
  return ProductGroup;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductCatalogProductSetsBatch
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductCatalogProductSetsBatch = function (_AbstractCrudObject) {
  inherits(ProductCatalogProductSetsBatch, _AbstractCrudObject);

  function ProductCatalogProductSetsBatch() {
    classCallCheck(this, ProductCatalogProductSetsBatch);
    return possibleConstructorReturn(this, (ProductCatalogProductSetsBatch.__proto__ || Object.getPrototypeOf(ProductCatalogProductSetsBatch)).apply(this, arguments));
  }

  createClass(ProductCatalogProductSetsBatch, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        errors: 'errors',
        errors_total_count: 'errors_total_count',
        handle: 'handle',
        status: 'status'
      });
    }
  }]);
  return ProductCatalogProductSetsBatch;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductsQualityIssue
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductsQualityIssue = function (_AbstractCrudObject) {
  inherits(ProductsQualityIssue, _AbstractCrudObject);

  function ProductsQualityIssue() {
    classCallCheck(this, ProductsQualityIssue);
    return possibleConstructorReturn(this, (ProductsQualityIssue.__proto__ || Object.getPrototypeOf(ProductsQualityIssue)).apply(this, arguments));
  }

  createClass(ProductsQualityIssue, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        count: 'count',
        description: 'description',
        issue_type: 'issue_type',
        property_names: 'property_names',
        samples: 'samples',
        summary: 'summary'
      });
    }
  }]);
  return ProductsQualityIssue;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductCatalog
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductCatalog = function (_AbstractCrudObject) {
  inherits(ProductCatalog, _AbstractCrudObject);

  function ProductCatalog() {
    classCallCheck(this, ProductCatalog);
    return possibleConstructorReturn(this, (ProductCatalog.__proto__ || Object.getPrototypeOf(ProductCatalog)).apply(this, arguments));
  }

  createClass(ProductCatalog, [{
    key: 'getAgencies',
    value: function getAgencies(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Business, fields, params, fetchFirstPage, '/agencies');
    }
  }, {
    key: 'createBatch',
    value: function createBatch(fields, params) {
      return this.createEdge('/batch', fields, params, ProductItem);
    }
  }, {
    key: 'getCheckBatchRequestStatus',
    value: function getCheckBatchRequestStatus(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(CheckBatchRequestStatus, fields, params, fetchFirstPage, '/check_batch_request_status');
    }
  }, {
    key: 'getDaEventSamples',
    value: function getDaEventSamples(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductDaEventSamplesBatch, fields, params, fetchFirstPage, '/da_event_samples');
    }
  }, {
    key: 'getDestinations',
    value: function getDestinations(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/destinations');
    }
  }, {
    key: 'getEventStats',
    value: function getEventStats(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductEventStat, fields, params, fetchFirstPage, '/event_stats');
    }
  }, {
    key: 'deleteExternalEventSources',
    value: function deleteExternalEventSources(params) {
      return get$1(ProductCatalog.prototype.__proto__ || Object.getPrototypeOf(ProductCatalog.prototype), 'deleteEdge', this).call(this, '/external_event_sources', params);
    }
  }, {
    key: 'getExternalEventSources',
    value: function getExternalEventSources(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ExternalEventSource, fields, params, fetchFirstPage, '/external_event_sources');
    }
  }, {
    key: 'createExternalEventSource',
    value: function createExternalEventSource(fields, params) {
      return this.createEdge('/external_event_sources', fields, params, ExternalEventSource);
    }
  }, {
    key: 'getFlights',
    value: function getFlights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/flights');
    }
  }, {
    key: 'getHomeListings',
    value: function getHomeListings(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/home_listings');
    }
  }, {
    key: 'createHomeListing',
    value: function createHomeListing(fields, params) {
      return this.createEdge('/home_listings', fields, params);
    }
  }, {
    key: 'getHotelRoomsBatch',
    value: function getHotelRoomsBatch(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductCatalogHotelRoomsBatch, fields, params, fetchFirstPage, '/hotel_rooms_batch');
    }
  }, {
    key: 'createHotelRoomsBatch',
    value: function createHotelRoomsBatch(fields, params) {
      return this.createEdge('/hotel_rooms_batch', fields, params, ProductCatalogHotelRoomsBatch);
    }
  }, {
    key: 'getHotels',
    value: function getHotels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/hotels');
    }
  }, {
    key: 'createHotel',
    value: function createHotel(fields, params) {
      return this.createEdge('/hotels', fields, params);
    }
  }, {
    key: 'getPricingVariablesBatch',
    value: function getPricingVariablesBatch(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductCatalogPricingVariablesBatch, fields, params, fetchFirstPage, '/pricing_variables_batch');
    }
  }, {
    key: 'createPricingVariablesBatch',
    value: function createPricingVariablesBatch(fields, params) {
      return this.createEdge('/pricing_variables_batch', fields, params, ProductCatalogPricingVariablesBatch);
    }
  }, {
    key: 'getProductFeeds',
    value: function getProductFeeds(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductFeed, fields, params, fetchFirstPage, '/product_feeds');
    }
  }, {
    key: 'createProductFeed',
    value: function createProductFeed(fields, params) {
      return this.createEdge('/product_feeds', fields, params, ProductFeed);
    }
  }, {
    key: 'getProductGroups',
    value: function getProductGroups(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductGroup, fields, params, fetchFirstPage, '/product_groups');
    }
  }, {
    key: 'createProductGroup',
    value: function createProductGroup(fields, params) {
      return this.createEdge('/product_groups', fields, params, ProductGroup);
    }
  }, {
    key: 'getProductSets',
    value: function getProductSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductSet, fields, params, fetchFirstPage, '/product_sets');
    }
  }, {
    key: 'createProductSet',
    value: function createProductSet(fields, params) {
      return this.createEdge('/product_sets', fields, params, ProductSet);
    }
  }, {
    key: 'getProductSetsBatch',
    value: function getProductSetsBatch(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductCatalogProductSetsBatch, fields, params, fetchFirstPage, '/product_sets_batch');
    }
  }, {
    key: 'getProducts',
    value: function getProducts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductItem, fields, params, fetchFirstPage, '/products');
    }
  }, {
    key: 'createProduct',
    value: function createProduct(fields, params) {
      return this.createEdge('/products', fields, params, ProductItem);
    }
  }, {
    key: 'getQualityIssues',
    value: function getQualityIssues(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductsQualityIssue, fields, params, fetchFirstPage, '/quality_issues');
    }
  }, {
    key: 'getVehicles',
    value: function getVehicles(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/vehicles');
    }
  }, {
    key: 'createVideo',
    value: function createVideo(fields, params) {
      return this.createEdge('/videos', fields, params);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(ProductCatalog.prototype.__proto__ || Object.getPrototypeOf(ProductCatalog.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(ProductCatalog.prototype.__proto__ || Object.getPrototypeOf(ProductCatalog.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        business: 'business',
        da_display_settings: 'da_display_settings',
        default_image_url: 'default_image_url',
        fallback_image_url: 'fallback_image_url',
        feed_count: 'feed_count',
        flight_catalog_settings: 'flight_catalog_settings',
        id: 'id',
        name: 'name',
        product_count: 'product_count',
        qualified_product_count: 'qualified_product_count',
        vertical: 'vertical'
      });
    }
  }, {
    key: 'Vertical',
    get: function get() {
      return Object.freeze({
        commerce: 'commerce',
        destinations: 'destinations',
        flights: 'flights',
        home_listings: 'home_listings',
        home_service_providers: 'home_service_providers',
        hotels: 'hotels',
        vehicles: 'vehicles'
      });
    }
  }]);
  return ProductCatalog;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageSavedFilter
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageSavedFilter = function (_AbstractCrudObject) {
  inherits(PageSavedFilter, _AbstractCrudObject);

  function PageSavedFilter() {
    classCallCheck(this, PageSavedFilter);
    return possibleConstructorReturn(this, (PageSavedFilter.__proto__ || Object.getPrototypeOf(PageSavedFilter)).apply(this, arguments));
  }

  createClass(PageSavedFilter, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        display_name: 'display_name',
        filters: 'filters',
        id: 'id',
        page_id: 'page_id',
        section: 'section',
        time_created: 'time_created',
        time_updated: 'time_updated'
      });
    }
  }, {
    key: 'Section',
    get: function get() {
      return Object.freeze({
        audience_alerts: 'AUDIENCE_ALERTS',
        chex_pending_orders: 'CHEX_PENDING_ORDERS',
        chex_completed_orders: 'CHEX_COMPLETED_ORDERS',
        commerce_platform_settings: 'COMMERCE_PLATFORM_SETTINGS',
        commerce_products: 'COMMERCE_PRODUCTS',
        commerce_collections: 'COMMERCE_COLLECTIONS',
        commerce_pending_orders: 'COMMERCE_PENDING_ORDERS',
        commerce_past_orders: 'COMMERCE_PAST_ORDERS',
        commerce_discount_codes: 'COMMERCE_DISCOUNT_CODES',
        commerce_merchant_settings: 'COMMERCE_MERCHANT_SETTINGS',
        commerce_shop_link: 'COMMERCE_SHOP_LINK',
        donations_settings: 'DONATIONS_SETTINGS',
        drafts: 'DRAFTS',
        reward_program: 'REWARD_PROGRAM',
        expired_posts: 'EXPIRED_POSTS',
        expiring_posts: 'EXPIRING_POSTS',
        instant_articles: 'INSTANT_ARTICLES',
        instant_articles_development: 'INSTANT_ARTICLES_DEVELOPMENT',
        instant_articles_monetization: 'INSTANT_ARTICLES_MONETIZATION',
        instant_articles_sample: 'INSTANT_ARTICLES_SAMPLE',
        instant_articles_settings: 'INSTANT_ARTICLES_SETTINGS',
        instant_articles_sign_up: 'INSTANT_ARTICLES_SIGN_UP',
        instant_articles_cta_management: 'INSTANT_ARTICLES_CTA_MANAGEMENT',
        instant_articles_traffic_lift: 'INSTANT_ARTICLES_TRAFFIC_LIFT',
        invoices_active: 'INVOICES_ACTIVE',
        invoices_history: 'INVOICES_HISTORY',
        lead_ads_draft_forms: 'LEAD_ADS_DRAFT_FORMS',
        lead_ads_forms: 'LEAD_ADS_FORMS',
        lead_ads_crm_setup: 'LEAD_ADS_CRM_SETUP',
        published_posts: 'PUBLISHED_POSTS',
        scheduled_posts: 'SCHEDULED_POSTS',
        ads_posts: 'ADS_POSTS',
        videos: 'VIDEOS',
        job_posts: 'JOB_POSTS',
        new_matches: 'NEW_MATCHES',
        videos_copyright: 'VIDEOS_COPYRIGHT',
        reported: 'REPORTED',
        playlists: 'PLAYLISTS',
        playlist_details: 'PLAYLIST_DETAILS',
        posts_config: 'POSTS_CONFIG',
        seasons: 'SEASONS',
        season_details: 'SEASON_DETAILS',
        takedowns: 'TAKEDOWNS',
        unsent_reports: 'UNSENT_REPORTS',
        allowed: 'ALLOWED',
        tracked: 'TRACKED',
        blocked: 'BLOCKED',
        claimed: 'CLAIMED',
        manual_review: 'MANUAL_REVIEW',
        match_rules: 'MATCH_RULES',
        disputes: 'DISPUTES',
        active_fundraisers: 'ACTIVE_FUNDRAISERS',
        draft_fundraisers: 'DRAFT_FUNDRAISERS',
        ready_fundraisers: 'READY_FUNDRAISERS',
        ended_fundraisers: 'ENDED_FUNDRAISERS',
        ads_canvas: 'ADS_CANVAS',
        reference_files: 'REFERENCE_FILES',
        all_reference_files: 'ALL_REFERENCE_FILES',
        reference_conflicts: 'REFERENCE_CONFLICTS',
        reference_possible_conflicts: 'REFERENCE_POSSIBLE_CONFLICTS',
        reference_resolutions: 'REFERENCE_RESOLUTIONS',
        sound_recordings: 'SOUND_RECORDINGS',
        live_broadcasts: 'LIVE_BROADCASTS',
        crossposted_videos: 'CROSSPOSTED_VIDEOS',
        published_profile_picture_frames: 'PUBLISHED_PROFILE_PICTURE_FRAMES',
        pending_profile_picture_frames: 'PENDING_PROFILE_PICTURE_FRAMES',
        tarot_composer: 'TAROT_COMPOSER',
        draft_editions: 'DRAFT_EDITIONS',
        published_editions: 'PUBLISHED_EDITIONS',
        published_events: 'PUBLISHED_EVENTS',
        draft_events: 'DRAFT_EVENTS',
        scheduled_events: 'SCHEDULED_EVENTS',
        archived_events: 'ARCHIVED_EVENTS',
        tours: 'TOURS',
        polls_composer: 'POLLS_COMPOSER',
        brand_asset_library: 'BRAND_ASSET_LIBRARY',
        job_applications: 'JOB_APPLICATIONS',
        subscriptions: 'SUBSCRIPTIONS',
        news_subscriptions_publisher_tools: 'NEWS_SUBSCRIPTIONS_PUBLISHER_TOOLS',
        news_subscriptions_publisher_asset_management: 'NEWS_SUBSCRIPTIONS_PUBLISHER_ASSET_MANAGEMENT',
        qr_code: 'QR_CODE',
        credibility_indicators: 'CREDIBILITY_INDICATORS',
        attributions: 'ATTRIBUTIONS',
        broadcasted_messages: 'BROADCASTED_MESSAGES',
        branded_content: 'BRANDED_CONTENT',
        branded_content_creator: 'BRANDED_CONTENT_CREATOR',
        sounds_collection: 'SOUNDS_COLLECTION',
        content_tests: 'CONTENT_TESTS',
        gem_producer_dashboard: 'GEM_PRODUCER_DASHBOARD',
        monetized_videos: 'MONETIZED_VIDEOS'
      });
    }
  }]);
  return PageSavedFilter;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * SavedMessageResponse
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var SavedMessageResponse = function (_AbstractCrudObject) {
  inherits(SavedMessageResponse, _AbstractCrudObject);

  function SavedMessageResponse() {
    classCallCheck(this, SavedMessageResponse);
    return possibleConstructorReturn(this, (SavedMessageResponse.__proto__ || Object.getPrototypeOf(SavedMessageResponse)).apply(this, arguments));
  }

  createClass(SavedMessageResponse, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(SavedMessageResponse.prototype.__proto__ || Object.getPrototypeOf(SavedMessageResponse.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(SavedMessageResponse.prototype.__proto__ || Object.getPrototypeOf(SavedMessageResponse.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        category: 'category',
        id: 'id',
        image: 'image',
        is_enabled: 'is_enabled',
        message: 'message',
        title: 'title'
      });
    }
  }, {
    key: 'Category',
    get: function get() {
      return Object.freeze({
        standard: 'STANDARD',
        instant_reply: 'INSTANT_REPLY',
        away_message: 'AWAY_MESSAGE',
        welcome_message: 'WELCOME_MESSAGE',
        follow_up: 'FOLLOW_UP',
        messenger_code: 'MESSENGER_CODE',
        referral: 'REFERRAL',
        appointment_reminder: 'APPOINTMENT_REMINDER'
      });
    }
  }]);
  return SavedMessageResponse;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Tab
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Tab = function (_AbstractCrudObject) {
  inherits(Tab, _AbstractCrudObject);

  function Tab() {
    classCallCheck(this, Tab);
    return possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
  }

  createClass(Tab, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        application: 'application',
        custom_image_url: 'custom_image_url',
        custom_name: 'custom_name',
        id: 'id',
        image_url: 'image_url',
        is_non_connection_landing_tab: 'is_non_connection_landing_tab',
        is_permanent: 'is_permanent',
        link: 'link',
        name: 'name',
        position: 'position'
      });
    }
  }]);
  return Tab;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageUpcomingChange
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageUpcomingChange = function (_AbstractCrudObject) {
  inherits(PageUpcomingChange, _AbstractCrudObject);

  function PageUpcomingChange() {
    classCallCheck(this, PageUpcomingChange);
    return possibleConstructorReturn(this, (PageUpcomingChange.__proto__ || Object.getPrototypeOf(PageUpcomingChange)).apply(this, arguments));
  }

  createClass(PageUpcomingChange, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(PageUpcomingChange.prototype.__proto__ || Object.getPrototypeOf(PageUpcomingChange.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        change_type: 'change_type',
        effective_time: 'effective_time',
        id: 'id',
        page: 'page',
        proposal: 'proposal',
        timer_status: 'timer_status'
      });
    }
  }]);
  return PageUpcomingChange;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * VideoCopyrightRule
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var VideoCopyrightRule = function (_AbstractCrudObject) {
  inherits(VideoCopyrightRule, _AbstractCrudObject);

  function VideoCopyrightRule() {
    classCallCheck(this, VideoCopyrightRule);
    return possibleConstructorReturn(this, (VideoCopyrightRule.__proto__ || Object.getPrototypeOf(VideoCopyrightRule)).apply(this, arguments));
  }

  createClass(VideoCopyrightRule, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(VideoCopyrightRule.prototype.__proto__ || Object.getPrototypeOf(VideoCopyrightRule.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        condition_groups: 'condition_groups',
        copyrights: 'copyrights',
        created_date: 'created_date',
        creator: 'creator',
        id: 'id',
        is_in_migration: 'is_in_migration',
        name: 'name'
      });
    }
  }, {
    key: 'Source',
    get: function get() {
      return Object.freeze({
        match_settings_dialog: 'MATCH_SETTINGS_DIALOG',
        rules_selector: 'RULES_SELECTOR',
        rules_tab: 'RULES_TAB'
      });
    }
  }]);
  return VideoCopyrightRule;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * VideoCopyright
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var VideoCopyright = function (_AbstractCrudObject) {
  inherits(VideoCopyright, _AbstractCrudObject);

  function VideoCopyright() {
    classCallCheck(this, VideoCopyright);
    return possibleConstructorReturn(this, (VideoCopyright.__proto__ || Object.getPrototypeOf(VideoCopyright)).apply(this, arguments));
  }

  createClass(VideoCopyright, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(VideoCopyright.prototype.__proto__ || Object.getPrototypeOf(VideoCopyright.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(VideoCopyright.prototype.__proto__ || Object.getPrototypeOf(VideoCopyright.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        content_category: 'content_category',
        copyright_content_id: 'copyright_content_id',
        creator: 'creator',
        id: 'id',
        in_conflict: 'in_conflict',
        monitoring_status: 'monitoring_status',
        monitoring_type: 'monitoring_type',
        ownership_countries: 'ownership_countries',
        reference_file: 'reference_file',
        reference_file_disabled: 'reference_file_disabled',
        reference_file_disabled_by_ops: 'reference_file_disabled_by_ops',
        reference_owner_id: 'reference_owner_id',
        rule_ids: 'rule_ids',
        whitelisted_ids: 'whitelisted_ids'
      });
    }
  }, {
    key: 'ContentCategory',
    get: function get() {
      return Object.freeze({
        episode: 'episode',
        movie: 'movie',
        web: 'web'
      });
    }
  }, {
    key: 'MonitoringType',
    get: function get() {
      return Object.freeze({
        video_and_audio: 'VIDEO_AND_AUDIO',
        video_only: 'VIDEO_ONLY',
        audio_only: 'AUDIO_ONLY'
      });
    }
  }]);
  return VideoCopyright;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * VideoList
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var VideoList = function (_AbstractCrudObject) {
  inherits(VideoList, _AbstractCrudObject);

  function VideoList() {
    classCallCheck(this, VideoList);
    return possibleConstructorReturn(this, (VideoList.__proto__ || Object.getPrototypeOf(VideoList)).apply(this, arguments));
  }

  createClass(VideoList, [{
    key: 'deleteVideos',
    value: function deleteVideos(params) {
      return get$1(VideoList.prototype.__proto__ || Object.getPrototypeOf(VideoList.prototype), 'deleteEdge', this).call(this, '/videos', params);
    }
  }, {
    key: 'createVideo',
    value: function createVideo(fields, params) {
      return this.createEdge('/videos', fields, params, VideoList);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        creation_time: 'creation_time',
        description: 'description',
        id: 'id',
        last_modified: 'last_modified',
        owner: 'owner',
        season_number: 'season_number',
        thumbnail: 'thumbnail',
        title: 'title',
        videos_count: 'videos_count'
      });
    }
  }]);
  return VideoList;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Page
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Page = function (_AbstractCrudObject) {
  inherits(Page, _AbstractCrudObject);

  function Page() {
    classCallCheck(this, Page);
    return possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
  }

  createClass(Page, [{
    key: 'createAdminNote',
    value: function createAdminNote(fields, params) {
      return this.createEdge('/admin_notes', fields, params, PageAdminNote);
    }
  }, {
    key: 'createAlbum',
    value: function createAlbum(fields, params) {
      return this.createEdge('/albums', fields, params, Album);
    }
  }, {
    key: 'deleteAssignedUsers',
    value: function deleteAssignedUsers(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/assigned_users', params);
    }
  }, {
    key: 'getAssignedUsers',
    value: function getAssignedUsers(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AssignedUser, fields, params, fetchFirstPage, '/assigned_users');
    }
  }, {
    key: 'createAssignedUser',
    value: function createAssignedUser(fields, params) {
      return this.createEdge('/assigned_users', fields, params, Page);
    }
  }, {
    key: 'getAudioCopyrights',
    value: function getAudioCopyrights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AudioCopyright, fields, params, fetchFirstPage, '/audio_copyrights');
    }
  }, {
    key: 'getAudioMediaCopyrights',
    value: function getAudioMediaCopyrights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AudioCopyright, fields, params, fetchFirstPage, '/audio_media_copyrights');
    }
  }, {
    key: 'deleteBlocked',
    value: function deleteBlocked(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/blocked', params);
    }
  }, {
    key: 'getBlocked',
    value: function getBlocked(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Profile, fields, params, fetchFirstPage, '/blocked');
    }
  }, {
    key: 'createBlocked',
    value: function createBlocked(fields, params) {
      return this.createEdge('/blocked', fields, params);
    }
  }, {
    key: 'getBusinessActivities',
    value: function getBusinessActivities(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessActivityLogEvent, fields, params, fetchFirstPage, '/business_activities');
    }
  }, {
    key: 'createCallToAction',
    value: function createCallToAction(fields, params) {
      return this.createEdge('/call_to_actions', fields, params, PageCallToAction);
    }
  }, {
    key: 'createCanvasElement',
    value: function createCanvasElement(fields, params) {
      return this.createEdge('/canvas_elements', fields, params, CanvasBodyElement);
    }
  }, {
    key: 'getCanvases',
    value: function getCanvases(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Canvas, fields, params, fetchFirstPage, '/canvases');
    }
  }, {
    key: 'createCanvase',
    value: function createCanvase(fields, params) {
      return this.createEdge('/canvases', fields, params, Canvas);
    }
  }, {
    key: 'getChangeProposals',
    value: function getChangeProposals(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PageChangeProposal, fields, params, fetchFirstPage, '/change_proposals');
    }
  }, {
    key: 'deleteClaimedUrls',
    value: function deleteClaimedUrls(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/claimed_urls', params);
    }
  }, {
    key: 'createClaimedUrl',
    value: function createClaimedUrl(fields, params) {
      return this.createEdge('/claimed_urls', fields, params, URL);
    }
  }, {
    key: 'getConversations',
    value: function getConversations(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(UnifiedThread, fields, params, fetchFirstPage, '/conversations');
    }
  }, {
    key: 'createCopyrightManualClaim',
    value: function createCopyrightManualClaim(fields, params) {
      return this.createEdge('/copyright_manual_claims', fields, params);
    }
  }, {
    key: 'getEvents',
    value: function getEvents(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Event, fields, params, fetchFirstPage, '/events');
    }
  }, {
    key: 'getFeed',
    value: function getFeed(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PagePost, fields, params, fetchFirstPage, '/feed');
    }
  }, {
    key: 'createFeed',
    value: function createFeed(fields, params) {
      return this.createEdge('/feed', fields, params, PagePost);
    }
  }, {
    key: 'getInsights',
    value: function getInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(InsightsResult, fields, params, fetchFirstPage, '/insights');
    }
  }, {
    key: 'getInsightsExports',
    value: function getInsightsExports(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PageInsightsAsyncExportRun, fields, params, fetchFirstPage, '/insights_exports');
    }
  }, {
    key: 'getInstantArticles',
    value: function getInstantArticles(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(InstantArticle, fields, params, fetchFirstPage, '/instant_articles');
    }
  }, {
    key: 'createInstantArticle',
    value: function createInstantArticle(fields, params) {
      return this.createEdge('/instant_articles', fields, params, InstantArticle);
    }
  }, {
    key: 'getInstantArticlesInsights',
    value: function getInstantArticlesInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(InstantArticleInsightsQueryResult, fields, params, fetchFirstPage, '/instant_articles_insights');
    }
  }, {
    key: 'createInstantArticlesPublish',
    value: function createInstantArticlesPublish(fields, params) {
      return this.createEdge('/instant_articles_publish', fields, params);
    }
  }, {
    key: 'createJoinThread',
    value: function createJoinThread(fields, params) {
      return this.createEdge('/join_threads', fields, params, Page);
    }
  }, {
    key: 'createLabel',
    value: function createLabel(fields, params) {
      return this.createEdge('/labels', fields, params, PageLabel);
    }
  }, {
    key: 'createLeadGenConditionalQuestionsGroup',
    value: function createLeadGenConditionalQuestionsGroup(fields, params) {
      return this.createEdge('/leadgen_conditional_questions_group', fields, params);
    }
  }, {
    key: 'createLeadGenContextCard',
    value: function createLeadGenContextCard(fields, params) {
      return this.createEdge('/leadgen_context_cards', fields, params);
    }
  }, {
    key: 'createLeadGenDraftForm',
    value: function createLeadGenDraftForm(fields, params) {
      return this.createEdge('/leadgen_draft_forms', fields, params);
    }
  }, {
    key: 'createLeadGenForm',
    value: function createLeadGenForm(fields, params) {
      return this.createEdge('/leadgen_forms', fields, params, Page);
    }
  }, {
    key: 'createLeadGenLegalContent',
    value: function createLeadGenLegalContent(fields, params) {
      return this.createEdge('/leadgen_legal_content', fields, params);
    }
  }, {
    key: 'deleteLeadGenWhitelistedUsers',
    value: function deleteLeadGenWhitelistedUsers(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/leadgen_whitelisted_users', params);
    }
  }, {
    key: 'createLeadGenWhitelistedUser',
    value: function createLeadGenWhitelistedUser(fields, params) {
      return this.createEdge('/leadgen_whitelisted_users', fields, params, User);
    }
  }, {
    key: 'getLikes',
    value: function getLikes(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Page, fields, params, fetchFirstPage, '/likes');
    }
  }, {
    key: 'createLiveEncoder',
    value: function createLiveEncoder(fields, params) {
      return this.createEdge('/live_encoders', fields, params);
    }
  }, {
    key: 'getLiveVideos',
    value: function getLiveVideos(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(LiveVideo, fields, params, fetchFirstPage, '/live_videos');
    }
  }, {
    key: 'createLiveVideo',
    value: function createLiveVideo(fields, params) {
      return this.createEdge('/live_videos', fields, params, LiveVideo);
    }
  }, {
    key: 'deleteLocations',
    value: function deleteLocations(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/locations', params);
    }
  }, {
    key: 'getLocations',
    value: function getLocations(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Page, fields, params, fetchFirstPage, '/locations');
    }
  }, {
    key: 'createLocation',
    value: function createLocation(fields, params) {
      return this.createEdge('/locations', fields, params, Location);
    }
  }, {
    key: 'createMediaFingerprint',
    value: function createMediaFingerprint(fields, params) {
      return this.createEdge('/media_fingerprints', fields, params, MediaFingerprint);
    }
  }, {
    key: 'createMessageAttachment',
    value: function createMessageAttachment(fields, params) {
      return this.createEdge('/message_attachments', fields, params);
    }
  }, {
    key: 'createMessage',
    value: function createMessage(fields, params) {
      return this.createEdge('/messages', fields, params);
    }
  }, {
    key: 'getMessagingFeatureReview',
    value: function getMessagingFeatureReview(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(MessagingFeatureReview, fields, params, fetchFirstPage, '/messaging_feature_review');
    }
  }, {
    key: 'createMessengerCode',
    value: function createMessengerCode(fields, params) {
      return this.createEdge('/messenger_codes', fields, params);
    }
  }, {
    key: 'deleteMessengerProfile',
    value: function deleteMessengerProfile(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/messenger_profile', params);
    }
  }, {
    key: 'createMessengerProfile',
    value: function createMessengerProfile(fields, params) {
      return this.createEdge('/messenger_profile', fields, params, MessengerProfile);
    }
  }, {
    key: 'createMilestone',
    value: function createMilestone(fields, params) {
      return this.createEdge('/milestones', fields, params, LifeEvent);
    }
  }, {
    key: 'getNativeOffers',
    value: function getNativeOffers(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(NativeOffer, fields, params, fetchFirstPage, '/nativeoffers');
    }
  }, {
    key: 'createNativeOffer',
    value: function createNativeOffer(fields, params) {
      return this.createEdge('/nativeoffers', fields, params, NativeOffer);
    }
  }, {
    key: 'createNlpConfig',
    value: function createNlpConfig(fields, params) {
      return this.createEdge('/nlp_configs', fields, params);
    }
  }, {
    key: 'createOffersV3',
    value: function createOffersV3(fields, params) {
      return this.createEdge('/offers_v3', fields, params);
    }
  }, {
    key: 'createPageBackedInstagramAccount',
    value: function createPageBackedInstagramAccount(fields, params) {
      return this.createEdge('/page_backed_instagram_accounts', fields, params);
    }
  }, {
    key: 'createPassThreadControl',
    value: function createPassThreadControl(fields, params) {
      return this.createEdge('/pass_thread_control', fields, params);
    }
  }, {
    key: 'deletePendingUsers',
    value: function deletePendingUsers(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/pending_users', params);
    }
  }, {
    key: 'getPendingUsers',
    value: function getPendingUsers(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BusinessRoleRequest, fields, params, fetchFirstPage, '/pending_users');
    }
  }, {
    key: 'createPendingUser',
    value: function createPendingUser(fields, params) {
      return this.createEdge('/pending_users', fields, params, Page);
    }
  }, {
    key: 'getPersonas',
    value: function getPersonas(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Persona, fields, params, fetchFirstPage, '/personas');
    }
  }, {
    key: 'createPersona',
    value: function createPersona(fields, params) {
      return this.createEdge('/personas', fields, params, Page);
    }
  }, {
    key: 'getPhotos',
    value: function getPhotos(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Photo, fields, params, fetchFirstPage, '/photos');
    }
  }, {
    key: 'createPhoto',
    value: function createPhoto(fields, params) {
      return this.createEdge('/photos', fields, params, Photo);
    }
  }, {
    key: 'getPicture',
    value: function getPicture(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProfilePictureSource, fields, params, fetchFirstPage, '/picture');
    }
  }, {
    key: 'createPicture',
    value: function createPicture(fields, params) {
      return this.createEdge('/picture', fields, params, ProfilePictureSource);
    }
  }, {
    key: 'getPlaceTopics',
    value: function getPlaceTopics(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PlaceTopic, fields, params, fetchFirstPage, '/place_topics');
    }
  }, {
    key: 'getPosts',
    value: function getPosts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PagePost, fields, params, fetchFirstPage, '/posts');
    }
  }, {
    key: 'getProductCatalogs',
    value: function getProductCatalogs(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProductCatalog, fields, params, fetchFirstPage, '/product_catalogs');
    }
  }, {
    key: 'getPromotablePosts',
    value: function getPromotablePosts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PagePost, fields, params, fetchFirstPage, '/promotable_posts');
    }
  }, {
    key: 'getPublishedPosts',
    value: function getPublishedPosts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PagePost, fields, params, fetchFirstPage, '/published_posts');
    }
  }, {
    key: 'createRequestThreadControl',
    value: function createRequestThreadControl(fields, params) {
      return this.createEdge('/request_thread_control', fields, params);
    }
  }, {
    key: 'getRoles',
    value: function getRoles(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(User, fields, params, fetchFirstPage, '/roles');
    }
  }, {
    key: 'getSavedFilters',
    value: function getSavedFilters(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PageSavedFilter, fields, params, fetchFirstPage, '/saved_filters');
    }
  }, {
    key: 'createSavedMessageResponse',
    value: function createSavedMessageResponse(fields, params) {
      return this.createEdge('/saved_message_responses', fields, params, SavedMessageResponse);
    }
  }, {
    key: 'getScheduledPosts',
    value: function getScheduledPosts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PagePost, fields, params, fetchFirstPage, '/scheduled_posts');
    }
  }, {
    key: 'createSetting',
    value: function createSetting(fields, params) {
      return this.createEdge('/settings', fields, params);
    }
  }, {
    key: 'deleteSubscribedApps',
    value: function deleteSubscribedApps(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/subscribed_apps', params);
    }
  }, {
    key: 'createSubscribedApp',
    value: function createSubscribedApp(fields, params) {
      return this.createEdge('/subscribed_apps', fields, params);
    }
  }, {
    key: 'deleteTabs',
    value: function deleteTabs(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/tabs', params);
    }
  }, {
    key: 'getTabs',
    value: function getTabs(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Tab, fields, params, fetchFirstPage, '/tabs');
    }
  }, {
    key: 'createTab',
    value: function createTab(fields, params) {
      return this.createEdge('/tabs', fields, params, Tab);
    }
  }, {
    key: 'getTagged',
    value: function getTagged(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PagePost, fields, params, fetchFirstPage, '/tagged');
    }
  }, {
    key: 'createThreadSetting',
    value: function createThreadSetting(fields, params) {
      return this.createEdge('/thread_settings', fields, params);
    }
  }, {
    key: 'getThreads',
    value: function getThreads(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(UnifiedThread, fields, params, fetchFirstPage, '/threads');
    }
  }, {
    key: 'getUpcomingChanges',
    value: function getUpcomingChanges(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PageUpcomingChange, fields, params, fetchFirstPage, '/upcoming_changes');
    }
  }, {
    key: 'getVideoCopyrightRules',
    value: function getVideoCopyrightRules(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(VideoCopyrightRule, fields, params, fetchFirstPage, '/video_copyright_rules');
    }
  }, {
    key: 'createVideoCopyrightRule',
    value: function createVideoCopyrightRule(fields, params) {
      return this.createEdge('/video_copyright_rules', fields, params, VideoCopyrightRule);
    }
  }, {
    key: 'getVideoCopyrights',
    value: function getVideoCopyrights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(VideoCopyright, fields, params, fetchFirstPage, '/video_copyrights');
    }
  }, {
    key: 'createVideoCopyright',
    value: function createVideoCopyright(fields, params) {
      return this.createEdge('/video_copyrights', fields, params, VideoCopyright);
    }
  }, {
    key: 'deleteVideoLists',
    value: function deleteVideoLists(params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'deleteEdge', this).call(this, '/video_lists', params);
    }
  }, {
    key: 'createVideoList',
    value: function createVideoList(fields, params) {
      return this.createEdge('/video_lists', fields, params, VideoList);
    }
  }, {
    key: 'getVideoMediaCopyrights',
    value: function getVideoMediaCopyrights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(VideoCopyright, fields, params, fetchFirstPage, '/video_media_copyrights');
    }
  }, {
    key: 'getVideos',
    value: function getVideos(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/videos');
    }
  }, {
    key: 'createVideo',
    value: function createVideo(fields, params) {
      return this.createEdge('/videos', fields, params);
    }
  }, {
    key: 'getVisitorPosts',
    value: function getVisitorPosts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PagePost, fields, params, fetchFirstPage, '/visitor_posts');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        about: 'about',
        access_token: 'access_token',
        ad_campaign: 'ad_campaign',
        affiliation: 'affiliation',
        app_id: 'app_id',
        app_links: 'app_links',
        artists_we_like: 'artists_we_like',
        attire: 'attire',
        awards: 'awards',
        band_interests: 'band_interests',
        band_members: 'band_members',
        best_page: 'best_page',
        bio: 'bio',
        birthday: 'birthday',
        booking_agent: 'booking_agent',
        built: 'built',
        business: 'business',
        can_checkin: 'can_checkin',
        can_post: 'can_post',
        category: 'category',
        category_list: 'category_list',
        checkins: 'checkins',
        company_overview: 'company_overview',
        connected_instagram_account: 'connected_instagram_account',
        contact_address: 'contact_address',
        context: 'context',
        copyright_attribution_insights: 'copyright_attribution_insights',
        country_page_likes: 'country_page_likes',
        cover: 'cover',
        culinary_team: 'culinary_team',
        current_location: 'current_location',
        description: 'description',
        description_html: 'description_html',
        directed_by: 'directed_by',
        display_subtext: 'display_subtext',
        displayed_message_response_time: 'displayed_message_response_time',
        emails: 'emails',
        engagement: 'engagement',
        fan_count: 'fan_count',
        featured_video: 'featured_video',
        features: 'features',
        food_styles: 'food_styles',
        founded: 'founded',
        general_info: 'general_info',
        general_manager: 'general_manager',
        genre: 'genre',
        global_brand_page_name: 'global_brand_page_name',
        global_brand_root_id: 'global_brand_root_id',
        has_added_app: 'has_added_app',
        has_whatsapp_number: 'has_whatsapp_number',
        hometown: 'hometown',
        hours: 'hours',
        id: 'id',
        impressum: 'impressum',
        influences: 'influences',
        instagram_business_account: 'instagram_business_account',
        instant_articles_review_status: 'instant_articles_review_status',
        is_always_open: 'is_always_open',
        is_chain: 'is_chain',
        is_community_page: 'is_community_page',
        is_eligible_for_branded_content: 'is_eligible_for_branded_content',
        is_messenger_bot_get_started_enabled: 'is_messenger_bot_get_started_enabled',
        is_messenger_platform_bot: 'is_messenger_platform_bot',
        is_owned: 'is_owned',
        is_permanently_closed: 'is_permanently_closed',
        is_published: 'is_published',
        is_unclaimed: 'is_unclaimed',
        is_verified: 'is_verified',
        is_webhooks_subscribed: 'is_webhooks_subscribed',
        keywords: 'keywords',
        leadgen_form_preview_details: 'leadgen_form_preview_details',
        leadgen_has_crm_integration: 'leadgen_has_crm_integration',
        leadgen_has_fat_ping_crm_integration: 'leadgen_has_fat_ping_crm_integration',
        leadgen_tos_acceptance_time: 'leadgen_tos_acceptance_time',
        leadgen_tos_accepted: 'leadgen_tos_accepted',
        leadgen_tos_accepting_user: 'leadgen_tos_accepting_user',
        link: 'link',
        location: 'location',
        members: 'members',
        merchant_id: 'merchant_id',
        merchant_review_status: 'merchant_review_status',
        messenger_ads_default_icebreakers: 'messenger_ads_default_icebreakers',
        messenger_ads_default_page_welcome_message: 'messenger_ads_default_page_welcome_message',
        messenger_ads_default_quick_replies: 'messenger_ads_default_quick_replies',
        messenger_ads_quick_replies_type: 'messenger_ads_quick_replies_type',
        mission: 'mission',
        mpg: 'mpg',
        name: 'name',
        name_with_location_descriptor: 'name_with_location_descriptor',
        network: 'network',
        new_like_count: 'new_like_count',
        offer_eligible: 'offer_eligible',
        overall_star_rating: 'overall_star_rating',
        page_token: 'page_token',
        parent_page: 'parent_page',
        parking: 'parking',
        payment_options: 'payment_options',
        personal_info: 'personal_info',
        personal_interests: 'personal_interests',
        pharma_safety_info: 'pharma_safety_info',
        phone: 'phone',
        place_type: 'place_type',
        plot_outline: 'plot_outline',
        preferred_audience: 'preferred_audience',
        press_contact: 'press_contact',
        price_range: 'price_range',
        produced_by: 'produced_by',
        products: 'products',
        promotion_eligible: 'promotion_eligible',
        promotion_ineligible_reason: 'promotion_ineligible_reason',
        public_transit: 'public_transit',
        publisher_space: 'publisher_space',
        rating_count: 'rating_count',
        recipient: 'recipient',
        record_label: 'record_label',
        release_date: 'release_date',
        restaurant_services: 'restaurant_services',
        restaurant_specialties: 'restaurant_specialties',
        schedule: 'schedule',
        screenplay_by: 'screenplay_by',
        season: 'season',
        single_line_address: 'single_line_address',
        starring: 'starring',
        start_info: 'start_info',
        store_location_descriptor: 'store_location_descriptor',
        store_number: 'store_number',
        studio: 'studio',
        supports_instant_articles: 'supports_instant_articles',
        talking_about_count: 'talking_about_count',
        unread_message_count: 'unread_message_count',
        unread_notif_count: 'unread_notif_count',
        unseen_message_count: 'unseen_message_count',
        username: 'username',
        verification_status: 'verification_status',
        voip_info: 'voip_info',
        website: 'website',
        were_here_count: 'were_here_count',
        whatsapp_number: 'whatsapp_number',
        written_by: 'written_by'
      });
    }
  }, {
    key: 'Attire',
    get: function get() {
      return Object.freeze({
        unspecified: 'Unspecified',
        casual: 'Casual',
        dressy: 'Dressy'
      });
    }
  }, {
    key: 'FoodStyles',
    get: function get() {
      return Object.freeze({
        afghani: 'Afghani',
        american_new_: 'American (New)',
        american_traditional_: 'American (Traditional)',
        asian_fusion: 'Asian Fusion',
        barbeque: 'Barbeque',
        brazilian: 'Brazilian',
        breakfast: 'Breakfast',
        british: 'British',
        brunch: 'Brunch',
        buffets: 'Buffets',
        burgers: 'Burgers',
        burmese: 'Burmese',
        cajun_creole: 'Cajun/Creole',
        caribbean: 'Caribbean',
        chinese: 'Chinese',
        creperies: 'Creperies',
        cuban: 'Cuban',
        delis: 'Delis',
        diners: 'Diners',
        ethiopian: 'Ethiopian',
        fast_food: 'Fast Food',
        filipino: 'Filipino',
        fondue: 'Fondue',
        food_stands: 'Food Stands',
        french: 'French',
        german: 'German',
        greek_and_mediterranean: 'Greek and Mediterranean',
        hawaiian: 'Hawaiian',
        himalayan_nepalese: 'Himalayan/Nepalese',
        hot_dogs: 'Hot Dogs',
        indian_pakistani: 'Indian/Pakistani',
        irish: 'Irish',
        italian: 'Italian',
        japanese: 'Japanese',
        korean: 'Korean',
        latin_american: 'Latin American',
        mexican: 'Mexican',
        middle_eastern: 'Middle Eastern',
        moroccan: 'Moroccan',
        pizza: 'Pizza',
        russian: 'Russian',
        sandwiches: 'Sandwiches',
        seafood: 'Seafood',
        singaporean: 'Singaporean',
        soul_food: 'Soul Food',
        southern: 'Southern',
        spanish_basque: 'Spanish/Basque',
        steakhouses: 'Steakhouses',
        sushi_bars: 'Sushi Bars',
        taiwanese: 'Taiwanese',
        tapas_bars: 'Tapas Bars',
        tex_mex: 'Tex-Mex',
        thai: 'Thai',
        turkish: 'Turkish',
        vegan: 'Vegan',
        vegetarian: 'Vegetarian',
        vietnamese: 'Vietnamese'
      });
    }
  }, {
    key: 'Role',
    get: function get() {
      return Object.freeze({
        manager: 'MANAGER',
        content_creator: 'CONTENT_CREATOR',
        moderator: 'MODERATOR',
        advertiser: 'ADVERTISER',
        insights_analyst: 'INSIGHTS_ANALYST'
      });
    }
  }, {
    key: 'Locale',
    get: function get() {
      return Object.freeze({
        en_us: 'EN_US',
        it_it: 'IT_IT',
        fr_fr: 'FR_FR',
        es_es: 'ES_ES',
        es_la: 'ES_LA',
        de_de: 'DE_DE',
        en_gb: 'EN_GB',
        pt_br: 'PT_BR',
        zh_tw: 'ZH_TW',
        zh_hk: 'ZH_HK',
        tr_tr: 'TR_TR',
        ar_ar: 'AR_AR',
        cs_cz: 'CS_CZ',
        da_dk: 'DA_DK',
        fi_fi: 'FI_FI',
        he_il: 'HE_IL',
        hi_in: 'HI_IN',
        hu_hu: 'HU_HU',
        id_id: 'ID_ID',
        ja_jp: 'JA_JP',
        ko_kr: 'KO_KR',
        nb_no: 'NB_NO',
        nl_nl: 'NL_NL',
        pl_pl: 'PL_PL',
        pt_pt: 'PT_PT',
        ro_ro: 'RO_RO',
        ru_ru: 'RU_RU',
        sv_se: 'SV_SE',
        th_th: 'TH_TH',
        vi_vn: 'VI_VN',
        zh_cn: 'ZH_CN'
      });
    }
  }]);
  return Page;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadgenForm
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadgenForm = function (_AbstractCrudObject) {
  inherits(LeadgenForm, _AbstractCrudObject);

  function LeadgenForm() {
    classCallCheck(this, LeadgenForm);
    return possibleConstructorReturn(this, (LeadgenForm.__proto__ || Object.getPrototypeOf(LeadgenForm)).apply(this, arguments));
  }

  createClass(LeadgenForm, [{
    key: 'getLeads',
    value: function getLeads(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Lead, fields, params, fetchFirstPage, '/leads');
    }
  }, {
    key: 'createLead',
    value: function createLead(fields, params) {
      return this.createEdge('/leads', fields, params, LeadgenForm);
    }
  }, {
    key: 'createTestLead',
    value: function createTestLead(fields, params) {
      return this.createEdge('/test_leads', fields, params, LeadgenForm);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(LeadgenForm.prototype.__proto__ || Object.getPrototypeOf(LeadgenForm.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(LeadgenForm.prototype.__proto__ || Object.getPrototypeOf(LeadgenForm.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        allow_organic_lead: 'allow_organic_lead',
        block_display_for_non_targeted_viewer: 'block_display_for_non_targeted_viewer',
        context_card: 'context_card',
        created_time: 'created_time',
        creator: 'creator',
        creator_id: 'creator_id',
        cusomized_tcpa_content: 'cusomized_tcpa_content',
        expired_leads_count: 'expired_leads_count',
        extra_details: 'extra_details',
        follow_up_action_text: 'follow_up_action_text',
        follow_up_action_url: 'follow_up_action_url',
        id: 'id',
        is_optimized_for_quality: 'is_optimized_for_quality',
        leadgen_export_csv_url: 'leadgen_export_csv_url',
        leads_count: 'leads_count',
        legal_content: 'legal_content',
        locale: 'locale',
        messenger_welcome_message: 'messenger_welcome_message',
        name: 'name',
        organic_leads_count: 'organic_leads_count',
        page: 'page',
        page_id: 'page_id',
        privacy_policy_url: 'privacy_policy_url',
        qualifiers: 'qualifiers',
        question_page_custom_headline: 'question_page_custom_headline',
        questions: 'questions',
        status: 'status',
        tcpa_compliance: 'tcpa_compliance',
        thank_you_page: 'thank_you_page'
      });
    }
  }, {
    key: 'Locale',
    get: function get() {
      return Object.freeze({
        en_us: 'EN_US',
        it_it: 'IT_IT',
        fr_fr: 'FR_FR',
        es_es: 'ES_ES',
        es_la: 'ES_LA',
        de_de: 'DE_DE',
        en_gb: 'EN_GB',
        pt_br: 'PT_BR',
        zh_tw: 'ZH_TW',
        zh_hk: 'ZH_HK',
        tr_tr: 'TR_TR',
        ar_ar: 'AR_AR',
        cs_cz: 'CS_CZ',
        da_dk: 'DA_DK',
        fi_fi: 'FI_FI',
        he_il: 'HE_IL',
        hi_in: 'HI_IN',
        hu_hu: 'HU_HU',
        id_id: 'ID_ID',
        ja_jp: 'JA_JP',
        ko_kr: 'KO_KR',
        nb_no: 'NB_NO',
        nl_nl: 'NL_NL',
        pl_pl: 'PL_PL',
        pt_pt: 'PT_PT',
        ro_ro: 'RO_RO',
        ru_ru: 'RU_RU',
        sv_se: 'SV_SE',
        th_th: 'TH_TH',
        vi_vn: 'VI_VN',
        zh_cn: 'ZH_CN'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        archived: 'ARCHIVED',
        deleted: 'DELETED',
        draft: 'DRAFT'
      });
    }
  }]);
  return LeadgenForm;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Domain
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Domain = function (_AbstractCrudObject) {
  inherits(Domain, _AbstractCrudObject);

  function Domain() {
    classCallCheck(this, Domain);
    return possibleConstructorReturn(this, (Domain.__proto__ || Object.getPrototypeOf(Domain)).apply(this, arguments));
  }

  createClass(Domain, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        name: 'name',
        url: 'url'
      });
    }
  }]);
  return Domain;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * User
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var User = function (_AbstractCrudObject) {
  inherits(User, _AbstractCrudObject);

  function User() {
    classCallCheck(this, User);
    return possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
  }

  createClass(User, [{
    key: 'getAccounts',
    value: function getAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Page, fields, params, fetchFirstPage, '/accounts');
    }
  }, {
    key: 'createAccount',
    value: function createAccount(fields, params) {
      return this.createEdge('/accounts', fields, params);
    }
  }, {
    key: 'getAdAccounts',
    value: function getAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccount, fields, params, fetchFirstPage, '/adaccounts');
    }
  }, {
    key: 'createAlbum',
    value: function createAlbum(fields, params) {
      return this.createEdge('/albums', fields, params, Album);
    }
  }, {
    key: 'getConversations',
    value: function getConversations(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(UnifiedThread, fields, params, fetchFirstPage, '/conversations');
    }
  }, {
    key: 'getLeadGenForms',
    value: function getLeadGenForms(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(LeadgenForm, fields, params, fetchFirstPage, '/leadgen_forms');
    }
  }, {
    key: 'createLiveEncoder',
    value: function createLiveEncoder(fields, params) {
      return this.createEdge('/live_encoders', fields, params);
    }
  }, {
    key: 'getLiveVideos',
    value: function getLiveVideos(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(LiveVideo, fields, params, fetchFirstPage, '/live_videos');
    }
  }, {
    key: 'createLiveVideo',
    value: function createLiveVideo(fields, params) {
      return this.createEdge('/live_videos', fields, params, LiveVideo);
    }
  }, {
    key: 'createPhoto',
    value: function createPhoto(fields, params) {
      return this.createEdge('/photos', fields, params, Photo);
    }
  }, {
    key: 'getPicture',
    value: function getPicture(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ProfilePictureSource, fields, params, fetchFirstPage, '/picture');
    }
  }, {
    key: 'getPromotableDomains',
    value: function getPromotableDomains(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Domain, fields, params, fetchFirstPage, '/promotable_domains');
    }
  }, {
    key: 'getPromotableEvents',
    value: function getPromotableEvents(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Event, fields, params, fetchFirstPage, '/promotable_events');
    }
  }, {
    key: 'getThreads',
    value: function getThreads(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(UnifiedThread, fields, params, fetchFirstPage, '/threads');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        about: 'about',
        address: 'address',
        admin_notes: 'admin_notes',
        age_range: 'age_range',
        birthday: 'birthday',
        can_review_measurement_request: 'can_review_measurement_request',
        context: 'context',
        cover: 'cover',
        currency: 'currency',
        devices: 'devices',
        education: 'education',
        email: 'email',
        employee_number: 'employee_number',
        favorite_athletes: 'favorite_athletes',
        favorite_teams: 'favorite_teams',
        first_name: 'first_name',
        gender: 'gender',
        hometown: 'hometown',
        id: 'id',
        inspirational_people: 'inspirational_people',
        install_type: 'install_type',
        installed: 'installed',
        interested_in: 'interested_in',
        is_payment_enabled: 'is_payment_enabled',
        is_shared_login: 'is_shared_login',
        is_verified: 'is_verified',
        labels: 'labels',
        languages: 'languages',
        last_ad_referral: 'last_ad_referral',
        last_name: 'last_name',
        link: 'link',
        local_news_megaphone_dismiss_status: 'local_news_megaphone_dismiss_status',
        local_news_subscription_status: 'local_news_subscription_status',
        locale: 'locale',
        location: 'location',
        meeting_for: 'meeting_for',
        middle_name: 'middle_name',
        name: 'name',
        name_format: 'name_format',
        payment_pricepoints: 'payment_pricepoints',
        political: 'political',
        profile_pic: 'profile_pic',
        public_key: 'public_key',
        quotes: 'quotes',
        relationship_status: 'relationship_status',
        religion: 'religion',
        security_settings: 'security_settings',
        shared_login_upgrade_required_by: 'shared_login_upgrade_required_by',
        short_name: 'short_name',
        significant_other: 'significant_other',
        sports: 'sports',
        test_group: 'test_group',
        third_party_id: 'third_party_id',
        timezone: 'timezone',
        token_for_business: 'token_for_business',
        updated_time: 'updated_time',
        verified: 'verified',
        video_upload_limits: 'video_upload_limits',
        viewer_can_send_gift: 'viewer_can_send_gift',
        website: 'website',
        work: 'work'
      });
    }
  }]);
  return User;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomAudience
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomAudience = function (_AbstractCrudObject) {
  inherits(CustomAudience, _AbstractCrudObject);

  function CustomAudience() {
    classCallCheck(this, CustomAudience);
    return possibleConstructorReturn(this, (CustomAudience.__proto__ || Object.getPrototypeOf(CustomAudience)).apply(this, arguments));
  }

  createClass(CustomAudience, [{
    key: 'deleteAdAccounts',
    value: function deleteAdAccounts(params) {
      return get$1(CustomAudience.prototype.__proto__ || Object.getPrototypeOf(CustomAudience.prototype), 'deleteEdge', this).call(this, '/adaccounts', params);
    }
  }, {
    key: 'getAdAccounts',
    value: function getAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccount, fields, params, fetchFirstPage, '/adaccounts');
    }
  }, {
    key: 'createAdAccount',
    value: function createAdAccount(fields, params) {
      return this.createEdge('/adaccounts', fields, params, AdAccount);
    }
  }, {
    key: 'getAds',
    value: function getAds(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Ad, fields, params, fetchFirstPage, '/ads');
    }
  }, {
    key: 'getPrefills',
    value: function getPrefills(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(CustomAudiencePrefillState, fields, params, fetchFirstPage, '/prefills');
    }
  }, {
    key: 'getSessions',
    value: function getSessions(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(CustomAudienceSession, fields, params, fetchFirstPage, '/sessions');
    }
  }, {
    key: 'deleteUsers',
    value: function deleteUsers(params) {
      return get$1(CustomAudience.prototype.__proto__ || Object.getPrototypeOf(CustomAudience.prototype), 'deleteEdge', this).call(this, '/users', params);
    }
  }, {
    key: 'createUser',
    value: function createUser(fields, params) {
      return this.createEdge('/users', fields, params, User);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(CustomAudience.prototype.__proto__ || Object.getPrototypeOf(CustomAudience.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(CustomAudience.prototype.__proto__ || Object.getPrototypeOf(CustomAudience.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        approximate_count: 'approximate_count',
        data_source: 'data_source',
        delivery_status: 'delivery_status',
        description: 'description',
        external_event_source: 'external_event_source',
        id: 'id',
        is_value_based: 'is_value_based',
        lookalike_audience_ids: 'lookalike_audience_ids',
        lookalike_spec: 'lookalike_spec',
        name: 'name',
        operation_status: 'operation_status',
        opt_out_link: 'opt_out_link',
        permission_for_actions: 'permission_for_actions',
        pixel_id: 'pixel_id',
        retention_days: 'retention_days',
        rule: 'rule',
        rule_aggregation: 'rule_aggregation',
        subtype: 'subtype',
        time_content_updated: 'time_content_updated',
        time_created: 'time_created',
        time_updated: 'time_updated'
      });
    }
  }, {
    key: 'ClaimObjective',
    get: function get() {
      return Object.freeze({
        auto_offer: 'AUTO_OFFER',
        home_listing: 'HOME_LISTING',
        product: 'PRODUCT',
        travel: 'TRAVEL',
        vehicle: 'VEHICLE'
      });
    }
  }, {
    key: 'ContentType',
    get: function get() {
      return Object.freeze({
        auto_offer: 'AUTO_OFFER',
        destination: 'DESTINATION',
        flight: 'FLIGHT',
        home_listing: 'HOME_LISTING',
        hotel: 'HOTEL',
        vehicle: 'VEHICLE',
        vehicle_offer: 'VEHICLE_OFFER'
      });
    }
  }, {
    key: 'Subtype',
    get: function get() {
      return Object.freeze({
        custom: 'CUSTOM',
        website: 'WEBSITE',
        app: 'APP',
        offline_conversion: 'OFFLINE_CONVERSION',
        claim: 'CLAIM',
        partner: 'PARTNER',
        managed: 'MANAGED',
        video: 'VIDEO',
        lookalike: 'LOOKALIKE',
        engagement: 'ENGAGEMENT',
        data_set: 'DATA_SET',
        bag_of_accounts: 'BAG_OF_ACCOUNTS',
        study_rule_audience: 'STUDY_RULE_AUDIENCE',
        fox: 'FOX'
      });
    }
  }]);
  return CustomAudience;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdsPixelStatsResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdsPixelStatsResult = function (_AbstractCrudObject) {
  inherits(AdsPixelStatsResult, _AbstractCrudObject);

  function AdsPixelStatsResult() {
    classCallCheck(this, AdsPixelStatsResult);
    return possibleConstructorReturn(this, (AdsPixelStatsResult.__proto__ || Object.getPrototypeOf(AdsPixelStatsResult)).apply(this, arguments));
  }

  createClass(AdsPixelStatsResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        aggregation: 'aggregation',
        data: 'data',
        start_time: 'start_time'
      });
    }
  }, {
    key: 'Aggregation',
    get: function get() {
      return Object.freeze({
        browser_type: 'browser_type',
        custom_data_field: 'custom_data_field',
        device_os: 'device_os',
        device_type: 'device_type',
        event: 'event',
        host: 'host',
        pixel_fire: 'pixel_fire',
        url: 'url',
        event_total_counts: 'event_total_counts'
      });
    }
  }]);
  return AdsPixelStatsResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdsPixel
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdsPixel = function (_AbstractCrudObject) {
  inherits(AdsPixel, _AbstractCrudObject);

  function AdsPixel() {
    classCallCheck(this, AdsPixel);
    return possibleConstructorReturn(this, (AdsPixel.__proto__ || Object.getPrototypeOf(AdsPixel)).apply(this, arguments));
  }

  createClass(AdsPixel, [{
    key: 'getAudiences',
    value: function getAudiences(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(CustomAudience, fields, params, fetchFirstPage, '/audiences');
    }
  }, {
    key: 'deleteSharedAccounts',
    value: function deleteSharedAccounts(params) {
      return get$1(AdsPixel.prototype.__proto__ || Object.getPrototypeOf(AdsPixel.prototype), 'deleteEdge', this).call(this, '/shared_accounts', params);
    }
  }, {
    key: 'getSharedAccounts',
    value: function getSharedAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccount, fields, params, fetchFirstPage, '/shared_accounts');
    }
  }, {
    key: 'createSharedAccount',
    value: function createSharedAccount(fields, params) {
      return this.createEdge('/shared_accounts', fields, params);
    }
  }, {
    key: 'getSharedAgencies',
    value: function getSharedAgencies(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Business, fields, params, fetchFirstPage, '/shared_agencies');
    }
  }, {
    key: 'getStats',
    value: function getStats(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsPixelStatsResult, fields, params, fetchFirstPage, '/stats');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdsPixel.prototype.__proto__ || Object.getPrototypeOf(AdsPixel.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        can_proxy: 'can_proxy',
        code: 'code',
        creation_time: 'creation_time',
        creator: 'creator',
        id: 'id',
        is_created_by_business: 'is_created_by_business',
        last_fired_time: 'last_fired_time',
        name: 'name',
        owner_ad_account: 'owner_ad_account',
        owner_business: 'owner_business'
      });
    }
  }]);
  return AdsPixel;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAsyncRequestSet
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAsyncRequestSet = function (_AbstractCrudObject) {
  inherits(AdAsyncRequestSet, _AbstractCrudObject);

  function AdAsyncRequestSet() {
    classCallCheck(this, AdAsyncRequestSet);
    return possibleConstructorReturn(this, (AdAsyncRequestSet.__proto__ || Object.getPrototypeOf(AdAsyncRequestSet)).apply(this, arguments));
  }

  createClass(AdAsyncRequestSet, [{
    key: 'getRequests',
    value: function getRequests(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAsyncRequest, fields, params, fetchFirstPage, '/requests');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        canceled_count: 'canceled_count',
        created_time: 'created_time',
        error_count: 'error_count',
        id: 'id',
        in_progress_count: 'in_progress_count',
        initial_count: 'initial_count',
        is_completed: 'is_completed',
        name: 'name',
        notification_mode: 'notification_mode',
        notification_result: 'notification_result',
        notification_status: 'notification_status',
        notification_uri: 'notification_uri',
        owner_id: 'owner_id',
        success_count: 'success_count',
        total_count: 'total_count',
        updated_time: 'updated_time'
      });
    }
  }, {
    key: 'NotificationMode',
    get: function get() {
      return Object.freeze({
        off: 'OFF',
        on_complete: 'ON_COMPLETE'
      });
    }
  }, {
    key: 'NotificationStatus',
    get: function get() {
      return Object.freeze({
        not_sent: 'NOT_SENT',
        sending: 'SENDING',
        sent: 'SENT'
      });
    }
  }]);
  return AdAsyncRequestSet;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * BroadTargetingCategories
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var BroadTargetingCategories = function (_AbstractCrudObject) {
  inherits(BroadTargetingCategories, _AbstractCrudObject);

  function BroadTargetingCategories() {
    classCallCheck(this, BroadTargetingCategories);
    return possibleConstructorReturn(this, (BroadTargetingCategories.__proto__ || Object.getPrototypeOf(BroadTargetingCategories)).apply(this, arguments));
  }

  createClass(BroadTargetingCategories, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        category_description: 'category_description',
        id: 'id',
        name: 'name',
        parent_category: 'parent_category',
        path: 'path',
        size: 'size',
        source: 'source',
        type: 'type',
        type_name: 'type_name',
        untranslated_name: 'untranslated_name',
        untranslated_parent_name: 'untranslated_parent_name'
      });
    }
  }]);
  return BroadTargetingCategories;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomAudiencesTOS
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomAudiencesTOS = function (_AbstractCrudObject) {
  inherits(CustomAudiencesTOS, _AbstractCrudObject);

  function CustomAudiencesTOS() {
    classCallCheck(this, CustomAudiencesTOS);
    return possibleConstructorReturn(this, (CustomAudiencesTOS.__proto__ || Object.getPrototypeOf(CustomAudiencesTOS)).apply(this, arguments));
  }

  createClass(CustomAudiencesTOS, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        content: 'content',
        id: 'id',
        type: 'type'
      });
    }
  }]);
  return CustomAudiencesTOS;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomConversionStatsResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomConversionStatsResult = function (_AbstractCrudObject) {
  inherits(CustomConversionStatsResult, _AbstractCrudObject);

  function CustomConversionStatsResult() {
    classCallCheck(this, CustomConversionStatsResult);
    return possibleConstructorReturn(this, (CustomConversionStatsResult.__proto__ || Object.getPrototypeOf(CustomConversionStatsResult)).apply(this, arguments));
  }

  createClass(CustomConversionStatsResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        aggregation: 'aggregation',
        data: 'data',
        timestamp: 'timestamp'
      });
    }
  }, {
    key: 'Aggregation',
    get: function get() {
      return Object.freeze({
        count: 'count',
        device_type: 'device_type',
        host: 'host',
        pixel_fire: 'pixel_fire',
        unmatched_count: 'unmatched_count',
        unmatched_usd_amount: 'unmatched_usd_amount',
        url: 'url',
        usd_amount: 'usd_amount'
      });
    }
  }]);
  return CustomConversionStatsResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomConversion
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomConversion = function (_AbstractCrudObject) {
  inherits(CustomConversion, _AbstractCrudObject);

  function CustomConversion() {
    classCallCheck(this, CustomConversion);
    return possibleConstructorReturn(this, (CustomConversion.__proto__ || Object.getPrototypeOf(CustomConversion)).apply(this, arguments));
  }

  createClass(CustomConversion, [{
    key: 'getActivities',
    value: function getActivities(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/activities');
    }
  }, {
    key: 'deleteAdAccounts',
    value: function deleteAdAccounts(params) {
      return get$1(CustomConversion.prototype.__proto__ || Object.getPrototypeOf(CustomConversion.prototype), 'deleteEdge', this).call(this, '/adaccounts', params);
    }
  }, {
    key: 'createAdAccount',
    value: function createAdAccount(fields, params) {
      return this.createEdge('/adaccounts', fields, params, CustomConversion);
    }
  }, {
    key: 'deleteSharedAgencies',
    value: function deleteSharedAgencies(params) {
      return get$1(CustomConversion.prototype.__proto__ || Object.getPrototypeOf(CustomConversion.prototype), 'deleteEdge', this).call(this, '/shared_agencies', params);
    }
  }, {
    key: 'createSharedAgency',
    value: function createSharedAgency(fields, params) {
      return this.createEdge('/shared_agencies', fields, params, CustomConversion);
    }
  }, {
    key: 'getStats',
    value: function getStats(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(CustomConversionStatsResult, fields, params, fetchFirstPage, '/stats');
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(CustomConversion.prototype.__proto__ || Object.getPrototypeOf(CustomConversion.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(CustomConversion.prototype.__proto__ || Object.getPrototypeOf(CustomConversion.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        aggregation_rule: 'aggregation_rule',
        creation_time: 'creation_time',
        custom_event_type: 'custom_event_type',
        data_sources: 'data_sources',
        default_conversion_value: 'default_conversion_value',
        description: 'description',
        event_source_type: 'event_source_type',
        first_fired_time: 'first_fired_time',
        id: 'id',
        is_archived: 'is_archived',
        last_fired_time: 'last_fired_time',
        name: 'name',
        offline_conversion_data_set: 'offline_conversion_data_set',
        pixel: 'pixel',
        retention_days: 'retention_days',
        rule: 'rule'
      });
    }
  }, {
    key: 'CustomEventType',
    get: function get() {
      return Object.freeze({
        add_payment_info: 'ADD_PAYMENT_INFO',
        add_to_cart: 'ADD_TO_CART',
        add_to_wishlist: 'ADD_TO_WISHLIST',
        complete_registration: 'COMPLETE_REGISTRATION',
        content_view: 'CONTENT_VIEW',
        initiated_checkout: 'INITIATED_CHECKOUT',
        lead: 'LEAD',
        purchase: 'PURCHASE',
        search: 'SEARCH',
        contact: 'CONTACT',
        customize_product: 'CUSTOMIZE_PRODUCT',
        donate: 'DONATE',
        find_location: 'FIND_LOCATION',
        schedule: 'SCHEDULE',
        start_trial: 'START_TRIAL',
        submit_application: 'SUBMIT_APPLICATION',
        subscribe: 'SUBSCRIBE',
        take_survey: 'TAKE_SURVEY',
        other: 'OTHER'
      });
    }
  }]);
  return CustomConversion;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAccountDeliveryEstimate
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAccountDeliveryEstimate = function (_AbstractCrudObject) {
  inherits(AdAccountDeliveryEstimate, _AbstractCrudObject);

  function AdAccountDeliveryEstimate() {
    classCallCheck(this, AdAccountDeliveryEstimate);
    return possibleConstructorReturn(this, (AdAccountDeliveryEstimate.__proto__ || Object.getPrototypeOf(AdAccountDeliveryEstimate)).apply(this, arguments));
  }

  createClass(AdAccountDeliveryEstimate, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        daily_outcomes_curve: 'daily_outcomes_curve',
        estimate_dau: 'estimate_dau',
        estimate_mau: 'estimate_mau',
        estimate_ready: 'estimate_ready'
      });
    }
  }, {
    key: 'OptimizationGoal',
    get: function get() {
      return Object.freeze({
        none: 'NONE',
        app_installs: 'APP_INSTALLS',
        brand_awareness: 'BRAND_AWARENESS',
        ad_recall_lift: 'AD_RECALL_LIFT',
        clicks: 'CLICKS',
        engaged_users: 'ENGAGED_USERS',
        event_responses: 'EVENT_RESPONSES',
        impressions: 'IMPRESSIONS',
        lead_generation: 'LEAD_GENERATION',
        link_clicks: 'LINK_CLICKS',
        offer_claims: 'OFFER_CLAIMS',
        offsite_conversions: 'OFFSITE_CONVERSIONS',
        page_engagement: 'PAGE_ENGAGEMENT',
        page_likes: 'PAGE_LIKES',
        post_engagement: 'POST_ENGAGEMENT',
        reach: 'REACH',
        social_impressions: 'SOCIAL_IMPRESSIONS',
        video_views: 'VIDEO_VIEWS',
        app_downloads: 'APP_DOWNLOADS',
        landing_page_views: 'LANDING_PAGE_VIEWS',
        value: 'VALUE',
        replies: 'REPLIES'
      });
    }
  }]);
  return AdAccountDeliveryEstimate;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * MinimumBudget
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var MinimumBudget = function (_AbstractCrudObject) {
  inherits(MinimumBudget, _AbstractCrudObject);

  function MinimumBudget() {
    classCallCheck(this, MinimumBudget);
    return possibleConstructorReturn(this, (MinimumBudget.__proto__ || Object.getPrototypeOf(MinimumBudget)).apply(this, arguments));
  }

  createClass(MinimumBudget, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        currency: 'currency',
        min_daily_budget_high_freq: 'min_daily_budget_high_freq',
        min_daily_budget_imp: 'min_daily_budget_imp',
        min_daily_budget_low_freq: 'min_daily_budget_low_freq',
        min_daily_budget_video_views: 'min_daily_budget_video_views'
      });
    }
  }]);
  return MinimumBudget;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * OffsitePixel
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var OffsitePixel = function (_AbstractCrudObject) {
  inherits(OffsitePixel, _AbstractCrudObject);

  function OffsitePixel() {
    classCallCheck(this, OffsitePixel);
    return possibleConstructorReturn(this, (OffsitePixel.__proto__ || Object.getPrototypeOf(OffsitePixel)).apply(this, arguments));
  }

  createClass(OffsitePixel, [{
    key: 'deleteAdAccounts',
    value: function deleteAdAccounts(params) {
      return get$1(OffsitePixel.prototype.__proto__ || Object.getPrototypeOf(OffsitePixel.prototype), 'deleteEdge', this).call(this, '/adaccounts', params);
    }
  }, {
    key: 'getAdAccounts',
    value: function getAdAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccount, fields, params, fetchFirstPage, '/adaccounts');
    }
  }, {
    key: 'createAdAccount',
    value: function createAdAccount(fields, params) {
      return this.createEdge('/adaccounts', fields, params, AdAccount);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(OffsitePixel.prototype.__proto__ || Object.getPrototypeOf(OffsitePixel.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(OffsitePixel.prototype.__proto__ || Object.getPrototypeOf(OffsitePixel.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        creator: 'creator',
        id: 'id',
        js_pixel: 'js_pixel',
        last_firing_time: 'last_firing_time',
        name: 'name',
        tag: 'tag'
      });
    }
  }, {
    key: 'Tag',
    get: function get() {
      return Object.freeze({
        checkout: 'CHECKOUT',
        registration: 'REGISTRATION',
        lead: 'LEAD',
        key_page_view: 'KEY_PAGE_VIEW',
        add_to_cart: 'ADD_TO_CART',
        other: 'OTHER'
      });
    }
  }]);
  return OffsitePixel;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PartnerCategory
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PartnerCategory = function (_AbstractCrudObject) {
  inherits(PartnerCategory, _AbstractCrudObject);

  function PartnerCategory() {
    classCallCheck(this, PartnerCategory);
    return possibleConstructorReturn(this, (PartnerCategory.__proto__ || Object.getPrototypeOf(PartnerCategory)).apply(this, arguments));
  }

  createClass(PartnerCategory, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        approximate_count: 'approximate_count',
        country: 'country',
        description: 'description',
        details: 'details',
        id: 'id',
        is_private: 'is_private',
        name: 'name',
        parent_category: 'parent_category',
        source: 'source',
        status: 'status',
        targeting_type: 'targeting_type'
      });
    }
  }, {
    key: 'PrivateOrPublic',
    get: function get() {
      return Object.freeze({
        private: 'PRIVATE',
        public: 'PUBLIC'
      });
    }
  }]);
  return PartnerCategory;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdsDataPartner
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdsDataPartner = function (_AbstractCrudObject) {
  inherits(AdsDataPartner, _AbstractCrudObject);

  function AdsDataPartner() {
    classCallCheck(this, AdsDataPartner);
    return possibleConstructorReturn(this, (AdsDataPartner.__proto__ || Object.getPrototypeOf(AdsDataPartner)).apply(this, arguments));
  }

  createClass(AdsDataPartner, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        name: 'name',
        rev_share_policies: 'rev_share_policies'
      });
    }
  }]);
  return AdsDataPartner;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ReachEstimate
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ReachEstimate = function (_AbstractCrudObject) {
  inherits(ReachEstimate, _AbstractCrudObject);

  function ReachEstimate() {
    classCallCheck(this, ReachEstimate);
    return possibleConstructorReturn(this, (ReachEstimate.__proto__ || Object.getPrototypeOf(ReachEstimate)).apply(this, arguments));
  }

  createClass(ReachEstimate, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        estimate_ready: 'estimate_ready',
        unsupported: 'unsupported',
        users: 'users'
      });
    }
  }]);
  return ReachEstimate;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAccountRoas
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAccountRoas = function (_AbstractCrudObject) {
  inherits(AdAccountRoas, _AbstractCrudObject);

  function AdAccountRoas() {
    classCallCheck(this, AdAccountRoas);
    return possibleConstructorReturn(this, (AdAccountRoas.__proto__ || Object.getPrototypeOf(AdAccountRoas)).apply(this, arguments));
  }

  createClass(AdAccountRoas, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adgroup_id: 'adgroup_id',
        arpu_180d: 'arpu_180d',
        arpu_1d: 'arpu_1d',
        arpu_30d: 'arpu_30d',
        arpu_365d: 'arpu_365d',
        arpu_3d: 'arpu_3d',
        arpu_7d: 'arpu_7d',
        arpu_90d: 'arpu_90d',
        campaign_group_id: 'campaign_group_id',
        campaign_id: 'campaign_id',
        date_start: 'date_start',
        date_stop: 'date_stop',
        installs: 'installs',
        revenue: 'revenue',
        revenue_180d: 'revenue_180d',
        revenue_1d: 'revenue_1d',
        revenue_30d: 'revenue_30d',
        revenue_365d: 'revenue_365d',
        revenue_3d: 'revenue_3d',
        revenue_7d: 'revenue_7d',
        revenue_90d: 'revenue_90d',
        spend: 'spend',
        yield_180d: 'yield_180d',
        yield_1d: 'yield_1d',
        yield_30d: 'yield_30d',
        yield_365d: 'yield_365d',
        yield_3d: 'yield_3d',
        yield_7d: 'yield_7d',
        yield_90d: 'yield_90d'
      });
    }
  }]);
  return AdAccountRoas;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAccountTargetingUnified
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAccountTargetingUnified = function (_AbstractCrudObject) {
  inherits(AdAccountTargetingUnified, _AbstractCrudObject);

  function AdAccountTargetingUnified() {
    classCallCheck(this, AdAccountTargetingUnified);
    return possibleConstructorReturn(this, (AdAccountTargetingUnified.__proto__ || Object.getPrototypeOf(AdAccountTargetingUnified)).apply(this, arguments));
  }

  createClass(AdAccountTargetingUnified, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        audience_size: 'audience_size',
        description: 'description',
        id: 'id',
        is_recommendation: 'is_recommendation',
        name: 'name',
        path: 'path',
        recommendation_model: 'recommendation_model',
        search_interest_id: 'search_interest_id',
        type: 'type',
        valid: 'valid'
      });
    }
  }, {
    key: 'LimitType',
    get: function get() {
      return Object.freeze({
        adgroup_id: 'adgroup_id',
        genders: 'genders',
        age_min: 'age_min',
        age_max: 'age_max',
        country_groups: 'country_groups',
        countries: 'countries',
        country: 'country',
        cities: 'cities',
        radius: 'radius',
        regions: 'regions',
        zips: 'zips',
        interests: 'interests',
        keywords: 'keywords',
        education_schools: 'education_schools',
        education_majors: 'education_majors',
        work_positions: 'work_positions',
        work_employers: 'work_employers',
        relationship_statuses: 'relationship_statuses',
        interested_in: 'interested_in',
        locales: 'locales',
        user_adclusters: 'user_adclusters',
        excluded_user_adclusters: 'excluded_user_adclusters',
        conjunctive_user_adclusters: 'conjunctive_user_adclusters',
        custom_audiences: 'custom_audiences',
        excluded_custom_audiences: 'excluded_custom_audiences',
        college_years: 'college_years',
        education_statuses: 'education_statuses',
        connections: 'connections',
        excluded_connections: 'excluded_connections',
        friends_of_connections: 'friends_of_connections',
        user_event: 'user_event',
        dynamic_audience_ids: 'dynamic_audience_ids',
        excluded_dynamic_audience_ids: 'excluded_dynamic_audience_ids',
        rtb_flag: 'rtb_flag',
        site_category: 'site_category',
        geo_locations: 'geo_locations',
        excluded_geo_locations: 'excluded_geo_locations',
        timezones: 'timezones',
        place_page_set_ids: 'place_page_set_ids',
        page_types: 'page_types',
        publisher_platforms: 'publisher_platforms',
        effective_publisher_platforms: 'effective_publisher_platforms',
        facebook_positions: 'facebook_positions',
        effective_facebook_positions: 'effective_facebook_positions',
        instagram_positions: 'instagram_positions',
        effective_instagram_positions: 'effective_instagram_positions',
        messenger_positions: 'messenger_positions',
        effective_messenger_positions: 'effective_messenger_positions',
        device_platforms: 'device_platforms',
        effective_device_platforms: 'effective_device_platforms',
        audience_network_positions: 'audience_network_positions',
        effective_audience_network_positions: 'effective_audience_network_positions',
        excluded_publisher_categories: 'excluded_publisher_categories',
        excluded_publisher_list_ids: 'excluded_publisher_list_ids',
        publisher_visibility_categories: 'publisher_visibility_categories',
        user_device: 'user_device',
        mobile_device_model: 'mobile_device_model',
        excluded_user_device: 'excluded_user_device',
        excluded_mobile_device_model: 'excluded_mobile_device_model',
        user_os: 'user_os',
        wireless_carrier: 'wireless_carrier',
        family_statuses: 'family_statuses',
        industries: 'industries',
        life_events: 'life_events',
        political_views: 'political_views',
        politics: 'politics',
        behaviors: 'behaviors',
        income: 'income',
        net_worth: 'net_worth',
        home_type: 'home_type',
        home_ownership: 'home_ownership',
        home_value: 'home_value',
        ethnic_affinity: 'ethnic_affinity',
        generation: 'generation',
        household_composition: 'household_composition',
        moms: 'moms',
        office_type: 'office_type',
        targeting_optimization: 'targeting_optimization',
        direct_install_devices: 'direct_install_devices',
        engagement_specs: 'engagement_specs',
        excluded_engagement_specs: 'excluded_engagement_specs',
        product_audience_specs: 'product_audience_specs',
        excluded_product_audience_specs: 'excluded_product_audience_specs',
        exclusions: 'exclusions',
        flexible_spec: 'flexible_spec',
        exclude_reached_since: 'exclude_reached_since',
        exclude_previous_days: 'exclude_previous_days',
        app_install_state: 'app_install_state',
        fb_deal_id: 'fb_deal_id',
        interest_defaults_source: 'interest_defaults_source',
        alternate_auto_targeting_option: 'alternate_auto_targeting_option',
        contextual_targeting_categories: 'contextual_targeting_categories',
        topic: 'topic',
        format: 'format',
        trending: 'trending',
        gatekeepers: 'gatekeepers',
        follow_profiles: 'follow_profiles',
        follow_profiles_negative: 'follow_profiles_negative',
        location_categories: 'location_categories',
        user_page_threads: 'user_page_threads',
        user_page_threads_excluded: 'user_page_threads_excluded',
        is_whatsapp_destination_ad: 'is_whatsapp_destination_ad',
        marketplace_product_categories: 'marketplace_product_categories'
      });
    }
  }]);
  return AdAccountTargetingUnified;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAccountUser
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAccountUser = function (_AbstractCrudObject) {
  inherits(AdAccountUser, _AbstractCrudObject);

  function AdAccountUser() {
    classCallCheck(this, AdAccountUser);
    return possibleConstructorReturn(this, (AdAccountUser.__proto__ || Object.getPrototypeOf(AdAccountUser)).apply(this, arguments));
  }

  createClass(AdAccountUser, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        name: 'name',
        permissions: 'permissions',
        role: 'role',
        roles: 'roles'
      });
    }
  }]);
  return AdAccountUser;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAccount
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAccount = function (_AbstractCrudObject) {
  inherits(AdAccount, _AbstractCrudObject);

  function AdAccount() {
    classCallCheck(this, AdAccount);
    return possibleConstructorReturn(this, (AdAccount.__proto__ || Object.getPrototypeOf(AdAccount)).apply(this, arguments));
  }

  createClass(AdAccount, [{
    key: 'getActivities',
    value: function getActivities(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdActivity, fields, params, fetchFirstPage, '/activities');
    }
  }, {
    key: 'getAdPlacePageSets',
    value: function getAdPlacePageSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdPlacePageSet, fields, params, fetchFirstPage, '/ad_place_page_sets');
    }
  }, {
    key: 'createAdPlacePageSet',
    value: function createAdPlacePageSet(fields, params) {
      return this.createEdge('/ad_place_page_sets', fields, params, AdPlacePageSet);
    }
  }, {
    key: 'getAdAssetFeeds',
    value: function getAdAssetFeeds(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/adasset_feeds');
    }
  }, {
    key: 'getAdCreatives',
    value: function getAdCreatives(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdCreative, fields, params, fetchFirstPage, '/adcreatives');
    }
  }, {
    key: 'createAdCreative',
    value: function createAdCreative(fields, params) {
      return this.createEdge('/adcreatives', fields, params, AdCreative);
    }
  }, {
    key: 'getAdCreativesByLabels',
    value: function getAdCreativesByLabels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdCreative, fields, params, fetchFirstPage, '/adcreativesbylabels');
    }
  }, {
    key: 'deleteAdImages',
    value: function deleteAdImages(params) {
      return get$1(AdAccount.prototype.__proto__ || Object.getPrototypeOf(AdAccount.prototype), 'deleteEdge', this).call(this, '/adimages', params);
    }
  }, {
    key: 'getAdImages',
    value: function getAdImages(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdImage, fields, params, fetchFirstPage, '/adimages');
    }
  }, {
    key: 'createAdImage',
    value: function createAdImage(fields, params) {
      return this.createEdge('/adimages', fields, params, AdImage);
    }
  }, {
    key: 'getAdLabels',
    value: function getAdLabels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdLabel, fields, params, fetchFirstPage, '/adlabels');
    }
  }, {
    key: 'createAdLabel',
    value: function createAdLabel(fields, params) {
      return this.createEdge('/adlabels', fields, params, AdLabel);
    }
  }, {
    key: 'createAdLanguageAsset',
    value: function createAdLanguageAsset(fields, params) {
      return this.createEdge('/adlanguage_assets', fields, params);
    }
  }, {
    key: 'getAdReportRuns',
    value: function getAdReportRuns(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdReportRun, fields, params, fetchFirstPage, '/adreportruns');
    }
  }, {
    key: 'getAdReportSchedules',
    value: function getAdReportSchedules(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/adreportschedules');
    }
  }, {
    key: 'getAdRulesHistory',
    value: function getAdRulesHistory(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountAdRulesHistory, fields, params, fetchFirstPage, '/adrules_history');
    }
  }, {
    key: 'createAdRulesLibrary',
    value: function createAdRulesLibrary(fields, params) {
      return this.createEdge('/adrules_library', fields, params, AdRule);
    }
  }, {
    key: 'getAds',
    value: function getAds(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Ad, fields, params, fetchFirstPage, '/ads');
    }
  }, {
    key: 'createAd',
    value: function createAd(fields, params) {
      return this.createEdge('/ads', fields, params, Ad);
    }
  }, {
    key: 'getAdsByLabels',
    value: function getAdsByLabels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Ad, fields, params, fetchFirstPage, '/adsbylabels');
    }
  }, {
    key: 'getAdSets',
    value: function getAdSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdSet, fields, params, fetchFirstPage, '/adsets');
    }
  }, {
    key: 'createAdSet',
    value: function createAdSet(fields, params) {
      return this.createEdge('/adsets', fields, params, AdSet);
    }
  }, {
    key: 'getAdSetsByLabels',
    value: function getAdSetsByLabels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdSet, fields, params, fetchFirstPage, '/adsetsbylabels');
    }
  }, {
    key: 'getAdsPixels',
    value: function getAdsPixels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsPixel, fields, params, fetchFirstPage, '/adspixels');
    }
  }, {
    key: 'createAdsPixel',
    value: function createAdsPixel(fields, params) {
      return this.createEdge('/adspixels', fields, params, AdsPixel);
    }
  }, {
    key: 'getAdvertisableApplications',
    value: function getAdvertisableApplications(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/advertisable_applications');
    }
  }, {
    key: 'getAdVideos',
    value: function getAdVideos(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/advideos');
    }
  }, {
    key: 'createAdVideo',
    value: function createAdVideo(fields, params) {
      return this.createEdge('/advideos', fields, params);
    }
  }, {
    key: 'deleteAgencies',
    value: function deleteAgencies(params) {
      return get$1(AdAccount.prototype.__proto__ || Object.getPrototypeOf(AdAccount.prototype), 'deleteEdge', this).call(this, '/agencies', params);
    }
  }, {
    key: 'createAgency',
    value: function createAgency(fields, params) {
      return this.createEdge('/agencies', fields, params);
    }
  }, {
    key: 'getApplications',
    value: function getApplications(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/applications');
    }
  }, {
    key: 'deleteAssignedUsers',
    value: function deleteAssignedUsers(params) {
      return get$1(AdAccount.prototype.__proto__ || Object.getPrototypeOf(AdAccount.prototype), 'deleteEdge', this).call(this, '/assigned_users', params);
    }
  }, {
    key: 'getAssignedUsers',
    value: function getAssignedUsers(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AssignedUser, fields, params, fetchFirstPage, '/assigned_users');
    }
  }, {
    key: 'createAssignedUser',
    value: function createAssignedUser(fields, params) {
      return this.createEdge('/assigned_users', fields, params, AdAccount);
    }
  }, {
    key: 'createAsyncBatchRequest',
    value: function createAsyncBatchRequest(fields, params) {
      return this.createEdge('/async_batch_requests', fields, params, Campaign);
    }
  }, {
    key: 'getAsyncAdRequestSets',
    value: function getAsyncAdRequestSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAsyncRequestSet, fields, params, fetchFirstPage, '/asyncadrequestsets');
    }
  }, {
    key: 'createAsyncAdRequestSet',
    value: function createAsyncAdRequestSet(fields, params) {
      return this.createEdge('/asyncadrequestsets', fields, params, AdAsyncRequestSet);
    }
  }, {
    key: 'createAudienceReplace',
    value: function createAudienceReplace(fields, params) {
      return this.createEdge('/audiencereplace', fields, params);
    }
  }, {
    key: 'getBroadTargetingCategories',
    value: function getBroadTargetingCategories(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(BroadTargetingCategories, fields, params, fetchFirstPage, '/broadtargetingcategories');
    }
  }, {
    key: 'deleteCampaigns',
    value: function deleteCampaigns(params) {
      return get$1(AdAccount.prototype.__proto__ || Object.getPrototypeOf(AdAccount.prototype), 'deleteEdge', this).call(this, '/campaigns', params);
    }
  }, {
    key: 'getCampaigns',
    value: function getCampaigns(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Campaign, fields, params, fetchFirstPage, '/campaigns');
    }
  }, {
    key: 'createCampaign',
    value: function createCampaign(fields, params) {
      return this.createEdge('/campaigns', fields, params, Campaign);
    }
  }, {
    key: 'getCampaignsByLabels',
    value: function getCampaignsByLabels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(Campaign, fields, params, fetchFirstPage, '/campaignsbylabels');
    }
  }, {
    key: 'getCustomAudiences',
    value: function getCustomAudiences(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(CustomAudience, fields, params, fetchFirstPage, '/customaudiences');
    }
  }, {
    key: 'createCustomAudience',
    value: function createCustomAudience(fields, params) {
      return this.createEdge('/customaudiences', fields, params, CustomAudience);
    }
  }, {
    key: 'getCustomAudiencesTos',
    value: function getCustomAudiencesTos(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(CustomAudiencesTOS, fields, params, fetchFirstPage, '/customaudiencestos');
    }
  }, {
    key: 'createCustomConversion',
    value: function createCustomConversion(fields, params) {
      return this.createEdge('/customconversions', fields, params, CustomConversion);
    }
  }, {
    key: 'getDeliveryEstimate',
    value: function getDeliveryEstimate(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountDeliveryEstimate, fields, params, fetchFirstPage, '/delivery_estimate');
    }
  }, {
    key: 'getGeneratePreviews',
    value: function getGeneratePreviews(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdPreview, fields, params, fetchFirstPage, '/generatepreviews');
    }
  }, {
    key: 'getInsights',
    value: function getInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsInsights, fields, params, fetchFirstPage, '/insights');
    }
  }, {
    key: 'getInsightsAsync',
    value: function getInsightsAsync(fields, params) {
      return this.createEdge('/insights', fields, params, AdReportRun);
    }
  }, {
    key: 'getInstagramAccounts',
    value: function getInstagramAccounts(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/instagram_accounts');
    }
  }, {
    key: 'getLeadGenForms',
    value: function getLeadGenForms(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(LeadgenForm, fields, params, fetchFirstPage, '/leadgen_forms');
    }
  }, {
    key: 'getMinimumBudgets',
    value: function getMinimumBudgets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(MinimumBudget, fields, params, fetchFirstPage, '/minimum_budgets');
    }
  }, {
    key: 'getOfflineConversionDataSets',
    value: function getOfflineConversionDataSets(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(OfflineConversionDataSet, fields, params, fetchFirstPage, '/offline_conversion_data_sets');
    }
  }, {
    key: 'getOffsitePixels',
    value: function getOffsitePixels(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(OffsitePixel, fields, params, fetchFirstPage, '/offsitepixels');
    }
  }, {
    key: 'createOffsitePixel',
    value: function createOffsitePixel(fields, params) {
      return this.createEdge('/offsitepixels', fields, params, OffsitePixel);
    }
  }, {
    key: 'getPartnerCategories',
    value: function getPartnerCategories(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(PartnerCategory, fields, params, fetchFirstPage, '/partnercategories');
    }
  }, {
    key: 'getPartners',
    value: function getPartners(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdsDataPartner, fields, params, fetchFirstPage, '/partners');
    }
  }, {
    key: 'deletePendingUsers',
    value: function deletePendingUsers(params) {
      return get$1(AdAccount.prototype.__proto__ || Object.getPrototypeOf(AdAccount.prototype), 'deleteEdge', this).call(this, '/pending_users', params);
    }
  }, {
    key: 'createPendingUser',
    value: function createPendingUser(fields, params) {
      return this.createEdge('/pending_users', fields, params, AdAccount);
    }
  }, {
    key: 'createProductAudience',
    value: function createProductAudience(fields, params) {
      return this.createEdge('/product_audiences', fields, params, CustomAudience);
    }
  }, {
    key: 'getPublisherBlockLists',
    value: function getPublisherBlockLists(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AbstractObject, fields, params, fetchFirstPage, '/publisher_block_lists');
    }
  }, {
    key: 'createPublisherBlockList',
    value: function createPublisherBlockList(fields, params) {
      return this.createEdge('/publisher_block_lists', fields, params);
    }
  }, {
    key: 'getReachEstimate',
    value: function getReachEstimate(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ReachEstimate, fields, params, fetchFirstPage, '/reachestimate');
    }
  }, {
    key: 'getReachFrequencyPredictions',
    value: function getReachFrequencyPredictions(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ReachFrequencyPrediction, fields, params, fetchFirstPage, '/reachfrequencypredictions');
    }
  }, {
    key: 'createReachFrequencyPrediction',
    value: function createReachFrequencyPrediction(fields, params) {
      return this.createEdge('/reachfrequencypredictions', fields, params, ReachFrequencyPrediction);
    }
  }, {
    key: 'getRoas',
    value: function getRoas(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountRoas, fields, params, fetchFirstPage, '/roas');
    }
  }, {
    key: 'createSponsoredMessageAd',
    value: function createSponsoredMessageAd(fields, params) {
      return this.createEdge('/sponsored_message_ads', fields, params);
    }
  }, {
    key: 'getTargetingBrowse',
    value: function getTargetingBrowse(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountTargetingUnified, fields, params, fetchFirstPage, '/targetingbrowse');
    }
  }, {
    key: 'getTargetingSearch',
    value: function getTargetingSearch(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountTargetingUnified, fields, params, fetchFirstPage, '/targetingsearch');
    }
  }, {
    key: 'getTargetingSentenceLines',
    value: function getTargetingSentenceLines(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(TargetingSentenceLine, fields, params, fetchFirstPage, '/targetingsentencelines');
    }
  }, {
    key: 'getTargetingSuggestions',
    value: function getTargetingSuggestions(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountTargetingUnified, fields, params, fetchFirstPage, '/targetingsuggestions');
    }
  }, {
    key: 'getTargetingValidation',
    value: function getTargetingValidation(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountTargetingUnified, fields, params, fetchFirstPage, '/targetingvalidation');
    }
  }, {
    key: 'deleteTracking',
    value: function deleteTracking(params) {
      return get$1(AdAccount.prototype.__proto__ || Object.getPrototypeOf(AdAccount.prototype), 'deleteEdge', this).call(this, '/tracking', params);
    }
  }, {
    key: 'createTracking',
    value: function createTracking(fields, params) {
      return this.createEdge('/tracking', fields, params);
    }
  }, {
    key: 'deleteUserMatch',
    value: function deleteUserMatch(params) {
      return get$1(AdAccount.prototype.__proto__ || Object.getPrototypeOf(AdAccount.prototype), 'deleteEdge', this).call(this, '/user_match', params);
    }
  }, {
    key: 'createUserMatch',
    value: function createUserMatch(fields, params) {
      return this.createEdge('/user_match', fields, params);
    }
  }, {
    key: 'getUsers',
    value: function getUsers(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(AdAccountUser, fields, params, fetchFirstPage, '/users');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdAccount.prototype.__proto__ || Object.getPrototypeOf(AdAccount.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        account_status: 'account_status',
        age: 'age',
        agency_client_declaration: 'agency_client_declaration',
        amount_spent: 'amount_spent',
        attribution_spec: 'attribution_spec',
        balance: 'balance',
        business: 'business',
        business_city: 'business_city',
        business_country_code: 'business_country_code',
        business_name: 'business_name',
        business_state: 'business_state',
        business_street: 'business_street',
        business_street2: 'business_street2',
        business_zip: 'business_zip',
        can_create_brand_lift_study: 'can_create_brand_lift_study',
        capabilities: 'capabilities',
        created_time: 'created_time',
        currency: 'currency',
        disable_reason: 'disable_reason',
        end_advertiser: 'end_advertiser',
        end_advertiser_name: 'end_advertiser_name',
        extended_credit_invoice_group: 'extended_credit_invoice_group',
        failed_delivery_checks: 'failed_delivery_checks',
        funding_source: 'funding_source',
        funding_source_details: 'funding_source_details',
        has_migrated_permissions: 'has_migrated_permissions',
        id: 'id',
        io_number: 'io_number',
        is_attribution_spec_system_default: 'is_attribution_spec_system_default',
        is_direct_deals_enabled: 'is_direct_deals_enabled',
        is_notifications_enabled: 'is_notifications_enabled',
        is_personal: 'is_personal',
        is_prepay_account: 'is_prepay_account',
        is_tax_id_required: 'is_tax_id_required',
        line_numbers: 'line_numbers',
        media_agency: 'media_agency',
        min_campaign_group_spend_cap: 'min_campaign_group_spend_cap',
        min_daily_budget: 'min_daily_budget',
        name: 'name',
        offsite_pixels_tos_accepted: 'offsite_pixels_tos_accepted',
        owner: 'owner',
        partner: 'partner',
        rf_spec: 'rf_spec',
        show_checkout_experience: 'show_checkout_experience',
        spend_cap: 'spend_cap',
        tax_id: 'tax_id',
        tax_id_status: 'tax_id_status',
        tax_id_type: 'tax_id_type',
        timezone_id: 'timezone_id',
        timezone_name: 'timezone_name',
        timezone_offset_hours_utc: 'timezone_offset_hours_utc',
        tos_accepted: 'tos_accepted',
        user_role: 'user_role'
      });
    }
  }, {
    key: 'Role',
    get: function get() {
      return Object.freeze({
        admin: 'ADMIN',
        general_user: 'GENERAL_USER',
        reports_only: 'REPORTS_ONLY',
        instagram_advertiser: 'INSTAGRAM_ADVERTISER',
        instagram_manager: 'INSTAGRAM_MANAGER',
        creative: 'CREATIVE',
        fb_employee_dso_advertiser: 'FB_EMPLOYEE_DSO_ADVERTISER'
      });
    }
  }, {
    key: 'PermittedRoles',
    get: function get() {
      return Object.freeze({
        admin: 'ADMIN',
        general_user: 'GENERAL_USER',
        reports_only: 'REPORTS_ONLY',
        instagram_advertiser: 'INSTAGRAM_ADVERTISER',
        instagram_manager: 'INSTAGRAM_MANAGER',
        creative: 'CREATIVE',
        fb_employee_dso_advertiser: 'FB_EMPLOYEE_DSO_ADVERTISER'
      });
    }
  }]);
  return AdAccount;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAccountContextualTargeting
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAccountContextualTargeting = function (_AbstractCrudObject) {
  inherits(AdAccountContextualTargeting, _AbstractCrudObject);

  function AdAccountContextualTargeting() {
    classCallCheck(this, AdAccountContextualTargeting);
    return possibleConstructorReturn(this, (AdAccountContextualTargeting.__proto__ || Object.getPrototypeOf(AdAccountContextualTargeting)).apply(this, arguments));
  }

  createClass(AdAccountContextualTargeting, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({});
    }
  }]);
  return AdAccountContextualTargeting;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpec = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpec, _AbstractCrudObject);

  function AdAssetFeedSpec() {
    classCallCheck(this, AdAssetFeedSpec);
    return possibleConstructorReturn(this, (AdAssetFeedSpec.__proto__ || Object.getPrototypeOf(AdAssetFeedSpec)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ad_formats: 'ad_formats',
        asset_customization_rules: 'asset_customization_rules',
        autotranslate: 'autotranslate',
        bodies: 'bodies',
        call_to_action_types: 'call_to_action_types',
        captions: 'captions',
        descriptions: 'descriptions',
        groups: 'groups',
        images: 'images',
        link_urls: 'link_urls',
        optimization_type: 'optimization_type',
        titles: 'titles',
        videos: 'videos'
      });
    }
  }, {
    key: 'CallToActionTypes',
    get: function get() {
      return Object.freeze({
        open_link: 'OPEN_LINK',
        like_page: 'LIKE_PAGE',
        shop_now: 'SHOP_NOW',
        play_game: 'PLAY_GAME',
        install_app: 'INSTALL_APP',
        use_app: 'USE_APP',
        call: 'CALL',
        call_me: 'CALL_ME',
        install_mobile_app: 'INSTALL_MOBILE_APP',
        use_mobile_app: 'USE_MOBILE_APP',
        mobile_download: 'MOBILE_DOWNLOAD',
        book_travel: 'BOOK_TRAVEL',
        listen_music: 'LISTEN_MUSIC',
        watch_video: 'WATCH_VIDEO',
        learn_more: 'LEARN_MORE',
        sign_up: 'SIGN_UP',
        download: 'DOWNLOAD',
        watch_more: 'WATCH_MORE',
        no_button: 'NO_BUTTON',
        visit_pages_feed: 'VISIT_PAGES_FEED',
        apply_now: 'APPLY_NOW',
        buy_now: 'BUY_NOW',
        get_offer: 'GET_OFFER',
        get_offer_view: 'GET_OFFER_VIEW',
        buy_tickets: 'BUY_TICKETS',
        update_app: 'UPDATE_APP',
        get_directions: 'GET_DIRECTIONS',
        buy: 'BUY',
        message_page: 'MESSAGE_PAGE',
        donate: 'DONATE',
        subscribe: 'SUBSCRIBE',
        say_thanks: 'SAY_THANKS',
        sell_now: 'SELL_NOW',
        share: 'SHARE',
        donate_now: 'DONATE_NOW',
        get_quote: 'GET_QUOTE',
        contact_us: 'CONTACT_US',
        order_now: 'ORDER_NOW',
        add_to_cart: 'ADD_TO_CART',
        video_annotation: 'VIDEO_ANNOTATION',
        moments: 'MOMENTS',
        record_now: 'RECORD_NOW',
        get_showtimes: 'GET_SHOWTIMES',
        listen_now: 'LISTEN_NOW',
        event_rsvp: 'EVENT_RSVP',
        whatsapp_message: 'WHATSAPP_MESSAGE'
      });
    }
  }]);
  return AdAssetFeedSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecAssetLabel
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecAssetLabel = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecAssetLabel, _AbstractCrudObject);

  function AdAssetFeedSpecAssetLabel() {
    classCallCheck(this, AdAssetFeedSpecAssetLabel);
    return possibleConstructorReturn(this, (AdAssetFeedSpecAssetLabel.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecAssetLabel)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecAssetLabel, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        name: 'name'
      });
    }
  }]);
  return AdAssetFeedSpecAssetLabel;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecBody
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecBody = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecBody, _AbstractCrudObject);

  function AdAssetFeedSpecBody() {
    classCallCheck(this, AdAssetFeedSpecBody);
    return possibleConstructorReturn(this, (AdAssetFeedSpecBody.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecBody)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecBody, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adlabels: 'adlabels',
        text: 'text',
        url_tags: 'url_tags'
      });
    }
  }]);
  return AdAssetFeedSpecBody;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecCaption
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecCaption = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecCaption, _AbstractCrudObject);

  function AdAssetFeedSpecCaption() {
    classCallCheck(this, AdAssetFeedSpecCaption);
    return possibleConstructorReturn(this, (AdAssetFeedSpecCaption.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecCaption)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecCaption, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adlabels: 'adlabels',
        text: 'text',
        url_tags: 'url_tags'
      });
    }
  }]);
  return AdAssetFeedSpecCaption;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecDescription
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecDescription = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecDescription, _AbstractCrudObject);

  function AdAssetFeedSpecDescription() {
    classCallCheck(this, AdAssetFeedSpecDescription);
    return possibleConstructorReturn(this, (AdAssetFeedSpecDescription.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecDescription)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecDescription, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adlabels: 'adlabels',
        text: 'text',
        url_tags: 'url_tags'
      });
    }
  }]);
  return AdAssetFeedSpecDescription;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecGroupRule
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecGroupRule = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecGroupRule, _AbstractCrudObject);

  function AdAssetFeedSpecGroupRule() {
    classCallCheck(this, AdAssetFeedSpecGroupRule);
    return possibleConstructorReturn(this, (AdAssetFeedSpecGroupRule.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecGroupRule)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecGroupRule, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        body_label: 'body_label',
        caption_label: 'caption_label',
        description_label: 'description_label',
        image_label: 'image_label',
        link_url_label: 'link_url_label',
        title_label: 'title_label',
        video_label: 'video_label'
      });
    }
  }]);
  return AdAssetFeedSpecGroupRule;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecImage
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecImage = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecImage, _AbstractCrudObject);

  function AdAssetFeedSpecImage() {
    classCallCheck(this, AdAssetFeedSpecImage);
    return possibleConstructorReturn(this, (AdAssetFeedSpecImage.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecImage)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecImage, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adlabels: 'adlabels',
        hash: 'hash',
        image_crops: 'image_crops',
        url: 'url',
        url_tags: 'url_tags'
      });
    }
  }]);
  return AdAssetFeedSpecImage;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecLinkURL
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecLinkURL = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecLinkURL, _AbstractCrudObject);

  function AdAssetFeedSpecLinkURL() {
    classCallCheck(this, AdAssetFeedSpecLinkURL);
    return possibleConstructorReturn(this, (AdAssetFeedSpecLinkURL.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecLinkURL)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecLinkURL, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adlabels: 'adlabels',
        carousel_see_more_url: 'carousel_see_more_url',
        deeplink_url: 'deeplink_url',
        display_url: 'display_url',
        url_tags: 'url_tags',
        website_url: 'website_url'
      });
    }
  }]);
  return AdAssetFeedSpecLinkURL;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecTitle
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecTitle = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecTitle, _AbstractCrudObject);

  function AdAssetFeedSpecTitle() {
    classCallCheck(this, AdAssetFeedSpecTitle);
    return possibleConstructorReturn(this, (AdAssetFeedSpecTitle.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecTitle)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecTitle, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adlabels: 'adlabels',
        text: 'text',
        url_tags: 'url_tags'
      });
    }
  }]);
  return AdAssetFeedSpecTitle;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAssetFeedSpecVideo
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAssetFeedSpecVideo = function (_AbstractCrudObject) {
  inherits(AdAssetFeedSpecVideo, _AbstractCrudObject);

  function AdAssetFeedSpecVideo() {
    classCallCheck(this, AdAssetFeedSpecVideo);
    return possibleConstructorReturn(this, (AdAssetFeedSpecVideo.__proto__ || Object.getPrototypeOf(AdAssetFeedSpecVideo)).apply(this, arguments));
  }

  createClass(AdAssetFeedSpecVideo, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adlabels: 'adlabels',
        caption_ids: 'caption_ids',
        thumbnail_hash: 'thumbnail_hash',
        thumbnail_url: 'thumbnail_url',
        url_tags: 'url_tags',
        video_id: 'video_id'
      });
    }
  }]);
  return AdAssetFeedSpecVideo;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdAsyncRequestSetNotificationResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdAsyncRequestSetNotificationResult = function (_AbstractCrudObject) {
  inherits(AdAsyncRequestSetNotificationResult, _AbstractCrudObject);

  function AdAsyncRequestSetNotificationResult() {
    classCallCheck(this, AdAsyncRequestSetNotificationResult);
    return possibleConstructorReturn(this, (AdAsyncRequestSetNotificationResult.__proto__ || Object.getPrototypeOf(AdAsyncRequestSetNotificationResult)).apply(this, arguments));
  }

  createClass(AdAsyncRequestSetNotificationResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        response: 'response',
        status: 'status'
      });
    }
  }]);
  return AdAsyncRequestSetNotificationResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCampaignFrequencyControlSpecs
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCampaignFrequencyControlSpecs = function (_AbstractCrudObject) {
  inherits(AdCampaignFrequencyControlSpecs, _AbstractCrudObject);

  function AdCampaignFrequencyControlSpecs() {
    classCallCheck(this, AdCampaignFrequencyControlSpecs);
    return possibleConstructorReturn(this, (AdCampaignFrequencyControlSpecs.__proto__ || Object.getPrototypeOf(AdCampaignFrequencyControlSpecs)).apply(this, arguments));
  }

  createClass(AdCampaignFrequencyControlSpecs, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        event: 'event',
        interval_days: 'interval_days',
        max_frequency: 'max_frequency'
      });
    }
  }]);
  return AdCampaignFrequencyControlSpecs;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeCollectionThumbnailInfo
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeCollectionThumbnailInfo = function (_AbstractCrudObject) {
  inherits(AdCreativeCollectionThumbnailInfo, _AbstractCrudObject);

  function AdCreativeCollectionThumbnailInfo() {
    classCallCheck(this, AdCreativeCollectionThumbnailInfo);
    return possibleConstructorReturn(this, (AdCreativeCollectionThumbnailInfo.__proto__ || Object.getPrototypeOf(AdCreativeCollectionThumbnailInfo)).apply(this, arguments));
  }

  createClass(AdCreativeCollectionThumbnailInfo, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        element_child_index: 'element_child_index',
        element_crops: 'element_crops',
        element_id: 'element_id'
      });
    }
  }]);
  return AdCreativeCollectionThumbnailInfo;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeLinkData
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeLinkData = function (_AbstractCrudObject) {
  inherits(AdCreativeLinkData, _AbstractCrudObject);

  function AdCreativeLinkData() {
    classCallCheck(this, AdCreativeLinkData);
    return possibleConstructorReturn(this, (AdCreativeLinkData.__proto__ || Object.getPrototypeOf(AdCreativeLinkData)).apply(this, arguments));
  }

  createClass(AdCreativeLinkData, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        additional_image_index: 'additional_image_index',
        app_link_spec: 'app_link_spec',
        attachment_style: 'attachment_style',
        branded_content_shared_to_sponsor_status: 'branded_content_shared_to_sponsor_status',
        branded_content_sponsor_page_id: 'branded_content_sponsor_page_id',
        branded_content_sponsor_relationship: 'branded_content_sponsor_relationship',
        call_to_action: 'call_to_action',
        caption: 'caption',
        child_attachments: 'child_attachments',
        collection_thumbnails: 'collection_thumbnails',
        custom_overlay_spec: 'custom_overlay_spec',
        customization_rules_spec: 'customization_rules_spec',
        description: 'description',
        event_id: 'event_id',
        force_single_link: 'force_single_link',
        format_option: 'format_option',
        image_crops: 'image_crops',
        image_hash: 'image_hash',
        image_overlay_spec: 'image_overlay_spec',
        link: 'link',
        message: 'message',
        multi_share_end_card: 'multi_share_end_card',
        multi_share_optimized: 'multi_share_optimized',
        name: 'name',
        offer_id: 'offer_id',
        page_welcome_message: 'page_welcome_message',
        picture: 'picture',
        post_click_configuration: 'post_click_configuration',
        preferred_image_tags: 'preferred_image_tags',
        retailer_item_ids: 'retailer_item_ids',
        show_multiple_images: 'show_multiple_images'
      });
    }
  }, {
    key: 'AttachmentStyle',
    get: function get() {
      return Object.freeze({
        link: 'link',
        default: 'default'
      });
    }
  }, {
    key: 'FormatOption',
    get: function get() {
      return Object.freeze({
        carousel_images_multi_items: 'carousel_images_multi_items',
        carousel_images_single_item: 'carousel_images_single_item',
        carousel_slideshows: 'carousel_slideshows',
        single_image: 'single_image'
      });
    }
  }]);
  return AdCreativeLinkData;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeLinkDataAppLinkSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeLinkDataAppLinkSpec = function (_AbstractCrudObject) {
  inherits(AdCreativeLinkDataAppLinkSpec, _AbstractCrudObject);

  function AdCreativeLinkDataAppLinkSpec() {
    classCallCheck(this, AdCreativeLinkDataAppLinkSpec);
    return possibleConstructorReturn(this, (AdCreativeLinkDataAppLinkSpec.__proto__ || Object.getPrototypeOf(AdCreativeLinkDataAppLinkSpec)).apply(this, arguments));
  }

  createClass(AdCreativeLinkDataAppLinkSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        android: 'android',
        ios: 'ios',
        ipad: 'ipad',
        iphone: 'iphone'
      });
    }
  }]);
  return AdCreativeLinkDataAppLinkSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeLinkDataCallToAction
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeLinkDataCallToAction = function (_AbstractCrudObject) {
  inherits(AdCreativeLinkDataCallToAction, _AbstractCrudObject);

  function AdCreativeLinkDataCallToAction() {
    classCallCheck(this, AdCreativeLinkDataCallToAction);
    return possibleConstructorReturn(this, (AdCreativeLinkDataCallToAction.__proto__ || Object.getPrototypeOf(AdCreativeLinkDataCallToAction)).apply(this, arguments));
  }

  createClass(AdCreativeLinkDataCallToAction, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        type: 'type',
        value: 'value'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        open_link: 'OPEN_LINK',
        like_page: 'LIKE_PAGE',
        shop_now: 'SHOP_NOW',
        play_game: 'PLAY_GAME',
        install_app: 'INSTALL_APP',
        use_app: 'USE_APP',
        call: 'CALL',
        call_me: 'CALL_ME',
        install_mobile_app: 'INSTALL_MOBILE_APP',
        use_mobile_app: 'USE_MOBILE_APP',
        mobile_download: 'MOBILE_DOWNLOAD',
        book_travel: 'BOOK_TRAVEL',
        listen_music: 'LISTEN_MUSIC',
        watch_video: 'WATCH_VIDEO',
        learn_more: 'LEARN_MORE',
        sign_up: 'SIGN_UP',
        download: 'DOWNLOAD',
        watch_more: 'WATCH_MORE',
        no_button: 'NO_BUTTON',
        visit_pages_feed: 'VISIT_PAGES_FEED',
        apply_now: 'APPLY_NOW',
        buy_now: 'BUY_NOW',
        get_offer: 'GET_OFFER',
        get_offer_view: 'GET_OFFER_VIEW',
        buy_tickets: 'BUY_TICKETS',
        update_app: 'UPDATE_APP',
        get_directions: 'GET_DIRECTIONS',
        buy: 'BUY',
        message_page: 'MESSAGE_PAGE',
        donate: 'DONATE',
        subscribe: 'SUBSCRIBE',
        say_thanks: 'SAY_THANKS',
        sell_now: 'SELL_NOW',
        share: 'SHARE',
        donate_now: 'DONATE_NOW',
        get_quote: 'GET_QUOTE',
        contact_us: 'CONTACT_US',
        order_now: 'ORDER_NOW',
        add_to_cart: 'ADD_TO_CART',
        video_annotation: 'VIDEO_ANNOTATION',
        moments: 'MOMENTS',
        record_now: 'RECORD_NOW',
        get_showtimes: 'GET_SHOWTIMES',
        listen_now: 'LISTEN_NOW',
        event_rsvp: 'EVENT_RSVP',
        whatsapp_message: 'WHATSAPP_MESSAGE'
      });
    }
  }]);
  return AdCreativeLinkDataCallToAction;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeLinkDataCallToActionValue
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeLinkDataCallToActionValue = function (_AbstractCrudObject) {
  inherits(AdCreativeLinkDataCallToActionValue, _AbstractCrudObject);

  function AdCreativeLinkDataCallToActionValue() {
    classCallCheck(this, AdCreativeLinkDataCallToActionValue);
    return possibleConstructorReturn(this, (AdCreativeLinkDataCallToActionValue.__proto__ || Object.getPrototypeOf(AdCreativeLinkDataCallToActionValue)).apply(this, arguments));
  }

  createClass(AdCreativeLinkDataCallToActionValue, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        app_destination: 'app_destination',
        app_link: 'app_link',
        application: 'application',
        event_id: 'event_id',
        lead_gen_form_id: 'lead_gen_form_id',
        link: 'link',
        link_caption: 'link_caption',
        link_format: 'link_format',
        page: 'page',
        product_link: 'product_link'
      });
    }
  }]);
  return AdCreativeLinkDataCallToActionValue;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeLinkDataChildAttachment
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeLinkDataChildAttachment = function (_AbstractCrudObject) {
  inherits(AdCreativeLinkDataChildAttachment, _AbstractCrudObject);

  function AdCreativeLinkDataChildAttachment() {
    classCallCheck(this, AdCreativeLinkDataChildAttachment);
    return possibleConstructorReturn(this, (AdCreativeLinkDataChildAttachment.__proto__ || Object.getPrototypeOf(AdCreativeLinkDataChildAttachment)).apply(this, arguments));
  }

  createClass(AdCreativeLinkDataChildAttachment, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        call_to_action: 'call_to_action',
        caption: 'caption',
        description: 'description',
        image_crops: 'image_crops',
        image_hash: 'image_hash',
        link: 'link',
        name: 'name',
        picture: 'picture',
        place_data: 'place_data',
        static_card: 'static_card',
        video_id: 'video_id'
      });
    }
  }]);
  return AdCreativeLinkDataChildAttachment;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeLinkDataCustomOverlaySpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeLinkDataCustomOverlaySpec = function (_AbstractCrudObject) {
  inherits(AdCreativeLinkDataCustomOverlaySpec, _AbstractCrudObject);

  function AdCreativeLinkDataCustomOverlaySpec() {
    classCallCheck(this, AdCreativeLinkDataCustomOverlaySpec);
    return possibleConstructorReturn(this, (AdCreativeLinkDataCustomOverlaySpec.__proto__ || Object.getPrototypeOf(AdCreativeLinkDataCustomOverlaySpec)).apply(this, arguments));
  }

  createClass(AdCreativeLinkDataCustomOverlaySpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        background_color: 'background_color',
        float_with_margin: 'float_with_margin',
        font: 'font',
        option: 'option',
        position: 'position',
        render_with_icon: 'render_with_icon',
        template: 'template',
        text_color: 'text_color'
      });
    }
  }, {
    key: 'BackgroundColor',
    get: function get() {
      return Object.freeze({
        background_ffffff: 'background_ffffff',
        background_e50900: 'background_e50900',
        background_f78400: 'background_f78400',
        background_00af4c: 'background_00af4c',
        background_0090ff: 'background_0090ff',
        background_755dde: 'background_755dde',
        background_f23474: 'background_f23474',
        background_595959: 'background_595959',
        background_000000: 'background_000000'
      });
    }
  }, {
    key: 'Font',
    get: function get() {
      return Object.freeze({
        droid_serif_regular: 'droid_serif_regular',
        lato_regular: 'lato_regular',
        nunito_sans_bold: 'nunito_sans_bold',
        open_sans_bold: 'open_sans_bold',
        pt_serif_bold: 'pt_serif_bold',
        roboto_medium: 'roboto_medium',
        roboto_condensed_regular: 'roboto_condensed_regular',
        noto_sans_regular: 'noto_sans_regular'
      });
    }
  }, {
    key: 'Option',
    get: function get() {
      return Object.freeze({
        bank_transfer: 'bank_transfer',
        boleto: 'boleto',
        discount_with_boleto: 'discount_with_boleto',
        cash_on_delivery: 'cash_on_delivery',
        home_delivery: 'home_delivery',
        free_shipping: 'free_shipping',
        inventory: 'inventory'
      });
    }
  }, {
    key: 'Position',
    get: function get() {
      return Object.freeze({
        top_left: 'top_left',
        top_right: 'top_right',
        bottom_left: 'bottom_left',
        bottom_right: 'bottom_right'
      });
    }
  }, {
    key: 'Template',
    get: function get() {
      return Object.freeze({
        pill_with_text: 'pill_with_text'
      });
    }
  }, {
    key: 'TextColor',
    get: function get() {
      return Object.freeze({
        text_ffffff: 'text_ffffff',
        text_c91b00: 'text_c91b00',
        text_f78400: 'text_f78400',
        text_009c2a: 'text_009c2a',
        text_007ad0: 'text_007ad0',
        text_755dde: 'text_755dde',
        text_f23474: 'text_f23474',
        text_646464: 'text_646464',
        text_000000: 'text_000000'
      });
    }
  }]);
  return AdCreativeLinkDataCustomOverlaySpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeLinkDataImageOverlaySpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeLinkDataImageOverlaySpec = function (_AbstractCrudObject) {
  inherits(AdCreativeLinkDataImageOverlaySpec, _AbstractCrudObject);

  function AdCreativeLinkDataImageOverlaySpec() {
    classCallCheck(this, AdCreativeLinkDataImageOverlaySpec);
    return possibleConstructorReturn(this, (AdCreativeLinkDataImageOverlaySpec.__proto__ || Object.getPrototypeOf(AdCreativeLinkDataImageOverlaySpec)).apply(this, arguments));
  }

  createClass(AdCreativeLinkDataImageOverlaySpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        custom_text_type: 'custom_text_type',
        float_with_margin: 'float_with_margin',
        overlay_template: 'overlay_template',
        position: 'position',
        text_font: 'text_font',
        text_template_tags: 'text_template_tags',
        text_type: 'text_type',
        theme_color: 'theme_color'
      });
    }
  }, {
    key: 'CustomTextType',
    get: function get() {
      return Object.freeze({
        free_shipping: 'free_shipping'
      });
    }
  }, {
    key: 'OverlayTemplate',
    get: function get() {
      return Object.freeze({
        pill_with_text: 'pill_with_text',
        circle_with_text: 'circle_with_text',
        triangle_with_text: 'triangle_with_text'
      });
    }
  }, {
    key: 'Position',
    get: function get() {
      return Object.freeze({
        top_left: 'top_left',
        top_right: 'top_right',
        bottom_left: 'bottom_left',
        bottom_right: 'bottom_right'
      });
    }
  }, {
    key: 'TextFont',
    get: function get() {
      return Object.freeze({
        droid_serif_regular: 'droid_serif_regular',
        lato_regular: 'lato_regular',
        nunito_sans_bold: 'nunito_sans_bold',
        open_sans_bold: 'open_sans_bold',
        open_sans_condensed_bold: 'open_sans_condensed_bold',
        pt_serif_bold: 'pt_serif_bold',
        roboto_medium: 'roboto_medium',
        roboto_condensed_regular: 'roboto_condensed_regular',
        noto_sans_regular: 'noto_sans_regular',
        dynads_hybrid_bold: 'dynads_hybrid_bold'
      });
    }
  }, {
    key: 'TextType',
    get: function get() {
      return Object.freeze({
        price: 'price',
        strikethrough_price: 'strikethrough_price',
        percentage_off: 'percentage_off',
        custom: 'custom',
        from_price: 'from_price'
      });
    }
  }, {
    key: 'ThemeColor',
    get: function get() {
      return Object.freeze({
        background_e50900_text_ffffff: 'background_e50900_text_ffffff',
        background_f78400_text_ffffff: 'background_f78400_text_ffffff',
        background_00af4c_text_ffffff: 'background_00af4c_text_ffffff',
        background_0090ff_text_ffffff: 'background_0090ff_text_ffffff',
        background_755dde_text_ffffff: 'background_755dde_text_ffffff',
        background_f23474_text_ffffff: 'background_f23474_text_ffffff',
        background_595959_text_ffffff: 'background_595959_text_ffffff',
        background_000000_text_ffffff: 'background_000000_text_ffffff',
        background_ffffff_text_c91b00: 'background_ffffff_text_c91b00',
        background_ffffff_text_f78400: 'background_ffffff_text_f78400',
        background_ffffff_text_009c2a: 'background_ffffff_text_009c2a',
        background_ffffff_text_007ad0: 'background_ffffff_text_007ad0',
        background_ffffff_text_755dde: 'background_ffffff_text_755dde',
        background_ffffff_text_f23474: 'background_ffffff_text_f23474',
        background_ffffff_text_646464: 'background_ffffff_text_646464',
        background_ffffff_text_000000: 'background_ffffff_text_000000'
      });
    }
  }]);
  return AdCreativeLinkDataImageOverlaySpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeObjectStorySpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeObjectStorySpec = function (_AbstractCrudObject) {
  inherits(AdCreativeObjectStorySpec, _AbstractCrudObject);

  function AdCreativeObjectStorySpec() {
    classCallCheck(this, AdCreativeObjectStorySpec);
    return possibleConstructorReturn(this, (AdCreativeObjectStorySpec.__proto__ || Object.getPrototypeOf(AdCreativeObjectStorySpec)).apply(this, arguments));
  }

  createClass(AdCreativeObjectStorySpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        instagram_actor_id: 'instagram_actor_id',
        link_data: 'link_data',
        page_id: 'page_id',
        photo_data: 'photo_data',
        template_data: 'template_data',
        text_data: 'text_data',
        video_data: 'video_data'
      });
    }
  }]);
  return AdCreativeObjectStorySpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativePhotoData
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativePhotoData = function (_AbstractCrudObject) {
  inherits(AdCreativePhotoData, _AbstractCrudObject);

  function AdCreativePhotoData() {
    classCallCheck(this, AdCreativePhotoData);
    return possibleConstructorReturn(this, (AdCreativePhotoData.__proto__ || Object.getPrototypeOf(AdCreativePhotoData)).apply(this, arguments));
  }

  createClass(AdCreativePhotoData, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        branded_content_shared_to_sponsor_status: 'branded_content_shared_to_sponsor_status',
        branded_content_sponsor_page_id: 'branded_content_sponsor_page_id',
        branded_content_sponsor_relationship: 'branded_content_sponsor_relationship',
        caption: 'caption',
        image_hash: 'image_hash',
        page_welcome_message: 'page_welcome_message',
        url: 'url'
      });
    }
  }]);
  return AdCreativePhotoData;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativePlaceData
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativePlaceData = function (_AbstractCrudObject) {
  inherits(AdCreativePlaceData, _AbstractCrudObject);

  function AdCreativePlaceData() {
    classCallCheck(this, AdCreativePlaceData);
    return possibleConstructorReturn(this, (AdCreativePlaceData.__proto__ || Object.getPrototypeOf(AdCreativePlaceData)).apply(this, arguments));
  }

  createClass(AdCreativePlaceData, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        address_string: 'address_string',
        label: 'label',
        latitude: 'latitude',
        location_source_id: 'location_source_id',
        longitude: 'longitude',
        type: 'type'
      });
    }
  }]);
  return AdCreativePlaceData;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativePostClickConfiguration
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativePostClickConfiguration = function (_AbstractCrudObject) {
  inherits(AdCreativePostClickConfiguration, _AbstractCrudObject);

  function AdCreativePostClickConfiguration() {
    classCallCheck(this, AdCreativePostClickConfiguration);
    return possibleConstructorReturn(this, (AdCreativePostClickConfiguration.__proto__ || Object.getPrototypeOf(AdCreativePostClickConfiguration)).apply(this, arguments));
  }

  createClass(AdCreativePostClickConfiguration, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        post_click_item_description: 'post_click_item_description',
        post_click_item_headline: 'post_click_item_headline'
      });
    }
  }]);
  return AdCreativePostClickConfiguration;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeTextData
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeTextData = function (_AbstractCrudObject) {
  inherits(AdCreativeTextData, _AbstractCrudObject);

  function AdCreativeTextData() {
    classCallCheck(this, AdCreativeTextData);
    return possibleConstructorReturn(this, (AdCreativeTextData.__proto__ || Object.getPrototypeOf(AdCreativeTextData)).apply(this, arguments));
  }

  createClass(AdCreativeTextData, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        message: 'message'
      });
    }
  }]);
  return AdCreativeTextData;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdCreativeVideoData
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdCreativeVideoData = function (_AbstractCrudObject) {
  inherits(AdCreativeVideoData, _AbstractCrudObject);

  function AdCreativeVideoData() {
    classCallCheck(this, AdCreativeVideoData);
    return possibleConstructorReturn(this, (AdCreativeVideoData.__proto__ || Object.getPrototypeOf(AdCreativeVideoData)).apply(this, arguments));
  }

  createClass(AdCreativeVideoData, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        additional_image_index: 'additional_image_index',
        branded_content_shared_to_sponsor_status: 'branded_content_shared_to_sponsor_status',
        branded_content_sponsor_page_id: 'branded_content_sponsor_page_id',
        branded_content_sponsor_relationship: 'branded_content_sponsor_relationship',
        call_to_action: 'call_to_action',
        collection_thumbnails: 'collection_thumbnails',
        image_hash: 'image_hash',
        image_url: 'image_url',
        link_description: 'link_description',
        message: 'message',
        offer_id: 'offer_id',
        page_welcome_message: 'page_welcome_message',
        post_click_configuration: 'post_click_configuration',
        retailer_item_ids: 'retailer_item_ids',
        targeting: 'targeting',
        title: 'title',
        video_id: 'video_id'
      });
    }
  }]);
  return AdCreativeVideoData;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdPromotedObject
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdPromotedObject = function (_AbstractCrudObject) {
  inherits(AdPromotedObject, _AbstractCrudObject);

  function AdPromotedObject() {
    classCallCheck(this, AdPromotedObject);
    return possibleConstructorReturn(this, (AdPromotedObject.__proto__ || Object.getPrototypeOf(AdPromotedObject)).apply(this, arguments));
  }

  createClass(AdPromotedObject, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        application_id: 'application_id',
        custom_event_type: 'custom_event_type',
        event_id: 'event_id',
        object_store_url: 'object_store_url',
        offer_id: 'offer_id',
        page_id: 'page_id',
        pixel_id: 'pixel_id',
        place_page_set_id: 'place_page_set_id',
        product_catalog_id: 'product_catalog_id',
        product_set_id: 'product_set_id'
      });
    }
  }, {
    key: 'CustomEventType',
    get: function get() {
      return Object.freeze({
        rate: 'RATE',
        tutorial_completion: 'TUTORIAL_COMPLETION',
        add_to_cart: 'ADD_TO_CART',
        add_to_wishlist: 'ADD_TO_WISHLIST',
        initiated_checkout: 'INITIATED_CHECKOUT',
        add_payment_info: 'ADD_PAYMENT_INFO',
        purchase: 'PURCHASE',
        lead: 'LEAD',
        complete_registration: 'COMPLETE_REGISTRATION',
        content_view: 'CONTENT_VIEW',
        search: 'SEARCH',
        level_achieved: 'LEVEL_ACHIEVED',
        achievement_unlocked: 'ACHIEVEMENT_UNLOCKED',
        spent_credits: 'SPENT_CREDITS',
        other: 'OTHER'
      });
    }
  }]);
  return AdPromotedObject;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRecommendation
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRecommendation = function (_AbstractCrudObject) {
  inherits(AdRecommendation, _AbstractCrudObject);

  function AdRecommendation() {
    classCallCheck(this, AdRecommendation);
    return possibleConstructorReturn(this, (AdRecommendation.__proto__ || Object.getPrototypeOf(AdRecommendation)).apply(this, arguments));
  }

  createClass(AdRecommendation, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        blame_field: 'blame_field',
        code: 'code',
        confidence: 'confidence',
        importance: 'importance',
        message: 'message',
        recommendation_data: 'recommendation_data',
        title: 'title'
      });
    }
  }, {
    key: 'Confidence',
    get: function get() {
      return Object.freeze({
        high: 'HIGH',
        medium: 'MEDIUM',
        low: 'LOW'
      });
    }
  }, {
    key: 'Importance',
    get: function get() {
      return Object.freeze({
        high: 'HIGH',
        medium: 'MEDIUM',
        low: 'LOW'
      });
    }
  }]);
  return AdRecommendation;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRecommendationData
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRecommendationData = function (_AbstractCrudObject) {
  inherits(AdRecommendationData, _AbstractCrudObject);

  function AdRecommendationData() {
    classCallCheck(this, AdRecommendationData);
    return possibleConstructorReturn(this, (AdRecommendationData.__proto__ || Object.getPrototypeOf(AdRecommendationData)).apply(this, arguments));
  }

  createClass(AdRecommendationData, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        link: 'link'
      });
    }
  }]);
  return AdRecommendationData;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleEvaluationSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleEvaluationSpec = function (_AbstractCrudObject) {
  inherits(AdRuleEvaluationSpec, _AbstractCrudObject);

  function AdRuleEvaluationSpec() {
    classCallCheck(this, AdRuleEvaluationSpec);
    return possibleConstructorReturn(this, (AdRuleEvaluationSpec.__proto__ || Object.getPrototypeOf(AdRuleEvaluationSpec)).apply(this, arguments));
  }

  createClass(AdRuleEvaluationSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        evaluation_type: 'evaluation_type',
        filters: 'filters',
        trigger: 'trigger'
      });
    }
  }, {
    key: 'EvaluationType',
    get: function get() {
      return Object.freeze({
        schedule: 'SCHEDULE',
        trigger: 'TRIGGER'
      });
    }
  }]);
  return AdRuleEvaluationSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleExecutionOptions
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleExecutionOptions = function (_AbstractCrudObject) {
  inherits(AdRuleExecutionOptions, _AbstractCrudObject);

  function AdRuleExecutionOptions() {
    classCallCheck(this, AdRuleExecutionOptions);
    return possibleConstructorReturn(this, (AdRuleExecutionOptions.__proto__ || Object.getPrototypeOf(AdRuleExecutionOptions)).apply(this, arguments));
  }

  createClass(AdRuleExecutionOptions, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        field: 'field',
        operator: 'operator',
        value: 'value'
      });
    }
  }, {
    key: 'Operator',
    get: function get() {
      return Object.freeze({
        equal: 'EQUAL',
        in: 'IN'
      });
    }
  }]);
  return AdRuleExecutionOptions;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleExecutionSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleExecutionSpec = function (_AbstractCrudObject) {
  inherits(AdRuleExecutionSpec, _AbstractCrudObject);

  function AdRuleExecutionSpec() {
    classCallCheck(this, AdRuleExecutionSpec);
    return possibleConstructorReturn(this, (AdRuleExecutionSpec.__proto__ || Object.getPrototypeOf(AdRuleExecutionSpec)).apply(this, arguments));
  }

  createClass(AdRuleExecutionSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        execution_options: 'execution_options',
        execution_type: 'execution_type'
      });
    }
  }, {
    key: 'ExecutionType',
    get: function get() {
      return Object.freeze({
        ping_endpoint: 'PING_ENDPOINT',
        notification: 'NOTIFICATION',
        pause: 'PAUSE',
        rebalance_budget: 'REBALANCE_BUDGET',
        change_budget: 'CHANGE_BUDGET',
        change_bid: 'CHANGE_BID',
        rotate: 'ROTATE',
        unpause: 'UNPAUSE'
      });
    }
  }]);
  return AdRuleExecutionSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleFilters
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleFilters = function (_AbstractCrudObject) {
  inherits(AdRuleFilters, _AbstractCrudObject);

  function AdRuleFilters() {
    classCallCheck(this, AdRuleFilters);
    return possibleConstructorReturn(this, (AdRuleFilters.__proto__ || Object.getPrototypeOf(AdRuleFilters)).apply(this, arguments));
  }

  createClass(AdRuleFilters, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        field: 'field',
        operator: 'operator',
        value: 'value'
      });
    }
  }, {
    key: 'Operator',
    get: function get() {
      return Object.freeze({
        greater_than: 'GREATER_THAN',
        less_than: 'LESS_THAN',
        equal: 'EQUAL',
        not_equal: 'NOT_EQUAL',
        in_range: 'IN_RANGE',
        not_in_range: 'NOT_IN_RANGE',
        in: 'IN',
        not_in: 'NOT_IN',
        contain: 'CONTAIN',
        not_contain: 'NOT_CONTAIN',
        any: 'ANY',
        all: 'ALL',
        none: 'NONE'
      });
    }
  }]);
  return AdRuleFilters;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleHistoryResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleHistoryResult = function (_AbstractCrudObject) {
  inherits(AdRuleHistoryResult, _AbstractCrudObject);

  function AdRuleHistoryResult() {
    classCallCheck(this, AdRuleHistoryResult);
    return possibleConstructorReturn(this, (AdRuleHistoryResult.__proto__ || Object.getPrototypeOf(AdRuleHistoryResult)).apply(this, arguments));
  }

  createClass(AdRuleHistoryResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        actions: 'actions',
        object_id: 'object_id',
        object_type: 'object_type'
      });
    }
  }, {
    key: 'ObjectType',
    get: function get() {
      return Object.freeze({
        campaign: 'CAMPAIGN',
        adset: 'ADSET',
        ad: 'AD'
      });
    }
  }]);
  return AdRuleHistoryResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleHistoryResultAction
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleHistoryResultAction = function (_AbstractCrudObject) {
  inherits(AdRuleHistoryResultAction, _AbstractCrudObject);

  function AdRuleHistoryResultAction() {
    classCallCheck(this, AdRuleHistoryResultAction);
    return possibleConstructorReturn(this, (AdRuleHistoryResultAction.__proto__ || Object.getPrototypeOf(AdRuleHistoryResultAction)).apply(this, arguments));
  }

  createClass(AdRuleHistoryResultAction, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        action: 'action',
        field: 'field',
        new_value: 'new_value',
        old_value: 'old_value'
      });
    }
  }]);
  return AdRuleHistoryResultAction;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleSchedule
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleSchedule = function (_AbstractCrudObject) {
  inherits(AdRuleSchedule, _AbstractCrudObject);

  function AdRuleSchedule() {
    classCallCheck(this, AdRuleSchedule);
    return possibleConstructorReturn(this, (AdRuleSchedule.__proto__ || Object.getPrototypeOf(AdRuleSchedule)).apply(this, arguments));
  }

  createClass(AdRuleSchedule, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        days: 'days',
        end_minute: 'end_minute',
        start_minute: 'start_minute'
      });
    }
  }]);
  return AdRuleSchedule;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleScheduleSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleScheduleSpec = function (_AbstractCrudObject) {
  inherits(AdRuleScheduleSpec, _AbstractCrudObject);

  function AdRuleScheduleSpec() {
    classCallCheck(this, AdRuleScheduleSpec);
    return possibleConstructorReturn(this, (AdRuleScheduleSpec.__proto__ || Object.getPrototypeOf(AdRuleScheduleSpec)).apply(this, arguments));
  }

  createClass(AdRuleScheduleSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        schedule: 'schedule',
        schedule_type: 'schedule_type'
      });
    }
  }]);
  return AdRuleScheduleSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdRuleTrigger
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdRuleTrigger = function (_AbstractCrudObject) {
  inherits(AdRuleTrigger, _AbstractCrudObject);

  function AdRuleTrigger() {
    classCallCheck(this, AdRuleTrigger);
    return possibleConstructorReturn(this, (AdRuleTrigger.__proto__ || Object.getPrototypeOf(AdRuleTrigger)).apply(this, arguments));
  }

  createClass(AdRuleTrigger, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        field: 'field',
        operator: 'operator',
        type: 'type',
        value: 'value'
      });
    }
  }, {
    key: 'Operator',
    get: function get() {
      return Object.freeze({
        greater_than: 'GREATER_THAN',
        less_than: 'LESS_THAN',
        equal: 'EQUAL',
        not_equal: 'NOT_EQUAL',
        in_range: 'IN_RANGE',
        not_in_range: 'NOT_IN_RANGE',
        in: 'IN',
        not_in: 'NOT_IN',
        contain: 'CONTAIN',
        not_contain: 'NOT_CONTAIN',
        any: 'ANY',
        all: 'ALL',
        none: 'NONE'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        metadata_creation: 'METADATA_CREATION',
        metadata_update: 'METADATA_UPDATE',
        stats_milestone: 'STATS_MILESTONE',
        stats_change: 'STATS_CHANGE'
      });
    }
  }]);
  return AdRuleTrigger;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdStudyAdsAssetUserPermissions
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdStudyAdsAssetUserPermissions = function (_AbstractCrudObject) {
  inherits(AdStudyAdsAssetUserPermissions, _AbstractCrudObject);

  function AdStudyAdsAssetUserPermissions() {
    classCallCheck(this, AdStudyAdsAssetUserPermissions);
    return possibleConstructorReturn(this, (AdStudyAdsAssetUserPermissions.__proto__ || Object.getPrototypeOf(AdStudyAdsAssetUserPermissions)).apply(this, arguments));
  }

  createClass(AdStudyAdsAssetUserPermissions, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        business: 'business',
        business_persona: 'business_persona',
        created_by: 'created_by',
        created_time: 'created_time',
        email: 'email',
        role: 'role',
        status: 'status',
        updated_by: 'updated_by',
        updated_time: 'updated_time',
        user: 'user'
      });
    }
  }]);
  return AdStudyAdsAssetUserPermissions;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdStudyCell
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdStudyCell = function (_AbstractCrudObject) {
  inherits(AdStudyCell, _AbstractCrudObject);

  function AdStudyCell() {
    classCallCheck(this, AdStudyCell);
    return possibleConstructorReturn(this, (AdStudyCell.__proto__ || Object.getPrototypeOf(AdStudyCell)).apply(this, arguments));
  }

  createClass(AdStudyCell, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(AdStudyCell.prototype.__proto__ || Object.getPrototypeOf(AdStudyCell.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ad_entities_count: 'ad_entities_count',
        control_percentage: 'control_percentage',
        id: 'id',
        name: 'name',
        treatment_percentage: 'treatment_percentage'
      });
    }
  }, {
    key: 'CreationTemplate',
    get: function get() {
      return Object.freeze({
        automatic_placements: 'AUTOMATIC_PLACEMENTS',
        brand_awareness: 'BRAND_AWARENESS',
        facebook: 'FACEBOOK',
        facebook_audience_network: 'FACEBOOK_AUDIENCE_NETWORK',
        facebook_instagram: 'FACEBOOK_INSTAGRAM',
        facebook_news_feed: 'FACEBOOK_NEWS_FEED',
        facebook_news_feed_in_stream_video: 'FACEBOOK_NEWS_FEED_IN_STREAM_VIDEO',
        in_stream_video: 'IN_STREAM_VIDEO',
        instagram: 'INSTAGRAM',
        mobile_optimized_video: 'MOBILE_OPTIMIZED_VIDEO',
        page_post_engagement: 'PAGE_POST_ENGAGEMENT',
        reach: 'REACH',
        tv_commercial: 'TV_COMMERCIAL',
        tv_facebook: 'TV_FACEBOOK',
        video_view_optimization: 'VIDEO_VIEW_OPTIMIZATION',
        low_frequency: 'LOW_FREQUENCY',
        medium_frequency: 'MEDIUM_FREQUENCY',
        high_frequency: 'HIGH_FREQUENCY'
      });
    }
  }]);
  return AdStudyCell;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdgroupPlacementSpecificReviewFeedback
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdgroupPlacementSpecificReviewFeedback = function (_AbstractCrudObject) {
  inherits(AdgroupPlacementSpecificReviewFeedback, _AbstractCrudObject);

  function AdgroupPlacementSpecificReviewFeedback() {
    classCallCheck(this, AdgroupPlacementSpecificReviewFeedback);
    return possibleConstructorReturn(this, (AdgroupPlacementSpecificReviewFeedback.__proto__ || Object.getPrototypeOf(AdgroupPlacementSpecificReviewFeedback)).apply(this, arguments));
  }

  createClass(AdgroupPlacementSpecificReviewFeedback, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_admin: 'account_admin',
        ad: 'ad',
        b2c: 'b2c',
        bsg: 'bsg',
        city_community: 'city_community',
        dpa: 'dpa',
        facebook: 'facebook',
        instagram: 'instagram',
        instagram_shop: 'instagram_shop',
        marketplace: 'marketplace',
        page_admin: 'page_admin',
        product: 'product',
        product_service: 'product_service',
        seller: 'seller'
      });
    }
  }]);
  return AdgroupPlacementSpecificReviewFeedback;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdgroupRelevanceScore
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdgroupRelevanceScore = function (_AbstractCrudObject) {
  inherits(AdgroupRelevanceScore, _AbstractCrudObject);

  function AdgroupRelevanceScore() {
    classCallCheck(this, AdgroupRelevanceScore);
    return possibleConstructorReturn(this, (AdgroupRelevanceScore.__proto__ || Object.getPrototypeOf(AdgroupRelevanceScore)).apply(this, arguments));
  }

  createClass(AdgroupRelevanceScore, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        negative_feedback: 'negative_feedback',
        positive_feedback: 'positive_feedback',
        score: 'score',
        status: 'status'
      });
    }
  }]);
  return AdgroupRelevanceScore;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdgroupReviewFeedback
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdgroupReviewFeedback = function (_AbstractCrudObject) {
  inherits(AdgroupReviewFeedback, _AbstractCrudObject);

  function AdgroupReviewFeedback() {
    classCallCheck(this, AdgroupReviewFeedback);
    return possibleConstructorReturn(this, (AdgroupReviewFeedback.__proto__ || Object.getPrototypeOf(AdgroupReviewFeedback)).apply(this, arguments));
  }

  createClass(AdgroupReviewFeedback, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        global: 'global',
        placement_specific: 'placement_specific'
      });
    }
  }]);
  return AdgroupReviewFeedback;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdsActionStats
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdsActionStats = function (_AbstractCrudObject) {
  inherits(AdsActionStats, _AbstractCrudObject);

  function AdsActionStats() {
    classCallCheck(this, AdsActionStats);
    return possibleConstructorReturn(this, (AdsActionStats.__proto__ || Object.getPrototypeOf(AdsActionStats)).apply(this, arguments));
  }

  createClass(AdsActionStats, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        value_1d_click: '1d_click',
        value_1d_view: '1d_view',
        value_28d_click: '28d_click',
        value_28d_view: '28d_view',
        value_7d_click: '7d_click',
        value_7d_view: '7d_view',
        action_canvas_component_name: 'action_canvas_component_name',
        action_carousel_card_id: 'action_carousel_card_id',
        action_carousel_card_name: 'action_carousel_card_name',
        action_destination: 'action_destination',
        action_device: 'action_device',
        action_link_click_destination: 'action_link_click_destination',
        action_reaction: 'action_reaction',
        action_target_id: 'action_target_id',
        action_type: 'action_type',
        action_video_sound: 'action_video_sound',
        action_video_type: 'action_video_type',
        inline: 'inline',
        value: 'value'
      });
    }
  }]);
  return AdsActionStats;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdsImageCrops
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdsImageCrops = function (_AbstractCrudObject) {
  inherits(AdsImageCrops, _AbstractCrudObject);

  function AdsImageCrops() {
    classCallCheck(this, AdsImageCrops);
    return possibleConstructorReturn(this, (AdsImageCrops.__proto__ || Object.getPrototypeOf(AdsImageCrops)).apply(this, arguments));
  }

  createClass(AdsImageCrops, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        value_100x100: '100x100',
        value_100x72: '100x72',
        value_191x100: '191x100',
        value_400x150: '400x150',
        value_400x500: '400x500',
        value_600x360: '600x360',
        value_90x160: '90x160'
      });
    }
  }]);
  return AdsImageCrops;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AdsPixelStats
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AdsPixelStats = function (_AbstractCrudObject) {
  inherits(AdsPixelStats, _AbstractCrudObject);

  function AdsPixelStats() {
    classCallCheck(this, AdsPixelStats);
    return possibleConstructorReturn(this, (AdsPixelStats.__proto__ || Object.getPrototypeOf(AdsPixelStats)).apply(this, arguments));
  }

  createClass(AdsPixelStats, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        count: 'count',
        diagnostics_hourly_last_timestamp: 'diagnostics_hourly_last_timestamp',
        event: 'event',
        value: 'value'
      });
    }
  }]);
  return AdsPixelStats;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AgencyClientDeclaration
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AgencyClientDeclaration = function (_AbstractCrudObject) {
  inherits(AgencyClientDeclaration, _AbstractCrudObject);

  function AgencyClientDeclaration() {
    classCallCheck(this, AgencyClientDeclaration);
    return possibleConstructorReturn(this, (AgencyClientDeclaration.__proto__ || Object.getPrototypeOf(AgencyClientDeclaration)).apply(this, arguments));
  }

  createClass(AgencyClientDeclaration, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        agency_representing_client: 'agency_representing_client',
        client_based_in_france: 'client_based_in_france',
        client_city: 'client_city',
        client_country_code: 'client_country_code',
        client_email_address: 'client_email_address',
        client_name: 'client_name',
        client_postal_code: 'client_postal_code',
        client_province: 'client_province',
        client_street: 'client_street',
        client_street2: 'client_street2',
        has_written_mandate_from_advertiser: 'has_written_mandate_from_advertiser',
        is_client_paying_invoices: 'is_client_paying_invoices'
      });
    }
  }]);
  return AgencyClientDeclaration;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AndroidAppLink
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AndroidAppLink = function (_AbstractCrudObject) {
  inherits(AndroidAppLink, _AbstractCrudObject);

  function AndroidAppLink() {
    classCallCheck(this, AndroidAppLink);
    return possibleConstructorReturn(this, (AndroidAppLink.__proto__ || Object.getPrototypeOf(AndroidAppLink)).apply(this, arguments));
  }

  createClass(AndroidAppLink, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        app_name: 'app_name',
        class: 'class',
        package: 'package',
        url: 'url'
      });
    }
  }]);
  return AndroidAppLink;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AppLinks
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AppLinks = function (_AbstractCrudObject) {
  inherits(AppLinks, _AbstractCrudObject);

  function AppLinks() {
    classCallCheck(this, AppLinks);
    return possibleConstructorReturn(this, (AppLinks.__proto__ || Object.getPrototypeOf(AppLinks)).apply(this, arguments));
  }

  createClass(AppLinks, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        android: 'android',
        id: 'id',
        ios: 'ios',
        ipad: 'ipad',
        iphone: 'iphone',
        web: 'web',
        windows: 'windows',
        windows_phone: 'windows_phone',
        windows_universal: 'windows_universal'
      });
    }
  }]);
  return AppLinks;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * AttributionSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var AttributionSpec = function (_AbstractCrudObject) {
  inherits(AttributionSpec, _AbstractCrudObject);

  function AttributionSpec() {
    classCallCheck(this, AttributionSpec);
    return possibleConstructorReturn(this, (AttributionSpec.__proto__ || Object.getPrototypeOf(AttributionSpec)).apply(this, arguments));
  }

  createClass(AttributionSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        event_type: 'event_type',
        window_days: 'window_days'
      });
    }
  }]);
  return AttributionSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ConversionActionQuery
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ConversionActionQuery = function (_AbstractCrudObject) {
  inherits(ConversionActionQuery, _AbstractCrudObject);

  function ConversionActionQuery() {
    classCallCheck(this, ConversionActionQuery);
    return possibleConstructorReturn(this, (ConversionActionQuery.__proto__ || Object.getPrototypeOf(ConversionActionQuery)).apply(this, arguments));
  }

  createClass(ConversionActionQuery, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        action_type: 'action.type',
        application: 'application',
        conversion_id: 'conversion_id',
        creative: 'creative',
        dataset: 'dataset',
        event: 'event',
        event_creator: 'event.creator',
        event_type: 'event_type',
        fb_pixel: 'fb_pixel',
        fb_pixel_event: 'fb_pixel_event',
        leadgen: 'leadgen',
        object: 'object',
        object_domain: 'object.domain',
        offer: 'offer',
        offer_creator: 'offer.creator',
        offsite_pixel: 'offsite_pixel',
        page: 'page',
        page_parent: 'page.parent',
        post: 'post',
        post_object: 'post.object',
        post_object_wall: 'post.object.wall',
        post_wall: 'post.wall',
        question: 'question',
        question_creator: 'question.creator',
        response: 'response',
        subtype: 'subtype'
      });
    }
  }]);
  return ConversionActionQuery;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CopyrightAttributionInsights
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CopyrightAttributionInsights = function (_AbstractCrudObject) {
  inherits(CopyrightAttributionInsights, _AbstractCrudObject);

  function CopyrightAttributionInsights() {
    classCallCheck(this, CopyrightAttributionInsights);
    return possibleConstructorReturn(this, (CopyrightAttributionInsights.__proto__ || Object.getPrototypeOf(CopyrightAttributionInsights)).apply(this, arguments));
  }

  createClass(CopyrightAttributionInsights, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        l7_attribution_page_view: 'l7_attribution_page_view',
        l7_attribution_page_view_delta: 'l7_attribution_page_view_delta',
        l7_attribution_video_view: 'l7_attribution_video_view',
        l7_attribution_video_view_delta: 'l7_attribution_video_view_delta',
        metrics_ending_date: 'metrics_ending_date'
      });
    }
  }]);
  return CopyrightAttributionInsights;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CoverPhoto
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CoverPhoto = function (_AbstractCrudObject) {
  inherits(CoverPhoto, _AbstractCrudObject);

  function CoverPhoto() {
    classCallCheck(this, CoverPhoto);
    return possibleConstructorReturn(this, (CoverPhoto.__proto__ || Object.getPrototypeOf(CoverPhoto)).apply(this, arguments));
  }

  createClass(CoverPhoto, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        cover_id: 'cover_id',
        id: 'id',
        offset_x: 'offset_x',
        offset_y: 'offset_y',
        source: 'source'
      });
    }
  }]);
  return CoverPhoto;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomAudienceAdAccount
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomAudienceAdAccount = function (_AbstractCrudObject) {
  inherits(CustomAudienceAdAccount, _AbstractCrudObject);

  function CustomAudienceAdAccount() {
    classCallCheck(this, CustomAudienceAdAccount);
    return possibleConstructorReturn(this, (CustomAudienceAdAccount.__proto__ || Object.getPrototypeOf(CustomAudienceAdAccount)).apply(this, arguments));
  }

  createClass(CustomAudienceAdAccount, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id'
      });
    }
  }]);
  return CustomAudienceAdAccount;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomAudienceDataSource
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomAudienceDataSource = function (_AbstractCrudObject) {
  inherits(CustomAudienceDataSource, _AbstractCrudObject);

  function CustomAudienceDataSource() {
    classCallCheck(this, CustomAudienceDataSource);
    return possibleConstructorReturn(this, (CustomAudienceDataSource.__proto__ || Object.getPrototypeOf(CustomAudienceDataSource)).apply(this, arguments));
  }

  createClass(CustomAudienceDataSource, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        creation_params: 'creation_params',
        sub_type: 'sub_type',
        type: 'type'
      });
    }
  }, {
    key: 'SubType',
    get: function get() {
      return Object.freeze({
        anything: 'ANYTHING',
        nothing: 'NOTHING',
        hashes: 'HASHES',
        user_ids: 'USER_IDS',
        hashes_or_user_ids: 'HASHES_OR_USER_IDS',
        mobile_advertiser_ids: 'MOBILE_ADVERTISER_IDS',
        external_ids: 'EXTERNAL_IDS',
        multi_hashes: 'MULTI_HASHES',
        tokens: 'TOKENS',
        external_ids_mix: 'EXTERNAL_IDS_MIX',
        household_expansion: 'HOUSEHOLD_EXPANSION',
        web_pixel_hits: 'WEB_PIXEL_HITS',
        mobile_app_events: 'MOBILE_APP_EVENTS',
        mobile_app_combination_events: 'MOBILE_APP_COMBINATION_EVENTS',
        video_events: 'VIDEO_EVENTS',
        web_pixel_combination_events: 'WEB_PIXEL_COMBINATION_EVENTS',
        platform: 'PLATFORM',
        multi_data_events: 'MULTI_DATA_EVENTS',
        ig_business_events: 'IG_BUSINESS_EVENTS',
        store_visit_events: 'STORE_VISIT_EVENTS',
        instant_article_events: 'INSTANT_ARTICLE_EVENTS',
        fb_event_signals: 'FB_EVENT_SIGNALS',
        engagement_event_users: 'ENGAGEMENT_EVENT_USERS',
        custom_audience_users: 'CUSTOM_AUDIENCE_USERS',
        page_fans: 'PAGE_FANS',
        conversion_pixel_hits: 'CONVERSION_PIXEL_HITS',
        app_users: 'APP_USERS',
        s_expr: 'S_EXPR',
        dynamic_rule: 'DYNAMIC_RULE',
        campaign_conversions: 'CAMPAIGN_CONVERSIONS',
        web_pixel_hits_custom_audience_users: 'WEB_PIXEL_HITS_CUSTOM_AUDIENCE_USERS',
        mobile_app_custom_audience_users: 'MOBILE_APP_CUSTOM_AUDIENCE_USERS',
        combination_custom_audience_users: 'COMBINATION_CUSTOM_AUDIENCE_USERS',
        video_event_users: 'VIDEO_EVENT_USERS',
        fb_pixel_hits: 'FB_PIXEL_HITS',
        ig_promoted_post: 'IG_PROMOTED_POST',
        place_visits: 'PLACE_VISITS',
        offline_event_users: 'OFFLINE_EVENT_USERS',
        expanded_audience: 'EXPANDED_AUDIENCE',
        seed_list: 'SEED_LIST',
        partner_category_users: 'PARTNER_CATEGORY_USERS',
        page_smart_audience: 'PAGE_SMART_AUDIENCE',
        multicountry_combination: 'MULTICOUNTRY_COMBINATION',
        platform_users: 'PLATFORM_USERS',
        multi_event_source: 'MULTI_EVENT_SOURCE',
        smart_audience: 'SMART_AUDIENCE',
        mail_chimp_email_hashes: 'MAIL_CHIMP_EMAIL_HASHES',
        constant_contacts_email_hashes: 'CONSTANT_CONTACTS_EMAIL_HASHES',
        copy_paste_email_hashes: 'COPY_PASTE_EMAIL_HASHES',
        contact_importer: 'CONTACT_IMPORTER',
        data_file: 'DATA_FILE'
      });
    }
  }, {
    key: 'Type',
    get: function get() {
      return Object.freeze({
        unknown: 'UNKNOWN',
        file_imported: 'FILE_IMPORTED',
        event_based: 'EVENT_BASED',
        seed_based: 'SEED_BASED',
        third_party_imported: 'THIRD_PARTY_IMPORTED',
        copy_paste: 'COPY_PASTE',
        contact_importer: 'CONTACT_IMPORTER',
        household_audience: 'HOUSEHOLD_AUDIENCE'
      });
    }
  }]);
  return CustomAudienceDataSource;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomAudiencePermission
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomAudiencePermission = function (_AbstractCrudObject) {
  inherits(CustomAudiencePermission, _AbstractCrudObject);

  function CustomAudiencePermission() {
    classCallCheck(this, CustomAudiencePermission);
    return possibleConstructorReturn(this, (CustomAudiencePermission.__proto__ || Object.getPrototypeOf(CustomAudiencePermission)).apply(this, arguments));
  }

  createClass(CustomAudiencePermission, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        can_edit: 'can_edit',
        can_see_insight: 'can_see_insight',
        can_share: 'can_share',
        subtype_supports_lookalike: 'subtype_supports_lookalike',
        supports_recipient_lookalike: 'supports_recipient_lookalike'
      });
    }
  }]);
  return CustomAudiencePermission;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * CustomAudienceStatus
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var CustomAudienceStatus = function (_AbstractCrudObject) {
  inherits(CustomAudienceStatus, _AbstractCrudObject);

  function CustomAudienceStatus() {
    classCallCheck(this, CustomAudienceStatus);
    return possibleConstructorReturn(this, (CustomAudienceStatus.__proto__ || Object.getPrototypeOf(CustomAudienceStatus)).apply(this, arguments));
  }

  createClass(CustomAudienceStatus, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        code: 'code',
        description: 'description'
      });
    }
  }]);
  return CustomAudienceStatus;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * DayPart
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var DayPart = function (_AbstractCrudObject) {
  inherits(DayPart, _AbstractCrudObject);

  function DayPart() {
    classCallCheck(this, DayPart);
    return possibleConstructorReturn(this, (DayPart.__proto__ || Object.getPrototypeOf(DayPart)).apply(this, arguments));
  }

  createClass(DayPart, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        days: 'days',
        end_minute: 'end_minute',
        start_minute: 'start_minute',
        timezone_type: 'timezone_type'
      });
    }
  }]);
  return DayPart;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * DeliveryCheck
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var DeliveryCheck = function (_AbstractCrudObject) {
  inherits(DeliveryCheck, _AbstractCrudObject);

  function DeliveryCheck() {
    classCallCheck(this, DeliveryCheck);
    return possibleConstructorReturn(this, (DeliveryCheck.__proto__ || Object.getPrototypeOf(DeliveryCheck)).apply(this, arguments));
  }

  createClass(DeliveryCheck, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        check_name: 'check_name',
        description: 'description',
        extra_info: 'extra_info',
        summary: 'summary'
      });
    }
  }]);
  return DeliveryCheck;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * DeliveryCheckExtraInfo
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var DeliveryCheckExtraInfo = function (_AbstractCrudObject) {
  inherits(DeliveryCheckExtraInfo, _AbstractCrudObject);

  function DeliveryCheckExtraInfo() {
    classCallCheck(this, DeliveryCheckExtraInfo);
    return possibleConstructorReturn(this, (DeliveryCheckExtraInfo.__proto__ || Object.getPrototypeOf(DeliveryCheckExtraInfo)).apply(this, arguments));
  }

  createClass(DeliveryCheckExtraInfo, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adgroup_ids: 'adgroup_ids',
        campaign_ids: 'campaign_ids',
        countries: 'countries'
      });
    }
  }]);
  return DeliveryCheckExtraInfo;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * DirectDebit
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var DirectDebit = function (_AbstractCrudObject) {
  inherits(DirectDebit, _AbstractCrudObject);

  function DirectDebit() {
    classCallCheck(this, DirectDebit);
    return possibleConstructorReturn(this, (DirectDebit.__proto__ || Object.getPrototypeOf(DirectDebit)).apply(this, arguments));
  }

  createClass(DirectDebit, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        bank_account_last_4: 'bank_account_last_4',
        bank_code_last_4: 'bank_code_last_4',
        bank_name: 'bank_name',
        default_receiving_method_products: 'default_receiving_method_products',
        display_string: 'display_string',
        id: 'id',
        last_four_digits: 'last_four_digits',
        onboarding_url: 'onboarding_url',
        owner_name: 'owner_name',
        status: 'status'
      });
    }
  }]);
  return DirectDebit;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Engagement
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Engagement = function (_AbstractCrudObject) {
  inherits(Engagement, _AbstractCrudObject);

  function Engagement() {
    classCallCheck(this, Engagement);
    return possibleConstructorReturn(this, (Engagement.__proto__ || Object.getPrototypeOf(Engagement)).apply(this, arguments));
  }

  createClass(Engagement, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        count: 'count',
        count_string: 'count_string',
        count_string_with_like: 'count_string_with_like',
        count_string_without_like: 'count_string_without_like',
        social_sentence: 'social_sentence',
        social_sentence_with_like: 'social_sentence_with_like',
        social_sentence_without_like: 'social_sentence_without_like'
      });
    }
  }]);
  return Engagement;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * EntWithSponsor
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var EntWithSponsor = function (_AbstractCrudObject) {
  inherits(EntWithSponsor, _AbstractCrudObject);

  function EntWithSponsor() {
    classCallCheck(this, EntWithSponsor);
    return possibleConstructorReturn(this, (EntWithSponsor.__proto__ || Object.getPrototypeOf(EntWithSponsor)).apply(this, arguments));
  }

  createClass(EntWithSponsor, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        owner_picture: 'owner_picture',
        post_id: 'post_id',
        post_info: 'post_info'
      });
    }
  }]);
  return EntWithSponsor;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * FlexibleTargeting
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var FlexibleTargeting = function (_AbstractCrudObject) {
  inherits(FlexibleTargeting, _AbstractCrudObject);

  function FlexibleTargeting() {
    classCallCheck(this, FlexibleTargeting);
    return possibleConstructorReturn(this, (FlexibleTargeting.__proto__ || Object.getPrototypeOf(FlexibleTargeting)).apply(this, arguments));
  }

  createClass(FlexibleTargeting, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        behaviors: 'behaviors',
        college_years: 'college_years',
        connections: 'connections',
        custom_audiences: 'custom_audiences',
        education_majors: 'education_majors',
        education_schools: 'education_schools',
        education_statuses: 'education_statuses',
        ethnic_affinity: 'ethnic_affinity',
        family_statuses: 'family_statuses',
        friends_of_connections: 'friends_of_connections',
        generation: 'generation',
        home_ownership: 'home_ownership',
        home_type: 'home_type',
        home_value: 'home_value',
        household_composition: 'household_composition',
        income: 'income',
        industries: 'industries',
        interested_in: 'interested_in',
        interests: 'interests',
        life_events: 'life_events',
        moms: 'moms',
        net_worth: 'net_worth',
        office_type: 'office_type',
        politics: 'politics',
        relationship_statuses: 'relationship_statuses',
        user_adclusters: 'user_adclusters',
        work_employers: 'work_employers',
        work_positions: 'work_positions'
      });
    }
  }]);
  return FlexibleTargeting;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * FundingSourceDetails
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var FundingSourceDetails = function (_AbstractCrudObject) {
  inherits(FundingSourceDetails, _AbstractCrudObject);

  function FundingSourceDetails() {
    classCallCheck(this, FundingSourceDetails);
    return possibleConstructorReturn(this, (FundingSourceDetails.__proto__ || Object.getPrototypeOf(FundingSourceDetails)).apply(this, arguments));
  }

  createClass(FundingSourceDetails, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        coupon: 'coupon',
        display_string: 'display_string',
        id: 'id',
        type: 'type'
      });
    }
  }]);
  return FundingSourceDetails;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * FundingSourceDetailsCoupon
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var FundingSourceDetailsCoupon = function (_AbstractCrudObject) {
  inherits(FundingSourceDetailsCoupon, _AbstractCrudObject);

  function FundingSourceDetailsCoupon() {
    classCallCheck(this, FundingSourceDetailsCoupon);
    return possibleConstructorReturn(this, (FundingSourceDetailsCoupon.__proto__ || Object.getPrototypeOf(FundingSourceDetailsCoupon)).apply(this, arguments));
  }

  createClass(FundingSourceDetailsCoupon, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        amount: 'amount',
        currency: 'currency',
        display_amount: 'display_amount',
        expiration: 'expiration'
      });
    }
  }]);
  return FundingSourceDetailsCoupon;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * HotelRoom
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var HotelRoom = function (_AbstractCrudObject) {
  inherits(HotelRoom, _AbstractCrudObject);

  function HotelRoom() {
    classCallCheck(this, HotelRoom);
    return possibleConstructorReturn(this, (HotelRoom.__proto__ || Object.getPrototypeOf(HotelRoom)).apply(this, arguments));
  }

  createClass(HotelRoom, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(HotelRoom.prototype.__proto__ || Object.getPrototypeOf(HotelRoom.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(HotelRoom.prototype.__proto__ || Object.getPrototypeOf(HotelRoom.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        applinks: 'applinks',
        base_price: 'base_price',
        currency: 'currency',
        description: 'description',
        id: 'id',
        images: 'images',
        margin_level: 'margin_level',
        name: 'name',
        room_id: 'room_id',
        sale_price: 'sale_price',
        url: 'url'
      });
    }
  }]);
  return HotelRoom;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * IDName
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var IDName = function (_AbstractCrudObject) {
  inherits(IDName, _AbstractCrudObject);

  function IDName() {
    classCallCheck(this, IDName);
    return possibleConstructorReturn(this, (IDName.__proto__ || Object.getPrototypeOf(IDName)).apply(this, arguments));
  }

  createClass(IDName, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        name: 'name'
      });
    }
  }]);
  return IDName;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * InstagramInsightsResult
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var InstagramInsightsResult = function (_AbstractCrudObject) {
  inherits(InstagramInsightsResult, _AbstractCrudObject);

  function InstagramInsightsResult() {
    classCallCheck(this, InstagramInsightsResult);
    return possibleConstructorReturn(this, (InstagramInsightsResult.__proto__ || Object.getPrototypeOf(InstagramInsightsResult)).apply(this, arguments));
  }

  createClass(InstagramInsightsResult, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        description: 'description',
        id: 'id',
        name: 'name',
        period: 'period',
        title: 'title',
        values: 'values'
      });
    }
  }, {
    key: 'Metric',
    get: function get() {
      return Object.freeze({
        impressions: 'impressions',
        reach: 'reach',
        carousel_album_impressions: 'carousel_album_impressions',
        carousel_album_reach: 'carousel_album_reach',
        carousel_album_engagement: 'carousel_album_engagement',
        carousel_album_saved: 'carousel_album_saved',
        carousel_album_video_views: 'carousel_album_video_views',
        taps_forward: 'taps_forward',
        taps_back: 'taps_back',
        exits: 'exits',
        replies: 'replies',
        engagement: 'engagement',
        saved: 'saved',
        video_views: 'video_views'
      });
    }
  }, {
    key: 'Period',
    get: function get() {
      return Object.freeze({
        day: 'day',
        week: 'week',
        days_28: 'days_28',
        month: 'month',
        lifetime: 'lifetime',
        total_over_range: 'total_over_range'
      });
    }
  }]);
  return InstagramInsightsResult;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * InstagramInsightsValue
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var InstagramInsightsValue = function (_AbstractCrudObject) {
  inherits(InstagramInsightsValue, _AbstractCrudObject);

  function InstagramInsightsValue() {
    classCallCheck(this, InstagramInsightsValue);
    return possibleConstructorReturn(this, (InstagramInsightsValue.__proto__ || Object.getPrototypeOf(InstagramInsightsValue)).apply(this, arguments));
  }

  createClass(InstagramInsightsValue, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        end_time: 'end_time',
        value: 'value'
      });
    }
  }]);
  return InstagramInsightsValue;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * IosAppLink
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var IosAppLink = function (_AbstractCrudObject) {
  inherits(IosAppLink, _AbstractCrudObject);

  function IosAppLink() {
    classCallCheck(this, IosAppLink);
    return possibleConstructorReturn(this, (IosAppLink.__proto__ || Object.getPrototypeOf(IosAppLink)).apply(this, arguments));
  }

  createClass(IosAppLink, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        app_name: 'app_name',
        app_store_id: 'app_store_id',
        url: 'url'
      });
    }
  }]);
  return IosAppLink;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadGenConditionalQuestionsGroup
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadGenConditionalQuestionsGroup = function (_AbstractCrudObject) {
  inherits(LeadGenConditionalQuestionsGroup, _AbstractCrudObject);

  function LeadGenConditionalQuestionsGroup() {
    classCallCheck(this, LeadGenConditionalQuestionsGroup);
    return possibleConstructorReturn(this, (LeadGenConditionalQuestionsGroup.__proto__ || Object.getPrototypeOf(LeadGenConditionalQuestionsGroup)).apply(this, arguments));
  }

  createClass(LeadGenConditionalQuestionsGroup, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        choices: 'choices',
        questions: 'questions',
        id: 'id'
      });
    }
  }]);
  return LeadGenConditionalQuestionsGroup;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadGenDataDraft
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadGenDataDraft = function (_AbstractCrudObject) {
  inherits(LeadGenDataDraft, _AbstractCrudObject);

  function LeadGenDataDraft() {
    classCallCheck(this, LeadGenDataDraft);
    return possibleConstructorReturn(this, (LeadGenDataDraft.__proto__ || Object.getPrototypeOf(LeadGenDataDraft)).apply(this, arguments));
  }

  createClass(LeadGenDataDraft, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(LeadGenDataDraft.prototype.__proto__ || Object.getPrototypeOf(LeadGenDataDraft.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        allow_organic_lead: 'allow_organic_lead',
        block_display_for_non_targeted_viewer: 'block_display_for_non_targeted_viewer',
        context_card: 'context_card',
        continued_flow_request_method: 'continued_flow_request_method',
        created_time: 'created_time',
        creator_id: 'creator_id',
        expired_leads_count: 'expired_leads_count',
        follow_up_action_url: 'follow_up_action_url',
        id: 'id',
        is_continued_flow: 'is_continued_flow',
        is_optimized_for_quality: 'is_optimized_for_quality',
        leadgen_export_csv_url: 'leadgen_export_csv_url',
        legal_content: 'legal_content',
        locale: 'locale',
        name: 'name',
        page: 'page',
        question_page_custom_headline: 'question_page_custom_headline',
        questions: 'questions',
        status: 'status',
        thank_you_page: 'thank_you_page'
      });
    }
  }, {
    key: 'Locale',
    get: function get() {
      return Object.freeze({
        en_us: 'EN_US',
        it_it: 'IT_IT',
        fr_fr: 'FR_FR',
        es_es: 'ES_ES',
        es_la: 'ES_LA',
        de_de: 'DE_DE',
        en_gb: 'EN_GB',
        pt_br: 'PT_BR',
        zh_tw: 'ZH_TW',
        zh_hk: 'ZH_HK',
        tr_tr: 'TR_TR',
        ar_ar: 'AR_AR',
        cs_cz: 'CS_CZ',
        da_dk: 'DA_DK',
        fi_fi: 'FI_FI',
        he_il: 'HE_IL',
        hi_in: 'HI_IN',
        hu_hu: 'HU_HU',
        id_id: 'ID_ID',
        ja_jp: 'JA_JP',
        ko_kr: 'KO_KR',
        nb_no: 'NB_NO',
        nl_nl: 'NL_NL',
        pl_pl: 'PL_PL',
        pt_pt: 'PT_PT',
        ro_ro: 'RO_RO',
        ru_ru: 'RU_RU',
        sv_se: 'SV_SE',
        th_th: 'TH_TH',
        vi_vn: 'VI_VN',
        zh_cn: 'ZH_CN'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        archived: 'ARCHIVED',
        deleted: 'DELETED',
        draft: 'DRAFT'
      });
    }
  }]);
  return LeadGenDataDraft;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadGenDraftQuestion
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadGenDraftQuestion = function (_AbstractCrudObject) {
  inherits(LeadGenDraftQuestion, _AbstractCrudObject);

  function LeadGenDraftQuestion() {
    classCallCheck(this, LeadGenDraftQuestion);
    return possibleConstructorReturn(this, (LeadGenDraftQuestion.__proto__ || Object.getPrototypeOf(LeadGenDraftQuestion)).apply(this, arguments));
  }

  createClass(LeadGenDraftQuestion, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        conditional_questions_choices: 'conditional_questions_choices',
        conditional_questions_group_id: 'conditional_questions_group_id',
        dependent_conditional_questions: 'dependent_conditional_questions',
        inline_context: 'inline_context',
        key: 'key',
        label: 'label',
        options: 'options',
        type: 'type'
      });
    }
  }]);
  return LeadGenDraftQuestion;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadGenFormPreviewDetails
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadGenFormPreviewDetails = function (_AbstractCrudObject) {
  inherits(LeadGenFormPreviewDetails, _AbstractCrudObject);

  function LeadGenFormPreviewDetails() {
    classCallCheck(this, LeadGenFormPreviewDetails);
    return possibleConstructorReturn(this, (LeadGenFormPreviewDetails.__proto__ || Object.getPrototypeOf(LeadGenFormPreviewDetails)).apply(this, arguments));
  }

  createClass(LeadGenFormPreviewDetails, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        call_to_action_title: 'call_to_action_title',
        default_appointment_scheduling_inline_context: 'default_appointment_scheduling_inline_context',
        default_thank_you_page: 'default_thank_you_page',
        edit_text: 'edit_text',
        email_inline_context_text: 'email_inline_context_text',
        next_button_text: 'next_button_text',
        personal_info_text: 'personal_info_text',
        phone_number_inline_context_text: 'phone_number_inline_context_text',
        review_your_info_text: 'review_your_info_text',
        slide_to_submit_text: 'slide_to_submit_text',
        submit_button_text: 'submit_button_text'
      });
    }
  }]);
  return LeadGenFormPreviewDetails;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadGenLegalContent
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadGenLegalContent = function (_AbstractCrudObject) {
  inherits(LeadGenLegalContent, _AbstractCrudObject);

  function LeadGenLegalContent() {
    classCallCheck(this, LeadGenLegalContent);
    return possibleConstructorReturn(this, (LeadGenLegalContent.__proto__ || Object.getPrototypeOf(LeadGenLegalContent)).apply(this, arguments));
  }

  createClass(LeadGenLegalContent, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(LeadGenLegalContent.prototype.__proto__ || Object.getPrototypeOf(LeadGenLegalContent.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        custom_disclaimer: 'custom_disclaimer',
        id: 'id',
        privacy_policy: 'privacy_policy'
      });
    }
  }, {
    key: 'Status',
    get: function get() {
      return Object.freeze({
        active: 'ACTIVE',
        archived: 'ARCHIVED',
        deleted: 'DELETED',
        draft: 'DRAFT'
      });
    }
  }]);
  return LeadGenLegalContent;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadGenQualifier
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadGenQualifier = function (_AbstractCrudObject) {
  inherits(LeadGenQualifier, _AbstractCrudObject);

  function LeadGenQualifier() {
    classCallCheck(this, LeadGenQualifier);
    return possibleConstructorReturn(this, (LeadGenQualifier.__proto__ || Object.getPrototypeOf(LeadGenQualifier)).apply(this, arguments));
  }

  createClass(LeadGenQualifier, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        category: 'category',
        field_key: 'field_key',
        id: 'id',
        label: 'label',
        question: 'question'
      });
    }
  }]);
  return LeadGenQualifier;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadGenQuestion
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadGenQuestion = function (_AbstractCrudObject) {
  inherits(LeadGenQuestion, _AbstractCrudObject);

  function LeadGenQuestion() {
    classCallCheck(this, LeadGenQuestion);
    return possibleConstructorReturn(this, (LeadGenQuestion.__proto__ || Object.getPrototypeOf(LeadGenQuestion)).apply(this, arguments));
  }

  createClass(LeadGenQuestion, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        conditional_questions_choices: 'conditional_questions_choices',
        conditional_questions_group_id: 'conditional_questions_group_id',
        dependent_conditional_questions: 'dependent_conditional_questions',
        id: 'id',
        inline_context: 'inline_context',
        key: 'key',
        label: 'label',
        options: 'options',
        type: 'type'
      });
    }
  }]);
  return LeadGenQuestion;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LeadGenQuestionOption
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LeadGenQuestionOption = function (_AbstractCrudObject) {
  inherits(LeadGenQuestionOption, _AbstractCrudObject);

  function LeadGenQuestionOption() {
    classCallCheck(this, LeadGenQuestionOption);
    return possibleConstructorReturn(this, (LeadGenQuestionOption.__proto__ || Object.getPrototypeOf(LeadGenQuestionOption)).apply(this, arguments));
  }

  createClass(LeadGenQuestionOption, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        key: 'key',
        value: 'value'
      });
    }
  }]);
  return LeadGenQuestionOption;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * LookalikeSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var LookalikeSpec = function (_AbstractCrudObject) {
  inherits(LookalikeSpec, _AbstractCrudObject);

  function LookalikeSpec() {
    classCallCheck(this, LookalikeSpec);
    return possibleConstructorReturn(this, (LookalikeSpec.__proto__ || Object.getPrototypeOf(LookalikeSpec)).apply(this, arguments));
  }

  createClass(LookalikeSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        is_financial_service: 'is_financial_service',
        origin: 'origin',
        ratio: 'ratio',
        starting_ratio: 'starting_ratio',
        target_countries: 'target_countries',
        type: 'type'
      });
    }
  }]);
  return LookalikeSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * MailingAddress
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var MailingAddress = function (_AbstractCrudObject) {
  inherits(MailingAddress, _AbstractCrudObject);

  function MailingAddress() {
    classCallCheck(this, MailingAddress);
    return possibleConstructorReturn(this, (MailingAddress.__proto__ || Object.getPrototypeOf(MailingAddress)).apply(this, arguments));
  }

  createClass(MailingAddress, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        city: 'city',
        city_page: 'city_page',
        country: 'country',
        id: 'id',
        postal_code: 'postal_code',
        region: 'region',
        street1: 'street1',
        street2: 'street2'
      });
    }
  }]);
  return MailingAddress;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * OfflineTermsOfService
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var OfflineTermsOfService = function (_AbstractCrudObject) {
  inherits(OfflineTermsOfService, _AbstractCrudObject);

  function OfflineTermsOfService() {
    classCallCheck(this, OfflineTermsOfService);
    return possibleConstructorReturn(this, (OfflineTermsOfService.__proto__ || Object.getPrototypeOf(OfflineTermsOfService)).apply(this, arguments));
  }

  createClass(OfflineTermsOfService, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        accept_time: 'accept_time',
        id: 'id',
        signed_by_user: 'signed_by_user'
      });
    }
  }]);
  return OfflineTermsOfService;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * OpenGraphContext
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var OpenGraphContext = function (_AbstractCrudObject) {
  inherits(OpenGraphContext, _AbstractCrudObject);

  function OpenGraphContext() {
    classCallCheck(this, OpenGraphContext);
    return possibleConstructorReturn(this, (OpenGraphContext.__proto__ || Object.getPrototypeOf(OpenGraphContext)).apply(this, arguments));
  }

  createClass(OpenGraphContext, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id'
      });
    }
  }]);
  return OpenGraphContext;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * OpenGraphRating
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var OpenGraphRating = function (_AbstractCrudObject) {
  inherits(OpenGraphRating, _AbstractCrudObject);

  function OpenGraphRating() {
    classCallCheck(this, OpenGraphRating);
    return possibleConstructorReturn(this, (OpenGraphRating.__proto__ || Object.getPrototypeOf(OpenGraphRating)).apply(this, arguments));
  }

  createClass(OpenGraphRating, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        created_time: 'created_time',
        has_rating: 'has_rating',
        has_review: 'has_review',
        open_graph_story: 'open_graph_story',
        rating: 'rating',
        review_text: 'review_text',
        reviewer: 'reviewer'
      });
    }
  }]);
  return OpenGraphRating;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * OutcomePredictionPoint
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var OutcomePredictionPoint = function (_AbstractCrudObject) {
  inherits(OutcomePredictionPoint, _AbstractCrudObject);

  function OutcomePredictionPoint() {
    classCallCheck(this, OutcomePredictionPoint);
    return possibleConstructorReturn(this, (OutcomePredictionPoint.__proto__ || Object.getPrototypeOf(OutcomePredictionPoint)).apply(this, arguments));
  }

  createClass(OutcomePredictionPoint, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        actions: 'actions',
        impressions: 'impressions',
        reach: 'reach',
        spend: 'spend'
      });
    }
  }]);
  return OutcomePredictionPoint;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageCategory
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageCategory = function (_AbstractCrudObject) {
  inherits(PageCategory, _AbstractCrudObject);

  function PageCategory() {
    classCallCheck(this, PageCategory);
    return possibleConstructorReturn(this, (PageCategory.__proto__ || Object.getPrototypeOf(PageCategory)).apply(this, arguments));
  }

  createClass(PageCategory, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        api_enum: 'api_enum',
        fb_page_categories: 'fb_page_categories',
        id: 'id',
        name: 'name'
      });
    }
  }]);
  return PageCategory;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageParking
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageParking = function (_AbstractCrudObject) {
  inherits(PageParking, _AbstractCrudObject);

  function PageParking() {
    classCallCheck(this, PageParking);
    return possibleConstructorReturn(this, (PageParking.__proto__ || Object.getPrototypeOf(PageParking)).apply(this, arguments));
  }

  createClass(PageParking, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        lot: 'lot',
        street: 'street',
        valet: 'valet'
      });
    }
  }]);
  return PageParking;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PagePaymentOptions
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PagePaymentOptions = function (_AbstractCrudObject) {
  inherits(PagePaymentOptions, _AbstractCrudObject);

  function PagePaymentOptions() {
    classCallCheck(this, PagePaymentOptions);
    return possibleConstructorReturn(this, (PagePaymentOptions.__proto__ || Object.getPrototypeOf(PagePaymentOptions)).apply(this, arguments));
  }

  createClass(PagePaymentOptions, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        amex: 'amex',
        cash_only: 'cash_only',
        discover: 'discover',
        mastercard: 'mastercard',
        visa: 'visa'
      });
    }
  }]);
  return PagePaymentOptions;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageRestaurantServices
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageRestaurantServices = function (_AbstractCrudObject) {
  inherits(PageRestaurantServices, _AbstractCrudObject);

  function PageRestaurantServices() {
    classCallCheck(this, PageRestaurantServices);
    return possibleConstructorReturn(this, (PageRestaurantServices.__proto__ || Object.getPrototypeOf(PageRestaurantServices)).apply(this, arguments));
  }

  createClass(PageRestaurantServices, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        catering: 'catering',
        delivery: 'delivery',
        groups: 'groups',
        kids: 'kids',
        outdoor: 'outdoor',
        pickup: 'pickup',
        reserve: 'reserve',
        takeout: 'takeout',
        waiter: 'waiter',
        walkins: 'walkins'
      });
    }
  }]);
  return PageRestaurantServices;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageRestaurantSpecialties
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageRestaurantSpecialties = function (_AbstractCrudObject) {
  inherits(PageRestaurantSpecialties, _AbstractCrudObject);

  function PageRestaurantSpecialties() {
    classCallCheck(this, PageRestaurantSpecialties);
    return possibleConstructorReturn(this, (PageRestaurantSpecialties.__proto__ || Object.getPrototypeOf(PageRestaurantSpecialties)).apply(this, arguments));
  }

  createClass(PageRestaurantSpecialties, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        breakfast: 'breakfast',
        coffee: 'coffee',
        dinner: 'dinner',
        drinks: 'drinks',
        lunch: 'lunch'
      });
    }
  }]);
  return PageRestaurantSpecialties;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageSettings
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageSettings = function (_AbstractCrudObject) {
  inherits(PageSettings, _AbstractCrudObject);

  function PageSettings() {
    classCallCheck(this, PageSettings);
    return possibleConstructorReturn(this, (PageSettings.__proto__ || Object.getPrototypeOf(PageSettings)).apply(this, arguments));
  }

  createClass(PageSettings, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        setting: 'setting',
        value: 'value'
      });
    }
  }]);
  return PageSettings;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageStartInfo
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageStartInfo = function (_AbstractCrudObject) {
  inherits(PageStartInfo, _AbstractCrudObject);

  function PageStartInfo() {
    classCallCheck(this, PageStartInfo);
    return possibleConstructorReturn(this, (PageStartInfo.__proto__ || Object.getPrototypeOf(PageStartInfo)).apply(this, arguments));
  }

  createClass(PageStartInfo, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        date: 'date',
        type: 'type'
      });
    }
  }]);
  return PageStartInfo;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PageVideosYouCanUse
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PageVideosYouCanUse = function (_AbstractCrudObject) {
  inherits(PageVideosYouCanUse, _AbstractCrudObject);

  function PageVideosYouCanUse() {
    classCallCheck(this, PageVideosYouCanUse);
    return possibleConstructorReturn(this, (PageVideosYouCanUse.__proto__ || Object.getPrototypeOf(PageVideosYouCanUse)).apply(this, arguments));
  }

  createClass(PageVideosYouCanUse, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        description: 'description',
        id: 'id',
        title: 'title'
      });
    }
  }]);
  return PageVideosYouCanUse;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PartnerIntegrationLinked
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PartnerIntegrationLinked = function (_AbstractCrudObject) {
  inherits(PartnerIntegrationLinked, _AbstractCrudObject);

  function PartnerIntegrationLinked() {
    classCallCheck(this, PartnerIntegrationLinked);
    return possibleConstructorReturn(this, (PartnerIntegrationLinked.__proto__ || Object.getPrototypeOf(PartnerIntegrationLinked)).apply(this, arguments));
  }

  createClass(PartnerIntegrationLinked, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        ads_pixel: 'ads_pixel',
        external_id: 'external_id',
        has_oauth_token: 'has_oauth_token',
        id: 'id',
        offline_conversion_data_set: 'offline_conversion_data_set',
        partner: 'partner',
        product_catalog: 'product_catalog',
        setup_status: 'setup_status'
      });
    }
  }]);
  return PartnerIntegrationLinked;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductCatalogImageSettings
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductCatalogImageSettings = function (_AbstractCrudObject) {
  inherits(ProductCatalogImageSettings, _AbstractCrudObject);

  function ProductCatalogImageSettings() {
    classCallCheck(this, ProductCatalogImageSettings);
    return possibleConstructorReturn(this, (ProductCatalogImageSettings.__proto__ || Object.getPrototypeOf(ProductCatalogImageSettings)).apply(this, arguments));
  }

  createClass(ProductCatalogImageSettings, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        carousel_ad: 'carousel_ad',
        single_ad: 'single_ad'
      });
    }
  }]);
  return ProductCatalogImageSettings;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductCatalogImageSettingsOperation
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductCatalogImageSettingsOperation = function (_AbstractCrudObject) {
  inherits(ProductCatalogImageSettingsOperation, _AbstractCrudObject);

  function ProductCatalogImageSettingsOperation() {
    classCallCheck(this, ProductCatalogImageSettingsOperation);
    return possibleConstructorReturn(this, (ProductCatalogImageSettingsOperation.__proto__ || Object.getPrototypeOf(ProductCatalogImageSettingsOperation)).apply(this, arguments));
  }

  createClass(ProductCatalogImageSettingsOperation, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        transformation_type: 'transformation_type'
      });
    }
  }]);
  return ProductCatalogImageSettingsOperation;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductFeedSchedule
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductFeedSchedule = function (_AbstractCrudObject) {
  inherits(ProductFeedSchedule, _AbstractCrudObject);

  function ProductFeedSchedule() {
    classCallCheck(this, ProductFeedSchedule);
    return possibleConstructorReturn(this, (ProductFeedSchedule.__proto__ || Object.getPrototypeOf(ProductFeedSchedule)).apply(this, arguments));
  }

  createClass(ProductFeedSchedule, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        day_of_month: 'day_of_month',
        day_of_week: 'day_of_week',
        hour: 'hour',
        interval: 'interval',
        interval_count: 'interval_count',
        minute: 'minute',
        timezone: 'timezone',
        url: 'url',
        username: 'username'
      });
    }
  }, {
    key: 'DayOfWeek',
    get: function get() {
      return Object.freeze({
        sunday: 'SUNDAY',
        monday: 'MONDAY',
        tuesday: 'TUESDAY',
        wednesday: 'WEDNESDAY',
        thursday: 'THURSDAY',
        friday: 'FRIDAY',
        saturday: 'SATURDAY'
      });
    }
  }, {
    key: 'Interval',
    get: function get() {
      return Object.freeze({
        hourly: 'HOURLY',
        daily: 'DAILY',
        weekly: 'WEEKLY',
        monthly: 'MONTHLY'
      });
    }
  }]);
  return ProductFeedSchedule;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductItemCommerceInsights
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductItemCommerceInsights = function (_AbstractCrudObject) {
  inherits(ProductItemCommerceInsights, _AbstractCrudObject);

  function ProductItemCommerceInsights() {
    classCallCheck(this, ProductItemCommerceInsights);
    return possibleConstructorReturn(this, (ProductItemCommerceInsights.__proto__ || Object.getPrototypeOf(ProductItemCommerceInsights)).apply(this, arguments));
  }

  createClass(ProductItemCommerceInsights, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        message_sends: 'message_sends',
        organic_impressions: 'organic_impressions',
        paid_impressions: 'paid_impressions'
      });
    }
  }]);
  return ProductItemCommerceInsights;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ProductVariant
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ProductVariant = function (_AbstractCrudObject) {
  inherits(ProductVariant, _AbstractCrudObject);

  function ProductVariant() {
    classCallCheck(this, ProductVariant);
    return possibleConstructorReturn(this, (ProductVariant.__proto__ || Object.getPrototypeOf(ProductVariant)).apply(this, arguments));
  }

  createClass(ProductVariant, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        label: 'label',
        options: 'options',
        product_field: 'product_field'
      });
    }
  }]);
  return ProductVariant;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * PublisherSpace
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var PublisherSpace = function (_AbstractCrudObject) {
  inherits(PublisherSpace, _AbstractCrudObject);

  function PublisherSpace() {
    classCallCheck(this, PublisherSpace);
    return possibleConstructorReturn(this, (PublisherSpace.__proto__ || Object.getPrototypeOf(PublisherSpace)).apply(this, arguments));
  }

  createClass(PublisherSpace, [{
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        id: 'id',
        page: 'page',
        sections: 'sections'
      });
    }
  }]);
  return PublisherSpace;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * RTBDynamicPost
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var RTBDynamicPost = function (_AbstractCrudObject) {
  inherits(RTBDynamicPost, _AbstractCrudObject);

  function RTBDynamicPost() {
    classCallCheck(this, RTBDynamicPost);
    return possibleConstructorReturn(this, (RTBDynamicPost.__proto__ || Object.getPrototypeOf(RTBDynamicPost)).apply(this, arguments));
  }

  createClass(RTBDynamicPost, [{
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(RTBDynamicPost.prototype.__proto__ || Object.getPrototypeOf(RTBDynamicPost.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        child_attachments: 'child_attachments',
        created: 'created',
        description: 'description',
        id: 'id',
        image_url: 'image_url',
        link: 'link',
        message: 'message',
        owner_id: 'owner_id',
        place_id: 'place_id',
        product_id: 'product_id',
        title: 'title'
      });
    }
  }]);
  return RTBDynamicPost;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ReachFrequencySpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ReachFrequencySpec = function (_AbstractCrudObject) {
  inherits(ReachFrequencySpec, _AbstractCrudObject);

  function ReachFrequencySpec() {
    classCallCheck(this, ReachFrequencySpec);
    return possibleConstructorReturn(this, (ReachFrequencySpec.__proto__ || Object.getPrototypeOf(ReachFrequencySpec)).apply(this, arguments));
  }

  createClass(ReachFrequencySpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        countries: 'countries',
        default_creation_data: 'default_creation_data',
        max_campaign_duration: 'max_campaign_duration',
        max_days_to_finish: 'max_days_to_finish',
        max_pause_without_prediction_rerun: 'max_pause_without_prediction_rerun',
        min_campaign_duration: 'min_campaign_duration',
        min_reach_limits: 'min_reach_limits'
      });
    }
  }]);
  return ReachFrequencySpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * RevSharePolicy
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var RevSharePolicy = function (_AbstractCrudObject) {
  inherits(RevSharePolicy, _AbstractCrudObject);

  function RevSharePolicy() {
    classCallCheck(this, RevSharePolicy);
    return possibleConstructorReturn(this, (RevSharePolicy.__proto__ || Object.getPrototypeOf(RevSharePolicy)).apply(this, arguments));
  }

  createClass(RevSharePolicy, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        policy_id: 'policy_id',
        policy_name: 'policy_name'
      });
    }
  }]);
  return RevSharePolicy;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ScreenName
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ScreenName = function (_AbstractCrudObject) {
  inherits(ScreenName, _AbstractCrudObject);

  function ScreenName() {
    classCallCheck(this, ScreenName);
    return possibleConstructorReturn(this, (ScreenName.__proto__ || Object.getPrototypeOf(ScreenName)).apply(this, arguments));
  }

  createClass(ScreenName, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        service_name: 'service_name',
        service_type: 'service_type',
        value: 'value'
      });
    }
  }]);
  return ScreenName;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ShadowIGComment
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ShadowIGComment = function (_AbstractCrudObject) {
  inherits(ShadowIGComment, _AbstractCrudObject);

  function ShadowIGComment() {
    classCallCheck(this, ShadowIGComment);
    return possibleConstructorReturn(this, (ShadowIGComment.__proto__ || Object.getPrototypeOf(ShadowIGComment)).apply(this, arguments));
  }

  createClass(ShadowIGComment, [{
    key: 'getReplies',
    value: function getReplies(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ShadowIGComment, fields, params, fetchFirstPage, '/replies');
    }
  }, {
    key: 'createReply',
    value: function createReply(fields, params) {
      return this.createEdge('/replies', fields, params, ShadowIGComment);
    }
  }, {
    key: 'delete',
    value: function _delete(fields, params) {
      return get$1(ShadowIGComment.prototype.__proto__ || Object.getPrototypeOf(ShadowIGComment.prototype), 'delete', this).call(this, params);
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(ShadowIGComment.prototype.__proto__ || Object.getPrototypeOf(ShadowIGComment.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        hidden: 'hidden',
        id: 'id',
        like_count: 'like_count',
        media: 'media',
        text: 'text',
        timestamp: 'timestamp',
        user: 'user',
        username: 'username'
      });
    }
  }]);
  return ShadowIGComment;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ShadowIGMedia
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ShadowIGMedia = function (_AbstractCrudObject) {
  inherits(ShadowIGMedia, _AbstractCrudObject);

  function ShadowIGMedia() {
    classCallCheck(this, ShadowIGMedia);
    return possibleConstructorReturn(this, (ShadowIGMedia.__proto__ || Object.getPrototypeOf(ShadowIGMedia)).apply(this, arguments));
  }

  createClass(ShadowIGMedia, [{
    key: 'getComments',
    value: function getComments(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ShadowIGComment, fields, params, fetchFirstPage, '/comments');
    }
  }, {
    key: 'createComment',
    value: function createComment(fields, params) {
      return this.createEdge('/comments', fields, params, ShadowIGComment);
    }
  }, {
    key: 'getInsights',
    value: function getInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(InstagramInsightsResult, fields, params, fetchFirstPage, '/insights');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }, {
    key: 'update',
    value: function update(fields, params) {
      return get$1(ShadowIGMedia.prototype.__proto__ || Object.getPrototypeOf(ShadowIGMedia.prototype), 'update', this).call(this, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        caption: 'caption',
        comments_count: 'comments_count',
        id: 'id',
        ig_id: 'ig_id',
        is_comment_enabled: 'is_comment_enabled',
        like_count: 'like_count',
        media_type: 'media_type',
        media_url: 'media_url',
        owner: 'owner',
        permalink: 'permalink',
        shortcode: 'shortcode',
        thumbnail_url: 'thumbnail_url',
        timestamp: 'timestamp',
        username: 'username'
      });
    }
  }]);
  return ShadowIGMedia;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * ShadowIGUser
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var ShadowIGUser = function (_AbstractCrudObject) {
  inherits(ShadowIGUser, _AbstractCrudObject);

  function ShadowIGUser() {
    classCallCheck(this, ShadowIGUser);
    return possibleConstructorReturn(this, (ShadowIGUser.__proto__ || Object.getPrototypeOf(ShadowIGUser)).apply(this, arguments));
  }

  createClass(ShadowIGUser, [{
    key: 'getInsights',
    value: function getInsights(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(InstagramInsightsResult, fields, params, fetchFirstPage, '/insights');
    }
  }, {
    key: 'createMedia',
    value: function createMedia(fields, params) {
      return this.createEdge('/media', fields, params);
    }
  }, {
    key: 'getMedia',
    value: function getMedia(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ShadowIGMedia, fields, params, fetchFirstPage, '/media');
    }
  }, {
    key: 'createMediaPublish',
    value: function createMediaPublish(fields, params) {
      return this.createEdge('/media_publish', fields, params, ShadowIGMedia);
    }
  }, {
    key: 'getTags',
    value: function getTags(fields, params) {
      var fetchFirstPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      return this.getEdge(ShadowIGMedia, fields, params, fetchFirstPage, '/tags');
    }
  }, {
    key: 'get',
    value: function get(fields, params) {
      return this.read(fields, params);
    }
  }], [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        biography: 'biography',
        business_discovery: 'business_discovery',
        followers_count: 'followers_count',
        follows_count: 'follows_count',
        id: 'id',
        ig_id: 'ig_id',
        media_count: 'media_count',
        mentioned_comment: 'mentioned_comment',
        mentioned_media: 'mentioned_media',
        name: 'name',
        profile_picture_url: 'profile_picture_url',
        username: 'username',
        website: 'website'
      });
    }
  }]);
  return ShadowIGUser;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Targeting
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Targeting = function (_AbstractCrudObject) {
  inherits(Targeting, _AbstractCrudObject);

  function Targeting() {
    classCallCheck(this, Targeting);
    return possibleConstructorReturn(this, (Targeting.__proto__ || Object.getPrototypeOf(Targeting)).apply(this, arguments));
  }

  createClass(Targeting, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        adgroup_id: 'adgroup_id',
        age_max: 'age_max',
        age_min: 'age_min',
        alternate_auto_targeting_option: 'alternate_auto_targeting_option',
        app_install_state: 'app_install_state',
        audience_network_positions: 'audience_network_positions',
        behaviors: 'behaviors',
        cities: 'cities',
        college_years: 'college_years',
        connections: 'connections',
        contextual_targeting_categories: 'contextual_targeting_categories',
        countries: 'countries',
        country: 'country',
        country_groups: 'country_groups',
        custom_audiences: 'custom_audiences',
        device_platforms: 'device_platforms',
        direct_install_devices: 'direct_install_devices',
        dynamic_audience_ids: 'dynamic_audience_ids',
        education_majors: 'education_majors',
        education_schools: 'education_schools',
        education_statuses: 'education_statuses',
        effective_audience_network_positions: 'effective_audience_network_positions',
        effective_device_platforms: 'effective_device_platforms',
        effective_facebook_positions: 'effective_facebook_positions',
        effective_instagram_positions: 'effective_instagram_positions',
        effective_messenger_positions: 'effective_messenger_positions',
        effective_publisher_platforms: 'effective_publisher_platforms',
        engagement_specs: 'engagement_specs',
        ethnic_affinity: 'ethnic_affinity',
        exclude_reached_since: 'exclude_reached_since',
        excluded_connections: 'excluded_connections',
        excluded_custom_audiences: 'excluded_custom_audiences',
        excluded_dynamic_audience_ids: 'excluded_dynamic_audience_ids',
        excluded_engagement_specs: 'excluded_engagement_specs',
        excluded_geo_locations: 'excluded_geo_locations',
        excluded_mobile_device_model: 'excluded_mobile_device_model',
        excluded_product_audience_specs: 'excluded_product_audience_specs',
        excluded_publisher_categories: 'excluded_publisher_categories',
        excluded_publisher_list_ids: 'excluded_publisher_list_ids',
        excluded_user_device: 'excluded_user_device',
        exclusions: 'exclusions',
        facebook_positions: 'facebook_positions',
        family_statuses: 'family_statuses',
        fb_deal_id: 'fb_deal_id',
        flexible_spec: 'flexible_spec',
        friends_of_connections: 'friends_of_connections',
        genders: 'genders',
        generation: 'generation',
        geo_locations: 'geo_locations',
        home_ownership: 'home_ownership',
        home_type: 'home_type',
        home_value: 'home_value',
        household_composition: 'household_composition',
        income: 'income',
        industries: 'industries',
        instagram_positions: 'instagram_positions',
        interested_in: 'interested_in',
        interests: 'interests',
        is_whatsapp_destination_ad: 'is_whatsapp_destination_ad',
        keywords: 'keywords',
        life_events: 'life_events',
        locales: 'locales',
        messenger_positions: 'messenger_positions',
        moms: 'moms',
        net_worth: 'net_worth',
        office_type: 'office_type',
        place_page_set_ids: 'place_page_set_ids',
        political_views: 'political_views',
        politics: 'politics',
        product_audience_specs: 'product_audience_specs',
        publisher_platforms: 'publisher_platforms',
        publisher_visibility_categories: 'publisher_visibility_categories',
        radius: 'radius',
        regions: 'regions',
        relationship_statuses: 'relationship_statuses',
        rtb_flag: 'rtb_flag',
        site_category: 'site_category',
        targeting_optimization: 'targeting_optimization',
        user_adclusters: 'user_adclusters',
        user_device: 'user_device',
        user_event: 'user_event',
        user_os: 'user_os',
        wireless_carrier: 'wireless_carrier',
        work_employers: 'work_employers',
        work_positions: 'work_positions',
        zips: 'zips'
      });
    }
  }, {
    key: 'DevicePlatforms',
    get: function get() {
      return Object.freeze({
        mobile: 'mobile',
        desktop: 'desktop',
        connected_tv: 'connected_tv'
      });
    }
  }, {
    key: 'EffectiveDevicePlatforms',
    get: function get() {
      return Object.freeze({
        mobile: 'mobile',
        desktop: 'desktop',
        connected_tv: 'connected_tv'
      });
    }
  }]);
  return Targeting;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingDynamicRule
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingDynamicRule = function (_AbstractCrudObject) {
  inherits(TargetingDynamicRule, _AbstractCrudObject);

  function TargetingDynamicRule() {
    classCallCheck(this, TargetingDynamicRule);
    return possibleConstructorReturn(this, (TargetingDynamicRule.__proto__ || Object.getPrototypeOf(TargetingDynamicRule)).apply(this, arguments));
  }

  createClass(TargetingDynamicRule, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        action_type: 'action.type',
        ad_group_id: 'ad_group_id',
        campaign_group_id: 'campaign_group_id',
        campaign_id: 'campaign_id',
        impression_count: 'impression_count',
        page_id: 'page_id',
        post: 'post',
        retention_seconds: 'retention_seconds'
      });
    }
  }]);
  return TargetingDynamicRule;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocation
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocation = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocation, _AbstractCrudObject);

  function TargetingGeoLocation() {
    classCallCheck(this, TargetingGeoLocation);
    return possibleConstructorReturn(this, (TargetingGeoLocation.__proto__ || Object.getPrototypeOf(TargetingGeoLocation)).apply(this, arguments));
  }

  createClass(TargetingGeoLocation, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        cities: 'cities',
        countries: 'countries',
        country_groups: 'country_groups',
        custom_locations: 'custom_locations',
        electoral_districts: 'electoral_districts',
        geo_markets: 'geo_markets',
        location_types: 'location_types',
        places: 'places',
        political_districts: 'political_districts',
        regions: 'regions',
        zips: 'zips'
      });
    }
  }]);
  return TargetingGeoLocation;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocationCity
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocationCity = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocationCity, _AbstractCrudObject);

  function TargetingGeoLocationCity() {
    classCallCheck(this, TargetingGeoLocationCity);
    return possibleConstructorReturn(this, (TargetingGeoLocationCity.__proto__ || Object.getPrototypeOf(TargetingGeoLocationCity)).apply(this, arguments));
  }

  createClass(TargetingGeoLocationCity, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        distance_unit: 'distance_unit',
        key: 'key',
        name: 'name',
        radius: 'radius',
        region: 'region',
        region_id: 'region_id'
      });
    }
  }]);
  return TargetingGeoLocationCity;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocationCustomLocation
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocationCustomLocation = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocationCustomLocation, _AbstractCrudObject);

  function TargetingGeoLocationCustomLocation() {
    classCallCheck(this, TargetingGeoLocationCustomLocation);
    return possibleConstructorReturn(this, (TargetingGeoLocationCustomLocation.__proto__ || Object.getPrototypeOf(TargetingGeoLocationCustomLocation)).apply(this, arguments));
  }

  createClass(TargetingGeoLocationCustomLocation, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        address_string: 'address_string',
        country: 'country',
        country_group: 'country_group',
        custom_type: 'custom_type',
        distance_unit: 'distance_unit',
        key: 'key',
        latitude: 'latitude',
        longitude: 'longitude',
        max_population: 'max_population',
        min_population: 'min_population',
        name: 'name',
        primary_city_id: 'primary_city_id',
        radius: 'radius',
        region_id: 'region_id'
      });
    }
  }]);
  return TargetingGeoLocationCustomLocation;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocationElectoralDistrict
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocationElectoralDistrict = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocationElectoralDistrict, _AbstractCrudObject);

  function TargetingGeoLocationElectoralDistrict() {
    classCallCheck(this, TargetingGeoLocationElectoralDistrict);
    return possibleConstructorReturn(this, (TargetingGeoLocationElectoralDistrict.__proto__ || Object.getPrototypeOf(TargetingGeoLocationElectoralDistrict)).apply(this, arguments));
  }

  createClass(TargetingGeoLocationElectoralDistrict, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        electoral_district: 'electoral_district',
        key: 'key',
        name: 'name'
      });
    }
  }]);
  return TargetingGeoLocationElectoralDistrict;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocationMarket
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocationMarket = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocationMarket, _AbstractCrudObject);

  function TargetingGeoLocationMarket() {
    classCallCheck(this, TargetingGeoLocationMarket);
    return possibleConstructorReturn(this, (TargetingGeoLocationMarket.__proto__ || Object.getPrototypeOf(TargetingGeoLocationMarket)).apply(this, arguments));
  }

  createClass(TargetingGeoLocationMarket, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        key: 'key',
        market_type: 'market_type',
        name: 'name'
      });
    }
  }]);
  return TargetingGeoLocationMarket;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocationPlace
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocationPlace = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocationPlace, _AbstractCrudObject);

  function TargetingGeoLocationPlace() {
    classCallCheck(this, TargetingGeoLocationPlace);
    return possibleConstructorReturn(this, (TargetingGeoLocationPlace.__proto__ || Object.getPrototypeOf(TargetingGeoLocationPlace)).apply(this, arguments));
  }

  createClass(TargetingGeoLocationPlace, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        distance_unit: 'distance_unit',
        key: 'key',
        latitude: 'latitude',
        longitude: 'longitude',
        name: 'name',
        primary_city_id: 'primary_city_id',
        radius: 'radius',
        region_id: 'region_id'
      });
    }
  }]);
  return TargetingGeoLocationPlace;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocationPoliticalDistrict
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocationPoliticalDistrict = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocationPoliticalDistrict, _AbstractCrudObject);

  function TargetingGeoLocationPoliticalDistrict() {
    classCallCheck(this, TargetingGeoLocationPoliticalDistrict);
    return possibleConstructorReturn(this, (TargetingGeoLocationPoliticalDistrict.__proto__ || Object.getPrototypeOf(TargetingGeoLocationPoliticalDistrict)).apply(this, arguments));
  }

  createClass(TargetingGeoLocationPoliticalDistrict, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        key: 'key',
        name: 'name',
        political_district: 'political_district'
      });
    }
  }]);
  return TargetingGeoLocationPoliticalDistrict;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocationRegion
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocationRegion = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocationRegion, _AbstractCrudObject);

  function TargetingGeoLocationRegion() {
    classCallCheck(this, TargetingGeoLocationRegion);
    return possibleConstructorReturn(this, (TargetingGeoLocationRegion.__proto__ || Object.getPrototypeOf(TargetingGeoLocationRegion)).apply(this, arguments));
  }

  createClass(TargetingGeoLocationRegion, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        key: 'key',
        name: 'name'
      });
    }
  }]);
  return TargetingGeoLocationRegion;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingGeoLocationZip
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingGeoLocationZip = function (_AbstractCrudObject) {
  inherits(TargetingGeoLocationZip, _AbstractCrudObject);

  function TargetingGeoLocationZip() {
    classCallCheck(this, TargetingGeoLocationZip);
    return possibleConstructorReturn(this, (TargetingGeoLocationZip.__proto__ || Object.getPrototypeOf(TargetingGeoLocationZip)).apply(this, arguments));
  }

  createClass(TargetingGeoLocationZip, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        country: 'country',
        key: 'key',
        name: 'name',
        primary_city_id: 'primary_city_id',
        region_id: 'region_id'
      });
    }
  }]);
  return TargetingGeoLocationZip;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingProductAudienceSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingProductAudienceSpec = function (_AbstractCrudObject) {
  inherits(TargetingProductAudienceSpec, _AbstractCrudObject);

  function TargetingProductAudienceSpec() {
    classCallCheck(this, TargetingProductAudienceSpec);
    return possibleConstructorReturn(this, (TargetingProductAudienceSpec.__proto__ || Object.getPrototypeOf(TargetingProductAudienceSpec)).apply(this, arguments));
  }

  createClass(TargetingProductAudienceSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        exclusions: 'exclusions',
        inclusions: 'inclusions',
        product_set_id: 'product_set_id'
      });
    }
  }]);
  return TargetingProductAudienceSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TargetingProductAudienceSubSpec
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TargetingProductAudienceSubSpec = function (_AbstractCrudObject) {
  inherits(TargetingProductAudienceSubSpec, _AbstractCrudObject);

  function TargetingProductAudienceSubSpec() {
    classCallCheck(this, TargetingProductAudienceSubSpec);
    return possibleConstructorReturn(this, (TargetingProductAudienceSubSpec.__proto__ || Object.getPrototypeOf(TargetingProductAudienceSubSpec)).apply(this, arguments));
  }

  createClass(TargetingProductAudienceSubSpec, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        retention_seconds: 'retention_seconds',
        rule: 'rule'
      });
    }
  }]);
  return TargetingProductAudienceSubSpec;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * Transaction
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var Transaction = function (_AbstractCrudObject) {
  inherits(Transaction, _AbstractCrudObject);

  function Transaction() {
    classCallCheck(this, Transaction);
    return possibleConstructorReturn(this, (Transaction.__proto__ || Object.getPrototypeOf(Transaction)).apply(this, arguments));
  }

  createClass(Transaction, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        account_id: 'account_id',
        app_amount: 'app_amount',
        billing_end_time: 'billing_end_time',
        billing_reason: 'billing_reason',
        billing_start_time: 'billing_start_time',
        charge_type: 'charge_type',
        checkout_campaign_group_id: 'checkout_campaign_group_id',
        credential_id: 'credential_id',
        fatura_id: 'fatura_id',
        id: 'id',
        is_business_ec_charge: 'is_business_ec_charge',
        payment_option: 'payment_option',
        provider_amount: 'provider_amount',
        status: 'status',
        time: 'time',
        tracking_id: 'tracking_id'
      });
    }
  }]);
  return Transaction;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * TransactionCurrencyAmount
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var TransactionCurrencyAmount = function (_AbstractCrudObject) {
  inherits(TransactionCurrencyAmount, _AbstractCrudObject);

  function TransactionCurrencyAmount() {
    classCallCheck(this, TransactionCurrencyAmount);
    return possibleConstructorReturn(this, (TransactionCurrencyAmount.__proto__ || Object.getPrototypeOf(TransactionCurrencyAmount)).apply(this, arguments));
  }

  createClass(TransactionCurrencyAmount, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        amount: 'amount',
        currency: 'currency',
        total_amount: 'total_amount'
      });
    }
  }]);
  return TransactionCurrencyAmount;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * UserLeadGenDisclaimerResponse
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var UserLeadGenDisclaimerResponse = function (_AbstractCrudObject) {
  inherits(UserLeadGenDisclaimerResponse, _AbstractCrudObject);

  function UserLeadGenDisclaimerResponse() {
    classCallCheck(this, UserLeadGenDisclaimerResponse);
    return possibleConstructorReturn(this, (UserLeadGenDisclaimerResponse.__proto__ || Object.getPrototypeOf(UserLeadGenDisclaimerResponse)).apply(this, arguments));
  }

  createClass(UserLeadGenDisclaimerResponse, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        checkbox_key: 'checkbox_key',
        is_checked: 'is_checked'
      });
    }
  }]);
  return UserLeadGenDisclaimerResponse;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * UserLeadGenFieldData
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var UserLeadGenFieldData = function (_AbstractCrudObject) {
  inherits(UserLeadGenFieldData, _AbstractCrudObject);

  function UserLeadGenFieldData() {
    classCallCheck(this, UserLeadGenFieldData);
    return possibleConstructorReturn(this, (UserLeadGenFieldData.__proto__ || Object.getPrototypeOf(UserLeadGenFieldData)).apply(this, arguments));
  }

  createClass(UserLeadGenFieldData, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        name: 'name',
        values: 'values'
      });
    }
  }]);
  return UserLeadGenFieldData;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * VoipInfo
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var VoipInfo = function (_AbstractCrudObject) {
  inherits(VoipInfo, _AbstractCrudObject);

  function VoipInfo() {
    classCallCheck(this, VoipInfo);
    return possibleConstructorReturn(this, (VoipInfo.__proto__ || Object.getPrototypeOf(VoipInfo)).apply(this, arguments));
  }

  createClass(VoipInfo, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        has_mobile_app: 'has_mobile_app',
        has_permission: 'has_permission',
        is_callable: 'is_callable',
        is_callable_webrtc: 'is_callable_webrtc',
        is_pushable: 'is_pushable',
        reason_code: 'reason_code',
        reason_description: 'reason_description'
      });
    }
  }]);
  return VoipInfo;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * WebAppLink
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var WebAppLink = function (_AbstractCrudObject) {
  inherits(WebAppLink, _AbstractCrudObject);

  function WebAppLink() {
    classCallCheck(this, WebAppLink);
    return possibleConstructorReturn(this, (WebAppLink.__proto__ || Object.getPrototypeOf(WebAppLink)).apply(this, arguments));
  }

  createClass(WebAppLink, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        should_fallback: 'should_fallback',
        url: 'url'
      });
    }
  }]);
  return WebAppLink;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * WindowsAppLink
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var WindowsAppLink = function (_AbstractCrudObject) {
  inherits(WindowsAppLink, _AbstractCrudObject);

  function WindowsAppLink() {
    classCallCheck(this, WindowsAppLink);
    return possibleConstructorReturn(this, (WindowsAppLink.__proto__ || Object.getPrototypeOf(WindowsAppLink)).apply(this, arguments));
  }

  createClass(WindowsAppLink, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        app_id: 'app_id',
        app_name: 'app_name',
        package_family_name: 'package_family_name',
        url: 'url'
      });
    }
  }]);
  return WindowsAppLink;
}(AbstractCrudObject);

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 */
/**
 * WindowsPhoneAppLink
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */

var WindowsPhoneAppLink = function (_AbstractCrudObject) {
  inherits(WindowsPhoneAppLink, _AbstractCrudObject);

  function WindowsPhoneAppLink() {
    classCallCheck(this, WindowsPhoneAppLink);
    return possibleConstructorReturn(this, (WindowsPhoneAppLink.__proto__ || Object.getPrototypeOf(WindowsPhoneAppLink)).apply(this, arguments));
  }

  createClass(WindowsPhoneAppLink, null, [{
    key: 'Fields',
    get: function get() {
      return Object.freeze({
        app_id: 'app_id',
        app_name: 'app_name',
        url: 'url'
      });
    }
  }]);
  return WindowsPhoneAppLink;
}(AbstractCrudObject);

export { Http, FacebookAdsApi, FacebookAdsApiBatch, APIRequest, APIResponse, AdVideo, AdAccount, AdAccountAdRulesHistory, AdAccountContextualTargeting, AdAccountCreationRequest, AdAccountDeliveryEstimate, AdAccountRoas, AdAccountTargetingUnified, AdAccountUser, AdActivity, AdAssetFeedSpec, AdAssetFeedSpecAssetLabel, AdAssetFeedSpecBody, AdAssetFeedSpecCaption, AdAssetFeedSpecDescription, AdAssetFeedSpecGroupRule, AdAssetFeedSpecImage, AdAssetFeedSpecLinkURL, AdAssetFeedSpecTitle, AdAssetFeedSpecVideo, AdAsyncRequest, AdAsyncRequestSet, AdAsyncRequestSetNotificationResult, AdCampaignDeliveryEstimate, AdCampaignFrequencyControlSpecs, AdCreative, AdCreativeCollectionThumbnailInfo, AdCreativeLinkData, AdCreativeLinkDataAppLinkSpec, AdCreativeLinkDataCallToAction, AdCreativeLinkDataCallToActionValue, AdCreativeLinkDataChildAttachment, AdCreativeLinkDataCustomOverlaySpec, AdCreativeLinkDataImageOverlaySpec, AdCreativeObjectStorySpec, AdCreativePhotoData, AdCreativePlaceData, AdCreativePostClickConfiguration, AdCreativeTextData, AdCreativeVideoData, AdImage, AdKeywordStats, AdLabel, AdNetworkAnalyticsAsyncQueryResult, AdNetworkAnalyticsSyncQueryResult, AdPlacePageSet, AdPreview, AdPromotedObject, AdRecommendation, AdRecommendationData, AdReportRun, AdRule, AdRuleEvaluationSpec, AdRuleExecutionOptions, AdRuleExecutionSpec, AdRuleFilters, AdRuleHistory, AdRuleHistoryResult, AdRuleHistoryResultAction, AdRuleSchedule, AdRuleScheduleSpec, AdRuleTrigger, AdStudy, AdStudyAdsAssetUserPermissions, AdStudyCell, AdStudyObjective, AdgroupPlacementSpecificReviewFeedback, AdgroupRelevanceScore, AdgroupReviewFeedback, AdsActionStats, AdsDataPartner, AdsImageCrops, AdsInsights, AdsPixel, AdsPixelStats, AdsPixelStatsResult, AgencyClientDeclaration, Album, AndroidAppLink, AppLinks, AssignedUser, AttributionSpec, AudiencePermission, AudioCopyright, BroadTargetingCategories, Business, BusinessActivityLogEvent, BusinessAdAccountRequest, BusinessAdvertisableApplicationsResult, BusinessApplicationRequest, BusinessMatchedSearchApplicationsEdgeData, BusinessPageRequest, BusinessProject, BusinessRoleRequest, BusinessUser, Canvas, CanvasBodyElement, CheckBatchRequestStatus, ConversionActionQuery, CopyrightAttributionInsights, CoverPhoto, CustomAudience, CustomAudienceAdAccount, CustomAudienceDataSource, CustomAudiencePermission, CustomAudiencePrefillState, CustomAudienceSession, CustomAudienceStatus, CustomAudiencesTOS, CustomConversion, CustomConversionStatsResult, DayPart, DeliveryCheck, DeliveryCheckExtraInfo, DirectDeal, DirectDebit, Domain, Engagement, EntWithSponsor, Event, EventSourceGroup, ExtendedCredit, ExtendedCreditAllocationConfig, ExtendedCreditInvoiceGroup, ExternalEventSource, FlexibleTargeting, FundingSourceDetails, FundingSourceDetailsCoupon, HotelRoom, IDName, InsightsResult, InstagramInsightsResult, InstagramInsightsValue, InstantArticle, InstantArticleInsightsQueryResult, IosAppLink, LeadGenConditionalQuestionsGroup, LeadGenDataDraft, LeadGenDraftQuestion, LeadGenFormPreviewDetails, LeadGenLegalContent, LeadGenQualifier, LeadGenQuestion, LeadGenQuestionOption, LegacyBusinessAdAccountRequest, LifeEvent, LiveVideo, Location, LookalikeSpec, MailingAddress, MeasurementReport, MediaFingerprint, MessagingFeatureReview, MessengerProfile, MinimumBudget, NativeOffer, OfflineConversionDataSet, OfflineTermsOfService, OffsitePixel, OpenGraphContext, OpenGraphRating, OracleTransaction, OutcomePredictionPoint, OwnedDomain, Page, PageAdminNote, PageCallToAction, PageCategory, PageChangeProposal, PageInsightsAsyncExportRun, PageLabel, PageParking, PagePaymentOptions, PagePost, PageRestaurantServices, PageRestaurantSpecialties, PageSavedFilter, PageSettings, PageStartInfo, PageUpcomingChange, PageVideosYouCanUse, PartnerCategory, PartnerIntegrationLinked, Persona, Photo, PlaceTopic, ProductCatalog, ProductCatalogHotelRoomsBatch, ProductCatalogImageSettings, ProductCatalogImageSettingsOperation, ProductCatalogPricingVariablesBatch, ProductCatalogProductSetsBatch, ProductDaEventSamplesBatch, ProductEventStat, ProductFeed, ProductFeedSchedule, ProductFeedUpload, ProductFeedUploadError, ProductGroup, ProductItem, ProductItemCommerceInsights, ProductSet, ProductVariant, ProductsQualityIssue, Profile, ProfilePictureSource, PublisherSpace, RTBDynamicPost, ReachEstimate, ReachFrequencyPrediction, ReachFrequencySpec, RevSharePolicy, SavedMessageResponse, ScreenName, ShadowIGComment, ShadowIGMedia, ShadowIGUser, SystemUser, Tab, Targeting, TargetingDynamicRule, TargetingGeoLocation, TargetingGeoLocationCity, TargetingGeoLocationCustomLocation, TargetingGeoLocationElectoralDistrict, TargetingGeoLocationMarket, TargetingGeoLocationPlace, TargetingGeoLocationPoliticalDistrict, TargetingGeoLocationRegion, TargetingGeoLocationZip, TargetingProductAudienceSpec, TargetingProductAudienceSubSpec, TargetingSentenceLine, Transaction, TransactionCurrencyAmount, URL, UnifiedThread, User, UserLeadGenDisclaimerResponse, UserLeadGenFieldData, VideoCopyright, VideoCopyrightRule, VideoList, VideoThumbnail, VoipInfo, WebAppLink, WindowsAppLink, WindowsPhoneAppLink, Campaign, AdSet, Ad, Lead, LeadgenForm };

//# sourceMappingURL=es.js.map
