'use strict';

describe('Service: surveySvc', function () {

  // load the service's module
  beforeEach(module('spwebApp'));

  // instantiate service
  var surveySvc;
  beforeEach(inject(function (_surveySvc_) {
    surveySvc = _surveySvc_;
  }));

  it('should do something', function () {
    expect(!!surveySvc).toBe(true);
  });

});
