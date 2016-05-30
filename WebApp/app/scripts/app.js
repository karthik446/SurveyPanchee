'use strict';
/// <reference path="/jquery.d.ts" />
/**
 * @ngdoc overview
 * @name spwebApp
 * @description
 * # spwebApp
 *
 * Main module of the application.
 */
angular
  .module('spwebApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        access: { allowAnonymous: false }
      })
      .when('/register', {
        templateUrl: 'views/user/register.html',
        controller: 'UserRegisterCtrl',
        controllerAs: 'user/register',
        access: { allowAnonymous: true, allowLoginUser: false }
      })
      .when('/login', {
        templateUrl: 'views/user/login.html',
        controller: 'UserLoginCtrl',
        controllerAs: 'user/login',
        access: { allowAnonymous: true, allowLoginUser: false }
      })
      .when('/confirmEmail', {
        templateUrl: 'views/user/confirmemail.html',
        controller: 'UserConfirmemailCtrl',
        controllerAs: 'user/confirmEmail',
        access: { allowAnonymous: true, allowLoginUser: false }
      })
      .when('/resendConformation', {
        templateUrl: 'views/user/resendconformation.html',
        access: { allowAnonymous: true, allowLoginUser: false }
      })
      .when('/forgotpassword', {
        templateUrl: 'views/user/forgotpassword.html',
        controller: 'UserForgotpasswordCtrl',
        controllerAs: 'user/forgotPassword',
        access: { allowAnonymous: true, allowLoginUser: false }
      })
      .when('/resetpassword', {
        templateUrl: 'views/user/resetpassword.html',
        controller: 'UserResetpasswordCtrl',
        controllerAs: 'user/resetpassword',
        access: { allowAnonymous: true, allowLoginUser: false }
      })
      .when('/changepassword', {
        templateUrl: 'views/user/changepassword.html',
        controller: 'UserChangepasswordCtrl',
        controllerAs: 'user/changepassword',
        access: { allowAnonymous: false }
      })
      .when('/survey/new-survey', {
        templateUrl: 'views/survey/new-survey.html',
        controller: 'SurveyNewSurveyCtrl',
        controllerAs: 'surve/newSurvey',
        access:{ allowAnonymous: false}
      })
      .when('/survey/surveys', {
        templateUrl: 'views/survey/surveys.html',
        controller: 'SurveySurveysCtrl',
        controllerAs: 'survey/surveys',
        access:{allowAnonymous: false}
      })
      .otherwise({
        redirectTo: '/'
      });
    $httpProvider.interceptors.push('httpRequestInterceptor');
  });
