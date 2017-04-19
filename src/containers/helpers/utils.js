export const getCurrTimeString = () => {
  const date = new Date(Date.now())
  const hourMinuteSecond = date.toTimeString().split(' ')[0]
  const ms = Number(date.getMilliseconds())
  return `${hourMinuteSecond}:${ms}`
}

export const names = {
  '669c15c8': {
    name: 'Samantha',
    site: 'HCS'
  },
  '669c4d7e': {
    name: 'David',
    site: 'HCS'
  },
  '669c4f16': {
    name: 'Jose',
    site: 'HCS'
  },
  '669c49ce': {
    name: 'Carolota',
    site: 'HCS'
  },
  '669c16bd': {
    name: 'Mohammad',
    site: 'HCS'
  },
  '669c50f5': {
    name: 'Phillipe',
    site: 'HCS'
  },
  '669c5636': {
    name: 'Rodrigo',
    site: 'HCS'
  },
  '669c4f3c': {
    name: 'Thomas',
    site: 'HCS'
  }
}
