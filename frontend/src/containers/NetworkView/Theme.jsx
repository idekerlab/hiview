/**
 * Custom theme for this viewer
 *
 */

import {
  cyan700,
  pinkA100, pinkA200, pinkA400,
  fullWhite,
} from 'material-ui/styles/colors'

import { fade } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

export default {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: cyan700,
    primary2Color: cyan700,
    primary3Color: fullWhite,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
  appBar: {
    textColor: 'white',
    actionColor: '#555555'
  },
  snackbar: {
    textColor: 'white',
    actionColor: '#555555'
  }
}
