'use strict';

describe('Directive: serverModelError', function () {

  // load the directive's module
  beforeEach(module('spwebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<server-model-error></server-model-error>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the serverModelError directive');
  }));
});
