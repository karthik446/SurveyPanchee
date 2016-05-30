'use strict';

/**
 * @ngdoc service
 * @name spwebApp.userSvc
 * @description
 * # userSvc
 * Service in the spwebApp.
 */
angular.module('spwebApp')
  .service('userSvc', function () {
    var vm = this;
    
    
    this.getUser = function () {
      return vm.user = {
      loggedIn: localStorage.getItem('user') ? true : false,
      name: localStorage.getItem('user'),
      accessToken: localStorage.getItem('token')
    };
    }
  });
