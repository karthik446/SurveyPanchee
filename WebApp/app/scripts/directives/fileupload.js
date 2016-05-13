'use strict';

/**
 * @ngdoc directive
 * @name spwebApp.directive:fileUpload
 * @description
 * # fileUpload
 */
angular.module('spwebApp')
  .directive('fileUpload', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the fileUpload directive');
      }
    };
  });
