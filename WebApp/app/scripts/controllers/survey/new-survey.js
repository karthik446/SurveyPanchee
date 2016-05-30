'use strict';

/**
 * @ngdoc function
 * @name spwebApp.controller:SurveyNewSurveyCtrl
 * @description
 * # SurveyNewSurveyCtrl
 * Controller of the spwebApp
 */
angular.module('spwebApp')
  .controller('SurveyNewSurveyCtrl', function ($scope, $location, surveySvc) {

    $scope.surveyModel = {
      surveyName: '',
      surveyQuestions: []
    }

    $scope.questionTypes = surveySvc.surveyQuestionTypes;
    var getNewQuestion = function () {
      return { surveyQuestionText: '', surveyOptions: [{}, {}], surveyQuestionType: 1 };
    }

    $scope.currentSurveyQuestion = getNewQuestion();

    $scope.$watch('currentSurveyQuestion.surveyQuestionType', function () {
      if ($scope.currentSurveyQuestion.surveyQuestionType == 3) {
        $scope.currentSurveyQuestion.surveyOptions = [];
      }
      else {
        $scope.currentSurveyQuestion.surveyOptions = [{}, {}];
      }
    });

    $scope.addQuestionToSurvey = function () {
      if ($scope.currentSurveyQuestion.surveyQuestionText == '') {
        $scope.questionFrm.surveyQuestion.$setTouched();
        return;
      }
      //if($scope.currentSurveyQuestion.surveyQuestionType == -1)
      $scope.surveyModel.surveyQuestions.push($scope.currentSurveyQuestion);
      $scope.currentSurveyQuestion = getNewQuestion();
      $scope.questionFrm.$setUntouched();
    }

    $scope.addNewOption = function () {
      if ($scope.currentSurveyQuestion.surveyOptions >= 5) {
        return;
      }
      $scope.currentSurveyQuestion.surveyOptions.push({});
    };
    $scope.removeOption = function (index) {
      $scope.currentSurveyQuestion.surveyOptions.splice(index, 1);
    }

    $scope.removeQuestion = function (index) {
      $scope.surveyModel.surveyQuestions.splice(index, 1);
    }

    $scope.createSurvey = function () {
      if ($scope.surveyModel.surveyName == '') {
        $scope.questionFrm.surveyName.$setTouched();
        return;
      }
      if ($scope.surveyModel.surveyQuestions.length < 1) {
        $scope.errorMessage = "Atleast one question is needed to create a survey"
        return;
      }

      surveySvc.createSry($scope.surveyModel).then(
        function (response) {
         // $location.path('/sry')
        },
        function (response) {
          $scope.modelState = response.data.ModelState;
        }
      )
    }
  });
