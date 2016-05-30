'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:UserLoginCtrl
 * @description
 * # UserLoginCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('UserLoginCtrl', function ($scope, $location, authSvc) {
    $scope.userModel = {
      username: '',
      passwordd: ''
    };
    $scope.emailUnconfirmed = false;
    $scope.loginFunc = function () {
      $scope.errorMessage = undefined;
      $scope.loginFrm.username.$setTouched();
      $scope.loginFrm.password.$setTouched();
      $scope.modelState = null;
      var usr = $scope.userModel;
      if (usr.password != '' && usr.username != '') {
        authSvc.loginFunc(usr.username, usr.password).then(function (response) {
          $location.path('/main');
        },
          function (response) {
            if (response.data.error == 'unconfirmed_email')
              $scope.emailUnconfirmed = true;
            $scope.errorMessage = response.data.error_description;
          }
        )
      }
    }

    $scope.resendEmailConfirmation = function () {
      $scope.loginFrm.username.$setTouched();
      if ($scope.userModel.username == '')
        return;
      $scope.userModel.password = '';
      authSvc.resendEmailConfirmation($scope.userModel.username).then(
        function (response) {
          $location.path('/resendConformation');
          $scope.emailUnconfirmed = false;
        },
        function (response) {
          $scope.modelState = response.data.ModelState;
          $scope.emailUnconfirmed = false;
        }
      )
    }

  });

