'use strict';

module.exports = function(xyProjection, selection) {

  selection.attr({
    'data-x-projection': xyProjection.x.describe(),
    'data-y-projection': xyProjection.y.describe()
  });

  return function updateFrame() {
    selection.attr('transform', xyProjection.space());
  }
};
