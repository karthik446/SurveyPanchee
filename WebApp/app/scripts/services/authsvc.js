'use strict';

/**
 * @ngdoc service
 * @name spwebApp.authSvc
 * @description
 * # authSvc
 * Service in the spwebApp.
 */
angular.module('spwebApp')
  .service('authSvc', function ($http, $timeout, $q, $route, $location, userSvc) {
    var BASE_URL = 'http://localhost:56112/';

    this.registerUser = function (regModel) {
      var RegisterBindingModel = {};
      RegisterBindingModel.Email = regModel.username;
      RegisterBindingModel.Password = regModel.password;
      RegisterBindingModel.ConfirmPassword = regModel.confirmPassword;
      RegisterBindingModel.ConformationEmailUrl = 'http://localhost:9000/#/confirmemail'
      var promise = $http.post(BASE_URL + 'api/Account/Register', RegisterBindingModel).then(function (response) {

      },
        function (response) {
          return $q.reject(response);
        });

      return promise;
    }


  });
