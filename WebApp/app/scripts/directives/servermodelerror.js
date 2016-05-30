'use strict';

/**
 * @ngdoc directive
 * @name spwebApp.directive:serverModelError
 * @description
 * # serverModelError
 */
angular.module('spwebApp')
  .directive('serverModelError', function () {
    return {
      template: '<div class="alert alert-danger col-sm-12" ng-show="errorsList.length > 0"> <span  ng-repeat="err in errorsList track by $index"> {{err}} </span></div>',
      restrict: 'E',
      scope: {modelstate:'='},
      controller: function ($scope) {
        $scope.$watch('modelstate', function (oldVal, newVal) {
          $scope.errorsList = getAllErrors($scope.modelstate);
        }, true);

        function getAllErrors(modelState) {
          var errors = [];
          for (var key in modelState) {
            for (var msg in modelState[key]) {
              errors.push(modelState[key][msg]);
            }
          }
          return errors;
        }
      }
    };
  });
