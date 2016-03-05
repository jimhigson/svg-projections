'use strict'

/**
  * A projection that uses transforms to pan, but scaled in the space of the model
  */

var extent = require('number-pairs').pairExtent;

module.exports = function(scale) {

  // We are giving results in (offset) pixels here. Staying accurate to one tenth of a pixel
  // allows for anti-aliasing and scaling while keeping the numbers manageable

  var decimalPlaces = 1;

  return {
    space: function(results) {

      var range = scale.range();
      var domain = scale.domain();

      var coef = extent(range) / extent(domain);
      var domainStart = domain[0];

      results.scale = 1;
      results.translate = (-1 * coef * domainStart).toFixed(decimalPlaces);
      return results;
    },
    point: function (d) {

      var range = scale.range();
      var domain = scale.domain();

      var coef = extent(range) / extent(domain);

      return (coef * d + range[0]).toFixed(decimalPlaces);
    },
    replot: true, // more correctly, would be true only on zoom, not on pan

    describe: function() {
      return 'slip';
    }
  };
};
