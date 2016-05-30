'use strict';

describe('Controller: SurveySurveysCtrl', function () {

  // load the controller's module
  beforeEach(module('spwebApp'));

  var SurveySurveysCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SurveySurveysCtrl = $controller('SurveySurveysCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SurveySurveysCtrl.awesomeThings.length).toBe(3);
  });
});
