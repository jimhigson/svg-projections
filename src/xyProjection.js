'use strict'

var valueHolder = {};

module.exports = function (xProjection, yProjection) {

  return {
    space: function () {

      var xScaleAndTranslate = xProjection.space(valueHolder);
      var xScale = xScaleAndTranslate.scale;
      var xTranslate = xScaleAndTranslate.translate;

      var yScaleAndTranslate = yProjection.space(valueHolder);
      var yScale = yScaleAndTranslate.scale;
      var yTranslate = yScaleAndTranslate.translate;

      return `translate(${xTranslate}, ${yTranslate}) scale(${xScale}, ${yScale})`
    },

    pointTransformX: function(x){
      return `translate(${xProjection.point(x)})`
    },

    pointTransformXY: function(x, y){
      return `translate(${xProjection.point(x)}, ${yProjection.point(y)})`
    },

    x: xProjection,
    y: yProjection
  };
};

