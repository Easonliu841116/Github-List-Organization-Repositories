const mq = (bp) => `@media (max-width: ${bp}px)`

export const desktop = mq(1279)
export const pad = mq(1023)
export const mobile = mq(767)
export const mini = mq(320)
export const anyHover = '@media (any-hover: hover)'

export default {
  desktop,
  pad,
  mobile,
  mini,
  anyHover
}
