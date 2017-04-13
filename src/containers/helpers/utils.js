export const getCurrTimeString = () => {
  const date = new Date(Date.now())
  const hourMinuteSecond = date.toTimeString().split(' ')[0]
  const ms = date.getMilliseconds()
  return `${hourMinuteSecond}:${ms}`
}
