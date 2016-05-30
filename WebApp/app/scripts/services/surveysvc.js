'use strict';

angular.module('spwebApp')
  .service('surveySvc', function ($http, $interval, $q) {
    var BASE_URL = 'http://localhost:56112/';
    //find out a better way to deal with C# enums on AngularJs
    this.surveyQuestionTypes = [{ name: 'singleSelection', value: 1 }, { name: 'multipleSelection', value: 2 }, { name: 'rating', value: 3 }];

    this.createSry = function (sry) {
      var url = BASE_URL + 'api/Surveys';
      var Survey = {}
      Survey.SurveyName = sry.surveyName;
      Survey.SurveyQuestions = [];
      sry.surveyQuestions.forEach(function (qt) {
        var SurveyQuestion = {};
        SurveyQuestion.SurveyQuestionText = qt.surveyQuestionText;
        SurveyQuestion.QuestionTypeId = qt.surveyQuestionType;
        SurveyQuestion.SurveyOptions = [];
        qt.surveyOptions.forEach(function (op) {
          var SurveyOption = {}
          SurveyOption.SurveyOptionText = op.optionText;
          if (op.optionText != '')
            SurveyQuestion.SurveyOptions.push(SurveyOption)
        }, this);
        Survey.SurveyQuestions.push(SurveyQuestion);
      }, this);
      var promise = $http.post(url, Survey).then(
        function success(response) {
          return response;
        },
        function failure(response) {
          return $q.reject(response);
        }
      )
      return promise
    }

    this.getSurveys = function () {
      var url = BASE_URL + '/api/Surveys';
      var promise = $http.get(url).then(function success(response) {
        return response.data;
      },
      function error(response){
        return $q.reject(response);
      });
      return promise;
    }
  });
