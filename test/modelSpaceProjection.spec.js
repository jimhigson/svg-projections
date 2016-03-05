
var modelSpaceProjection = require('../../../src/js/project/modelSpaceProjection.js');
var d3 = require('d3');

describe('model space projection', function(){

  it('can produce an equivalent transform to a d3 identity scale', function() {

    var p = modelSpaceProjection(
      d3.scale.linear().domain([0, 10]).range([0, 10]),
      1
    );

    expect(p.space({})).toRecursivelyContain({scale:1, translate:0});
  });

  it('can produce an equivalent transform to a d3 100x scale', function() {

    var p = modelSpaceProjection(
      d3.scale.linear().domain([0, 1]).range([0, 100]),
      1
    );

    expect(p.space({})).toRecursivelyContain({scale:100, translate:0});
  });

  it('can produce a translation without scaling', function() {

    var p = modelSpaceProjection(
      d3.scale.linear().domain([0, 10]).range([5, 15]),
      1
    );

    expect(p.space({})).toRecursivelyContain({scale:1, translate:5});
  });

  it('can produce a translation and scaling transform', function() {

    var p = modelSpaceProjection(
      d3.scale.linear().domain([0, 50]).range([25, 125]),
      1
    );

    expect(p.space({})).toRecursivelyContain({scale:2, translate:25});
  });

  beforeEach(function(){
    // for the sake of our comparisons, '100.0' is the same as 100
    // so compare using double equals
    jasmine.addCustomEqualityTester(function allowStringsOrNumbers(a, b) {
      return a == b;
    });
    jasmine.addMatchers(require('../../utils/matchers.js'));
  });
});
