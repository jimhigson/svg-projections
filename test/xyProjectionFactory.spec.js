var proxyquire = require('proxyquire');
var sinon = require('sinon');
require('jasmine-sinon');

describe('xyProjection factory', function() {


  describe('in capable browsers', function() {

    beforeEach(makeBrowserDetectAsChrome);

    describe('when a stroke is needed', function(){
      beforeEach(function(){
        this.xyProjectionFactory(this.stubVisibleWindow, {needsStroke:true});
      });

      it('created two scaler projections', function() {
        expect(this.stubs['./modelSpaceProjection.js']).toHaveBeenCalledTwice();
      });

      it('created no screen space projections', function() {
        expect(this.stubs['./screenSpaceProjection.js']).not.toHaveBeenCalled();
      });

      it('passes the visible window\'s x and the x scale from the scalingFactors to the scaler projection', function() {
        expect(this.stubs['./modelSpaceProjection.js'])
          .toHaveBeenCalledWith(this.stubVisibleWindow.x, this.X_SCALE, this.X_DECIMAL_PLACES);
      });

      it('passes the visible window\'s y and the y scale from the scalingFactors to the scaler projection', function() {
        expect(this.stubs['./modelSpaceProjection.js'])
          .toHaveBeenCalledWith(this.stubVisibleWindow.y, this.Y_SCALE, this.Y_DECIMAL_PLACES);
      });
    });

    describe('when a stroke is not needed', function(){
      beforeEach(function(){
        this.xyProjectionFactory(this.stubVisibleWindow, {needsStroke:false});
      });

      it('created two scaler projections', function() {
        expect(this.stubs['./modelSpaceProjection.js']).toHaveBeenCalledTwice();
      });

      it('created no screen space projections', function() {
        expect(this.stubs['./screenSpaceProjection.js']).not.toHaveBeenCalled();
      });

      it('passes the visible window\'s x and the x scale from the scalingFactors to the scaler projection', function() {
        expect(this.stubs['./modelSpaceProjection.js'])
          .toHaveBeenCalledWith(this.stubVisibleWindow.x, this.X_SCALE, this.X_DECIMAL_PLACES);
      });

      it('passes the visible window\'s y and the y scale from the scalingFactors to the scaler projection', function() {
        expect(this.stubs['./modelSpaceProjection.js'])
          .toHaveBeenCalledWith(this.stubVisibleWindow.y, this.Y_SCALE, this.Y_DECIMAL_PLACES);
      });
    });
  });

  describe('in Internet Explorer', function() {

    beforeEach(makeBrowserDetectAsInternetExplorer);

    describe('when a stroke is needed', function(){
      beforeEach(function(){
        this.xyProjectionFactory(this.stubVisibleWindow, {needsStroke:true});
      });

      it('created two screen space projections', function() {
        expect(this.stubs['./screenSpaceProjection.js']).toHaveBeenCalledOnce();
        expect(this.stubs['./slipProjection.js']).toHaveBeenCalledOnce();
      });

      it('created no scaler projections', function() {
        expect(this.stubs['./modelSpaceProjection.js']).not.toHaveBeenCalled();
      });

      it('passes the visible window\'s x to the slip projection', function() {
        expect(this.stubs['./slipProjection.js'])
          .toHaveBeenCalledWith(this.stubVisibleWindow.x);
      });

      it('passes the visible window\'s y to the screen projection', function() {
        expect(this.stubs['./screenSpaceProjection.js'])
          .toHaveBeenCalledWith(this.stubVisibleWindow.y);
      });
    });

    describe('when a stroke is not needed', function(){
      beforeEach(function(){
        this.xyProjectionFactory(this.stubVisibleWindow, {needsStroke:false});
      });

      it('created two scaler projections', function() {
        expect(this.stubs['./modelSpaceProjection.js']).toHaveBeenCalledTwice();
      });

      it('created no screen space projections', function() {
        expect(this.stubs['./screenSpaceProjection.js']).not.toHaveBeenCalled();
      });

      it('passes the visible window\'s x and the x scale from the scalingFactors to the scaler projection', function() {
        expect(this.stubs['./modelSpaceProjection.js'])
          .toHaveBeenCalledWith(this.stubVisibleWindow.x, this.X_SCALE, this.X_DECIMAL_PLACES);
      });

      it('passes the visible window\'s y and the y scale from the scalingFactors to the scaler projection', function() {
        expect(this.stubs['./modelSpaceProjection.js'])
          .toHaveBeenCalledWith(this.stubVisibleWindow.y, this.Y_SCALE, this.Y_DECIMAL_PLACES);
      });
    });

  });

  beforeEach(function(){
    this.X_SCALE = 10;
    this.Y_SCALE = 20;

    this.X_DECIMAL_PLACES = 4;
    this.Y_DECIMAL_PLACES = 5;

    this.stubVisibleWindow = require('../../utils/visibleWindowStub')();
    this.stubs = {
      './xyProjection.js':          sinon.stub(),
      './modelSpaceProjection.js':  sinon.stub(),
      './screenSpaceProjection.js': sinon.stub(),
      './slipProjection.js':        sinon.stub(),
      'detect-browser':             {name:'', version:''},
      './scalingFactors.js':{
        scale:{
          x: this.X_SCALE,
          y: this.Y_SCALE
        },
        decimalPlaces:{
          x: this.X_DECIMAL_PLACES,
          y: this.Y_DECIMAL_PLACES
        }
      }
    };
    this.xyProjectionFactory = proxyquire('../../../src/js/project/xyProjectionFactory.js', this.stubs);
  });

});

function makeBrowserDetectAsChrome(){
  this.stubs['detect-browser'].name = 'chrome';
  this.stubs['detect-browser'].version = '41.0.1';
}

function makeBrowserDetectAsInternetExplorer(){
  this.stubs['detect-browser'].name = 'ie';
  this.stubs['detect-browser'].version = '11.0.0';
}
