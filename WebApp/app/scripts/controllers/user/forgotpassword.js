'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:UserForgotpasswordCtrl
 * @description
 * # UserForgotpasswordCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('UserForgotpasswordCtrl', function ($scope, authSvc) {
    $scope.emailId = '';
    $scope.successMessage = false;
    $scope.forgotPassword = function () {
       $scope.successMessage = false;
      if($scope.emailId ==='')
      {
        $scope.forgotPasswordFrm.username.$setTouched();
        return;
      }
      angular.forEach($scope.forgotPasswordFrm.$error, function (error) {
                angular.forEach(error, function (field) {
                    field.$setTouched();
                });
      });
      authSvc.forgotPassword($scope.emailId).then(
        function (response) {
          $scope.successMessage = true;
          $scope.modelState = undefined;
        },
        function (response) {
          $scope.modelState = response.data.ModelState;
        }
      )
    }
  });
