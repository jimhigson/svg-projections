
What is it?
-----------
An SVG projection means moving elements by adjusting the containing element's transform,
rather than updating each item's coordianates as the space is scrolled and panned.

In practice, for many visualisations this is orders of magnitude faster because much
fewer DOM changes are required for common use cases such as scrolling.

For d3 projects.

```js
const svgProjection = require('svg-projections')

let x = d3.scales.linear()
let y = d3.scales.time()

let area = d3.select('#something')

/**
* needsStroke
* -----------
*
* Set to true if the area being projected needs to maintain proportionality of the thickness of
* stroke. In browsers that support svg non-scaling-stroke property the performance will be better
* than those which do not. For browsers that do not, a slower callback is used.
*
* If using stroke inside a projection, it is assumed that vector-effect:non-scaling-stroke
* is in your svg css
*
* preserveAspect
* --------------
*
* Set to true if the aspect of the area being projected needs to be preseved. For example,
* if you are using <circle> elements and would like them to stay circular. For general paths
* this is not required.
*/

let projection = svgProjection({x, y}, d3.select('#something'), {needsStroke: false, preserveAspect:false})

area.selectAll('.dataPoint')
    .data(myData)
    .enter()
    .append('path')

    // when positioning elements, now use projection.x and projection.y
    // instead of x and y directly
    .attr('x1', d => projection.x(d.value1) )
    .attr('x2', d => projection.x(d.value2) )
    .attr('y1', d => projection.y(d.time1) )
    .attr('y2', d => projection.y(d.time2) )

// whenever scales change, update the transform on the container:
projection.updateSpace()

```