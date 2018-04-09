import { log } from 'brolog'
// log.level('verbose')

const pkg = require('../package.json')
export const VERSION: string = pkg.version

export {
  log,
}
