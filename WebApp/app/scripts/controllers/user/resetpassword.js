'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:UserResetpasswordCtrl
 * @description
 * # UserResetpasswordCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('UserResetpasswordCtrl', function ($scope, $route, $routeParams, authSvc) {

    $scope.passwordResetModel = {
      password: '',
      confirmPassword: ''
    }
    $scope.successReset = false;
    var userId = $routeParams.userId;
    var code = $routeParams.code;
    $scope.resetPassword = function () {
       $scope.resetPasswordFrm.password.$setTouched();
       $scope.resetPasswordFrm.confirmPwd.$setTouched();
       if ($scope.passwordResetModel.password == '' || $scope.passwordResetModel.confirmPassword == '')
        return;
      authSvc.resetPassword($scope.passwordResetModel, userId, code).then(
        function (response) {
          $scope.successReset = true;
        },
        function (response) {
          $scope.modelState = response.data.ModelState;
          $scope.passwordResetModel.password = '';
          $scope.passwordResetModel.confirmPassword = '';
          $scope.resetPasswordFrm.$setUntouched();
           $scope.successReset = false;
        }
      )
    }

  });
