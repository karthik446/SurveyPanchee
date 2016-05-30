'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:UserRegisterCtrl
 * @description
 * # UserRegisterCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('UserRegisterCtrl', function ($scope, $location, $sce, authSvc) {
     $scope.registerModel = {
            username: '',
            password: '',
            confirmPassword: ''
        }
        $scope.successfulReg = false;
        $scope.modelState = undefined;
        
        $scope.registerUser = function () {
            $scope.modelState = undefined;
            var regUser = $scope.registerModel;
            angular.forEach($scope.regForm.$error, function (error) {
                angular.forEach(error, function (field) {
                    field.$setTouched();
                });
            });
            if (regUser.username != '' && regUser.password == regUser.confirmPassword) {
                authSvc.registerUser(regUser).then(function successCallback(response) {
                    $scope.successfulReg = true;
                }, function errorCallback(response) {
                    $scope.modelState = response.data.ModelState;
                })
            }
        }
  });
