import React from 'react'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/styles'
import Tooltip from '@material-ui/core/Tooltip'
import canvas2svg from 'canvas2svg'

const styles = theme => ({
  button: {
    margin: '0.25em',
    width: '3.4em',
  },
  icon: {
    fontSize: '2em',
  },
  tooltip: {
    fontSize: '16px',
    fontWeight: '300',
    textAlign: 'center',
  },
})

const SaveAsSvgButton = props => {
  const { classes, cy } = props

  const isNumber = obj => {
    return obj != null && typeof obj === typeof 1 && !isNaN(obj)
  }

  const bufferCanvasImage = (options, cy) => {
    //disable usePaths temporarily
    const usePaths = cy.renderer().usePaths
    cy.renderer().usePaths = () => {
      return false
    }
    // flush path cache
    cy.elements().forEach(function(ele) {
      ele._private.rscratch.pathCacheKey = null
      ele._private.rscratch.pathCache = null
    })

    const renderer = cy.renderer()
    const eles = cy.mutableElements()
    const bb = eles.boundingBox()
    const ctrRect = renderer.findContainerClientCoords()
    let width = options.full ? Math.ceil(bb.w) : ctrRect[2]
    let height = options.full ? Math.ceil(bb.h) : ctrRect[3]
    const specdMaxDims = isNumber(options.maxWidth) || isNumber(options.maxHeight)
    const pxRatio = renderer.getPixelRatio()
    let scale = 1

    if (options.scale !== undefined) {
      width *= options.scale
      height *= options.scale

      scale = options.scale
    } else if (specdMaxDims) {
      let maxScaleW = Infinity
      let maxScaleH = Infinity

      if (isNumber(options.maxWidth)) {
        maxScaleW = (scale * options.maxWidth) / width
      }

      if (isNumber(options.maxHeight)) {
        maxScaleH = (scale * options.maxHeight) / height
      }

      scale = Math.min(maxScaleW, maxScaleH)

      width *= scale
      height *= scale
    }

    if (!specdMaxDims) {
      width *= pxRatio
      height *= pxRatio
      scale *= pxRatio
    }

    let buffCxt = null
    const buffCanvas = (buffCxt = new C2S(width, height))

    // Rasterize the layers, but only if container has nonzero size
    if (width > 0 && height > 0) {
      buffCxt.clearRect(0, 0, width, height)

      // fill background
      if (options.bg) {
        buffCxt.globalCompositeOperation = 'destination-over'

        buffCxt.fillStyle = options.bg
        buffCxt.fillRect(0, 0, width, height)
      }

      buffCxt.globalCompositeOperation = 'source-over'

      const zsortedEles = renderer.getCachedZSortedEles()

      if (options.full) {
        // draw the full bounds of the graph
        buffCxt.translate(-bb.x1 * scale, -bb.y1 * scale)
        buffCxt.scale(scale, scale)

        renderer.drawElements(buffCxt, zsortedEles)

        buffCxt.scale(1 / scale, 1 / scale)
        buffCxt.translate(bb.x1 * scale, bb.y1 * scale)
      } else {
        // draw the current view
        const pan = cy.pan()

        const translation = {
          x: pan.x * scale,
          y: pan.y * scale,
        }

        scale *= cy.zoom()

        buffCxt.translate(translation.x, translation.y)
        buffCxt.scale(scale, scale)

        renderer.drawElements(buffCxt, zsortedEles)

        buffCxt.scale(1 / scale, 1 / scale)
        buffCxt.translate(-translation.x, -translation.y)
      }
    }

    // restore usePaths to default value
    cy.renderer().usePaths = usePaths
    return getSerializedSvg(buffCanvas)
  }

  const getSerializedSvg = (canvas, fixNamedEntities) => {
    let serialized = new XMLSerializer().serializeToString(canvas.__root),
      keys,
      i,
      key,
      value,
      regexp,
      xmlns

    //IE search for a duplicate xmnls because they didn't implement setAttributeNS correctly
    xmlns = /xmlns="http:\/\/www\.w3\.org\/2000\/svg".+xmlns="http:\/\/www\.w3\.org\/2000\/svg/gi
    if (xmlns.test(serialized)) {
      serialized = serialized.replace('xmlns="http://www.w3.org/2000/svg', 'xmlns:xlink="http://www.w3.org/1999/xlink')
    }
    if (fixNamedEntities) {
      keys = Object.keys(namedEntities)
      //loop over each named entity and replace with the proper equivalent.
      for (i = 0; i < keys.length; i++) {
        key = keys[i]
        value = namedEntities[key]
        regexp = new RegExp(key, 'gi')
        if (regexp.test(serialized)) {
          serialized = serialized.replace(regexp, value)
        }
      }
    }
    return serialized
  }

  const downloadTxtFile = svg => {
    const element = document.createElement('a')
    const file = new Blob([svg], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = 'network.svg'
    document.body.appendChild(element)
    element.click()
  }

  const handleExportSvg = () => {
    const svg = bufferCanvasImage({ bg: 'rgb(51, 51, 51)' }, cy)
    downloadTxtFile(svg)
  }

  return (
    <Tooltip title={<div className={classes.tooltip}>Export as SVG</div>}>
      <Button size="small" color="default" variant="outlined" className={classes.button} onClick={handleExportSvg}>
        <PhotoSizeSelectActualIcon className={classes.icon} />
      </Button>
    </Tooltip>
  )
}

export default withStyles(styles)(SaveAsSvgButton)
