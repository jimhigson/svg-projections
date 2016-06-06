
const xyProjectionFactory = require('./src/xyProjectionFactory.js')
const xyProjector = require('./src/xyProjector.js')

/**
 * 
 * @param {Object} scales
 * @param {d3.scale} scales.x
 * @param {d3.scale} scales.y
 * 
 * @param {d3.selection} selection
 * 
 * @param {Boolean} projectionRequirements.needsStroke
 * @param {Boolean} projectionRequirements.preserveAspect
 *
 * @returns {{
 *      projection,
 *      updateSpace,
 *      x: point,
 *      y: point
 * }}
 */
module.exports = function(scales, selection, projectionRequirements) {
    const xyProjection = xyProjectionFactory(scales, projectionRequirements)
    return {
        projection: xyProjection,
        updateSpace: xyProjector(xyProjection, selection),
        x: xyProjection.x.point,
        y: xyProjection.y.point
    }
}

