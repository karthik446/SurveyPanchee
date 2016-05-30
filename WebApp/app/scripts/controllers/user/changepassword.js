'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:UserChangepasswordCtrl
 * @description
 * # UserChangepasswordCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('UserChangepasswordCtrl', function ($scope, authSvc) {
    $scope.passwordChangeModel = {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    }
    $scope.successChange = false;
    $scope.resetPassword = function () {
      $scope.changePasswordFrm.currentPassword.$setTouched();
      $scope.changePasswordFrm.password.$setTouched();
      $scope.changePasswordFrm.confirmPwd.$setTouched();
      if ($scope.passwordChangeModel.password == '' ||
        $scope.passwordChangeModel.confirmPassword == '' ||
        $scope.passwordChangeModel.currentPassword == '')
        return;
      authSvc.changePassword($scope.passwordChangeModel).then(
        function (response) {
          $scope.successChange = true;
          $scope.modelState = undefined;
        },
        function (response) {
          $scope.successChange = false;
          $scope.modelState = response.data.ModelState;
          $scope.passwordChangeModel.currentPassword = '';
          $scope.passwordChangeModel.password = '';
          $scope.passwordChangeModel.confirmPassword = '';
          $scope.changePasswordFrm.$setUntouched();
        }
      )
    }

  });
