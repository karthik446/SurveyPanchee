'use strict';

describe('Controller: UserResetpasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('spwebApp'));

  var UserResetpasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserResetpasswordCtrl = $controller('UserResetpasswordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserResetpasswordCtrl.awesomeThings.length).toBe(3);
  });
});
