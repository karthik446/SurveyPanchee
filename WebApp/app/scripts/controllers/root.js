'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:RootCtrl
 * @description
 * # RootCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('RootCtrl', function ($scope, $route, $routeParams, $location, $rootScope, userSvc) {
   
    $scope.$on('$routeChangeStart', function (e, next, current) {
      if (next.access != undefined && !next.access.allowAnonymous && !userSvc.getUser().loggedIn) {
        $location.path("/login");
      }
      if (next.access != undefined && next.access.allowLoginUser === false && userSvc.getUser().loggedIn) {
        $location.path("/");
      }
    });

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      for (var i in window.routes) {
        if (next.indexOf(i) != -1) {
          if (!window.routes[i].access.allowAnonymous && !userSvc.getUser().loggedIn) {
            $location.path("/login");
          }
        }
      }
    });
  });

