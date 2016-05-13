'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the spwebApp
 * http://localhost:56112/api/upload
 */
angular.module('spwebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.test = "test";
    $scope.uploadFile = function () {
     var formData = new FormData();
     formData.append('file', $scope.uploadFrm.file.value);
    }
  });
