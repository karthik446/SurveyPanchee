'use strict';

describe('Service: httpRequestInterceptor', function () {

  // load the service's module
  beforeEach(module('spwebApp'));

  // instantiate service
  var httpRequestInterceptor;
  beforeEach(inject(function (_httpRequestInterceptor_) {
    httpRequestInterceptor = _httpRequestInterceptor_;
  }));

  it('should do something', function () {
    expect(!!httpRequestInterceptor).toBe(true);
  });

});
