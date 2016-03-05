'use strict';

var eventIsDispatchedToComponent = require('../../utils/eventIsDispatchedToComponent.js');

describe('xy projector', function() {

  it('transforms accord to the projection on panning', function() {
    this.givenAProjector();

    var testTransform = 'scale(2.5) translate(50, 75)';

    this.givenProjectionProvidesTransform(testTransform);
    this.whenTheChartPans();

    expect(this.selection).toBeScaledBy(2.5);
    expect(this.selection).toBeTranslatedBy({x:50, y:75});
  });

  it('adds data attributes to describe the transform', function() {

    this.xyProjection.x.describe.returns('test_projection_x');
    this.xyProjection.y.describe.returns('test_projection_y');

    this.givenAProjector();

    this.eventBus.whenTheChartPans();

    expect(this.selection).toHaveAttributeValues('data-x-projection', ['test_projection_x']);
    expect(this.selection).toHaveAttributeValues('data-y-projection', ['test_projection_y']);
  });

  beforeEach(function(){
    this.eventBus = require('../../utils/eventEmitterStub.js')();
    this.xyProjection = require('../../utils/xyProjectionStub.js')();
    this.selection = require('d3').select('body').append('svg').append('g');

    this.givenAProjector = function() {
      var projector = require('../../../src/js/project/xyProjector.js')
        (this.eventBus, this.xyProjection, this.selection);

      this.whenTheChartPans = eventIsDispatchedToComponent(this.eventBus, projector, 'panOrZoom');
    };

    this.givenProjectionProvidesTransform = function (transform) {
      this.xyProjection.space.returns(transform);
    };

    jasmine.addMatchers(require('../../utils/domMatchers.js'));
  });
});
