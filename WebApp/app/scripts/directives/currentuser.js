'use strict';

/**
 * @ngdoc directive
 * @name spwebApp.directive:currentUser
 * @description
 * # currentUser
 */
angular.module('spwebApp')
  .directive('currentUser', function () {
    return {
      templateUrl: 'views/user/currentuser.html',
      restrict: 'E',
      controller: function ($scope, $location, userSvc, authSvc) {
          $scope.userSvc = userSvc;
          $scope.login = function() {
            $location.path('/login')
          }
          $scope.logout = function() {
             authSvc.logout();
          }
      }
    };
  });
