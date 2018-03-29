export { log } from 'brolog'

const pkg = require('../package.json')
export const VERSION: string = pkg.version

/**
 * Auth0 API Configuration
 */
export const AUTH0_SETTINGS = {
  CLIENT_ID:  'kW2jmKVAO6xMY9H4fYPUtFJSSRJbe3sz',
  DOMAIN:     'zixia.auth0.com',
}
