/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import { mobile } from '@/styles/mediaQuery'
import variables from '@/styles/variables'

let titleStyleString = ''

Array(6)
  .fill(null)
  .map((_, key) => {
    titleStyleString += `h${key + 1} {
    font-weight: normal;
    margin: 0
  }`
  })

export default css`
  ${titleStyleString};
  * {
    box-sizing: border-box;
    font-weight: 300;
  }
  \:root {
    font-family: 'noto sans TC';
    font-weight: 300;
    ${css`
      ${variables}
    `}
  }
  body {
    overflow-x: hidden;
    &.prevent-scroll {
      overflow-y: hidden;
    }
  }
  a {
    color: inherit;
    transition: color 0.25s ease;
    text-decoration: none;
  }
  button {
    border: none;
    appearance: none;
    cursor: pointer;
  }
  input {
    outline: none;
    border: 0;
  }
  main {
    margin-top: 90px;
    ${mobile} {
      margin-top: 20px;
    }
  }
  img {
    object-fit: cover;
  }
  [class*=' i-']:before,
  [class^='i-']:before {
    margin: 0;
  }
  /* fade image in after load */
  .lazyload,
  .lazyloading {
    opacity: 0;
  }
  .lazyloaded {
    opacity: 1;
    transition: opacity 300ms;
  }
`
