'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:UserConfirmemailCtrl
 * @description
 * # UserConfirmemailCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('UserConfirmemailCtrl', function ($location, $route, $routeParams, $scope, authSvc) {
    var userId = $routeParams.userId;
    var code = $routeParams.code;
    $scope.successMessage = '';

    authSvc.confirmEmail(userId, code).then(
      function (response) {
        $scope.successMessage = "Thank you for registering, please confirm your email and login using"
      },
      function (response) {
        $scope.modelState = response.data.ModelState;
      }
    )
  });
