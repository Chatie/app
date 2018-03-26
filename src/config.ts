import { log } from 'brolog'

log.level('silly')

const pkg = require('../package.json')
export const VERSION: string = pkg.version

export {
  log,
}
