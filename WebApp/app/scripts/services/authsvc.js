/// <reference path="../../../typings/Angular/angular.d.ts" />
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
    var BASE_URL = 'http://aerontek.com/';

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
    
   this.confirmEmail = function (userId, code) {
            var confirmEmailViewModel = { 'UserId': userId, 'Code': code }
            var promise = $http.post(BASE_URL + 'api/Account/ConfirmEmail', confirmEmailViewModel).then(
                function success(response) {

                },
                function failure(response) {
                    return $q.reject(response);
                }
            )
            return promise;
        }

    this.logout = function () {
      localStorage.removeItem('user');
      $route.reload();
    };

  });
