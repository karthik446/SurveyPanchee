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

    this.resendEmailConfirmation = function (userId) {
      var resendEmailConformationModel = {};
      resendEmailConformationModel.Email = userId;
      resendEmailConformationModel.EmailUrl = 'http://localhost:9000/#/confirmEmail'
      var promise = $http.post(BASE_URL + 'api/Account/ResendEmailConf', resendEmailConformationModel).then(function (response) {

      },
        function (response) {
          return $q.reject(response);
        });

      return promise;
    }
    
    this.changePassword = function (changePasswordModel) {
      var changePasswordlViewModel = { 'OldPassword': changePasswordModel.currentPassword, 'NewPassword': changePasswordModel.password, 'ConfirmPassword': changePasswordModel.confirmPassword }
      
      var promise = $http.post(BASE_URL + 'api/Account/ChangePassword', changePasswordlViewModel).then(
        function success(response) {
        },
        function failure(response) {
          return $q.reject(response);
        }
      )
      return promise;

    }

    this.resetPassword = function (resetPasswordModel, userId, code) {
      var resetPasswordlViewModel = { 'UserId': userId, 'Code': code, 'Password': resetPasswordModel.password, 'ConfirmPassword': resetPasswordModel.confirmPassword }
      var promise = $http.post(BASE_URL + 'api/Account/ResetPassword', resetPasswordlViewModel).then(
        function success(response) {
        },
        function failure(response) {
          return $q.reject(response);
        }
      )
      return promise;
    }
    this.forgotPassword = function (userId) {
      var userConfirmationViewModel = {};
      userConfirmationViewModel.Email = userId;
      userConfirmationViewModel.EmailUrl = 'http://localhost:9000/#/resetpassword'
      var promise = $http.post(BASE_URL + 'api/Account/ForgotPassword', userConfirmationViewModel).then(function (response) {

      },
        function (response) {
          return $q.reject(response);
        });

      return promise;
    }

    this.registerUser = function (regModel) {
      var RegisterBindingModel = {};
      RegisterBindingModel.Email = regModel.username;
      RegisterBindingModel.Password = regModel.password;
      RegisterBindingModel.ConfirmPassword = regModel.confirmPassword;
      RegisterBindingModel.ConformationEmailUrl = 'http://localhost:9000/#/confirmEmail'
      var promise = $http.post(BASE_URL + 'api/Account/Register', RegisterBindingModel).then(
        function success(response) {

        },
        function error(response) {
          return $q.reject(response);
        });

      return promise;
    }

    this.loginFunc = function (username, password) {

      var data = "grant_type=password&username=" + username + "&password=" + password;
      var promise = $http.post(BASE_URL + "Token", data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function success(response) {
        localStorage.setItem('user', username);
        localStorage.setItem('token', response.data.access_token);
        return response;
      },
        function error(response) {
          return $q.reject(response);
        })
      return promise;
    }

    this.confirmEmail = function (userId, code) {
      var confirmEmailViewModel = { 'UserId': userId, 'Code': code }
      var promise = $http.post(BASE_URL + 'api/Account/ConfirmEmail', confirmEmailViewModel).then(
        function success(response) {

        },
        function error(response) {
          return $q.reject(response);
        }
      )
      return promise;
    }

    this.logout = function () {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      $route.reload();
    };

  });
