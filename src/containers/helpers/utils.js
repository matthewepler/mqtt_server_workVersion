export const getCurrTimeString = () => {
  const date = new Date(Date.now())
  const hourMinuteSecond = date.toTimeString().split(' ')[0]
  // const ms = Number(date.getMilliseconds()).toPrecision(3)
  // return `${hourMinuteSecond}:${ms}`
  return `${hourMinuteSecond}`
}

