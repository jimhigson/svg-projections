
const xyProjectionFactory = require('./src/xyProjectionFactory.js')
const xyProjector = require('./src/xyProjector.js')

module.exports = function(scales, selection, projectionRequirements) {
    const xyProjection = xyProjectionFactory(scales, projectionRequirements)
    return {
        projection: xyProjection,
        updateSpace: xyProjector(xyProjection, selection),
        x: xyProjection.x.point,
        y: xyProjection.y.point
    }
}

