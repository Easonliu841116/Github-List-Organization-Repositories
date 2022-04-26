/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import Color from 'color'

export function darken(colorString = '#fff', level = 0) {
  return Color(colorString).darken(level).hex()
}

export function lighten(colorString = '#fff', level = 0) {
  return Color(colorString).lighten(level).hex()
}

export function absoluteCenter({
  top = '50%',
  left = '50%',
  translateX = '-50%',
  translateY = '-50%'
}) {
  return css`
    position: absolute;
    top: ${top};
    left: ${left};
    transform: translate(${translateX}, ${translateY});
  `
}

export function lineclamp(layer = 3, multiplier = 1.5) {
  const maxHeight = layer * multiplier
  if (layer < 2) {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `
  }
  return css`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${layer};
    -webkit-box-orient: vertical;
    max-height: ${maxHeight}em;
  `
}
