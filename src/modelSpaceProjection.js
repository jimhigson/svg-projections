'use strict'

var extent = require('number-pairs').pairExtent;

module.exports = function(axis, scalingFactor, decimalPlaces) {

  var SPACE_DECIMAL_PLACES = 6;

  return {
    space: function(results) {

      var range = axis.range();
      var domain = axis.domain();

      var scale = extent(range) / (extent(domain) * scalingFactor);
      results.scale = scale.toFixed(SPACE_DECIMAL_PLACES);
      results.translate = (-(scale * (domain[0] * scalingFactor)) + range[0]).toFixed(SPACE_DECIMAL_PLACES);

      return results;
    },
    point: function (d) {
      return (d * scalingFactor).toFixed(decimalPlaces);
    },
    replot: false,

    describe: function() {
      return 'modelSpace(x' + scalingFactor + ', ' + decimalPlaces + 'dp)';
    }
  };
};

