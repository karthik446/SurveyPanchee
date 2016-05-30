'use strict';

describe('Controller: UserForgotpasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('spwebApp'));

  var UserForgotpasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserForgotpasswordCtrl = $controller('UserForgotpasswordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserForgotpasswordCtrl.awesomeThings.length).toBe(3);
  });
});
