'use strict'

module.exports = function(scale) {

  var IDENTITY_TRANSFORM = {
    translate:0,
    scale:1
  };

  return {
    space: function( results ) {
      return IDENTITY_TRANSFORM;
    },
    point: function (d) {
      // We are giving results pixels here. Staying accurate to one tenth of a pixel
      // allows for anti-aliasing and scaling while keeping the numbers manageable
      return scale(d).toFixed(1);
    },
    replot: true,

    describe: function() {
      return 'screen';
    }
  };
};

