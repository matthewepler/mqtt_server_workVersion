export const getCurrTimeString = () => {
  const date = new Date(Date.now())
  const hourMinuteSecond = date.toTimeString().split(' ')[0]
  const ms = Number(date.getMilliseconds())
  return `${hourMinuteSecond}:${ms}`
}

export const names = {
  '669c15c8': 'Samantha',
  '669c4d7e': 'David',
  '669c4f16': 'Jose',
  '669c49ce': 'Carlota',
  '669c16bd': 'Mohammad',
  '669c50f5': 'Phillipe',
  '669c5636': 'Rodrigo',
  '669c4f3c': 'Thomas'
}
