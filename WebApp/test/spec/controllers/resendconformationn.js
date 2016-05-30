'use strict';

describe('Controller: ResendconformationnCtrl', function () {

  // load the controller's module
  beforeEach(module('spwebApp'));

  var ResendconformationnCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResendconformationnCtrl = $controller('ResendconformationnCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResendconformationnCtrl.awesomeThings.length).toBe(3);
  });
});
