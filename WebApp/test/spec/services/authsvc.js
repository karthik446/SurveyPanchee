'use strict';

describe('Service: authSvc', function () {

  // load the service's module
  beforeEach(module('spwebApp'));

  // instantiate service
  var authSvc;
  beforeEach(inject(function (_authSvc_) {
    authSvc = _authSvc_;
  }));

  it('should do something', function () {
    expect(!!authSvc).toBe(true);
  });

});
