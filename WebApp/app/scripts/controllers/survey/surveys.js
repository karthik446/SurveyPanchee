'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:SurveySurveysCtrl
 * @description
 * # SurveySurveysCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('SurveySurveysCtrl', function ($scope, surveySvc) {
    $scope.surveys = surveySvc.getSurveys();
  });
