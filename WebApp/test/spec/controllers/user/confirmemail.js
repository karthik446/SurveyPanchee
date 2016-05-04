'use strict';

describe('Controller: UserConfirmemailCtrl', function () {

  // load the controller's module
  beforeEach(module('spwebApp'));

  var UserConfirmemailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserConfirmemailCtrl = $controller('UserConfirmemailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserConfirmemailCtrl.awesomeThings.length).toBe(3);
  });
});
