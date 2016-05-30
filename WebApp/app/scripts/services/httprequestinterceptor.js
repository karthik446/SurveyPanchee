'use strict';

/**
 * @ngdoc service
 * @name spwebApp.httpRequestInterceptor
 * @description
 * # httpRequestInterceptor
 * Service in the spwebApp.
 */
angular.module('spwebApp')
  .factory('httpRequestInterceptor', function ($q, $location) {
    return {
      request: function (request) {
        request.headers = request.headers || {};
        if (localStorage.getItem('token')) {
          request.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        }
        return request;
      }
    };
  });
