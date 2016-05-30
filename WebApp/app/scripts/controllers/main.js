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
  .controller('MainCtrl', function ($scope, $http) {
    $scope.uploadFile = function () {
      var file = $scope.myFile;
      console.log('file is ');
      console.dir(file);
      //var uploadUrl = "/fileUpload";
      //fileUpload.uploadFileToUrl(file, uploadUrl);
       var fd = new FormData();
        fd.append('file', file);
        $http.post('http://localhost:56112/api/upload', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    };
  });
