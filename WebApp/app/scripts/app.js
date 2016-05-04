'use strict';

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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/register', {
        templateUrl: 'views/user/register.html',
        controller: 'UserRegisterCtrl',
        controllerAs: 'user/register'
      })
      .when('/login', {
        templateUrl: 'views/user/login.html',
        controller: 'UserLoginCtrl',
        controllerAs: 'user/login'
      })
      .when('/confirmEmail', {
        templateUrl: 'views/user/confirmemail.html',
        controller: 'UserConfirmemailCtrl',
        controllerAs: 'user/confirmEmail'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
