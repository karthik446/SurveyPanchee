'use strict';

describe('Service: userSvc', function () {

  // load the service's module
  beforeEach(module('spwebApp'));

  // instantiate service
  var userSvc;
  beforeEach(inject(function (_userSvc_) {
    userSvc = _userSvc_;
  }));

  it('should do something', function () {
    expect(!!userSvc).toBe(true);
  });

});
