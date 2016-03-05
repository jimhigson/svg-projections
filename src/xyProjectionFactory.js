'use strict'

var xyProjection = require('./xyProjection.js');
var modelSpaceProjection = require('./modelSpaceProjection.js');
var screenSpaceProjection = require('./screenSpaceProjection.js');
var slipProjection = require('./slipProjection.js');
var scalingFactors = require('./scalingFactors.js');
var browser = require('detect-browser');

/**
 * @param {Boolean} requirements.needsStroke
 * @param {Boolean} requirements.preserveAspect
 */
module.exports = function(scales, requirements) {

  var browserHasNonScalingStroke = (browser.name != 'ie');

  if( requirements.preserveAspect ||
      (requirements.needsStroke && !browserHasNonScalingStroke) ) {

    return xyProjection(
      slipProjection(scales.x),
      screenSpaceProjection(scales.y)
    );
  } else {

    return xyProjection(
      modelSpaceProjection(scales.x, scalingFactors.scale.x, scalingFactors.decimalPlaces.x),
      modelSpaceProjection(scales.y, scalingFactors.scale.y, scalingFactors.decimalPlaces.y)
    );
  }
};
