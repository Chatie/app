import { Injectable }       from '@angular/core'
// import { Http }            from '@angular/http'
import                            'rxjs/add/operator/map'

import Auth0Lock            from 'auth0-lock'
import { tokenNotExpired }  from 'angular2-jwt'

import { Brolog }           from 'brolog'

@Injectable()
export class Auth {

  // Configure Auth0
  lock = new Auth0Lock(
    'kW2jmKVAO6xMY9H4fYPUtFJSSRJbe3sz',
    'zixia.auth0.com',
  )

  constructor(
    public log:   Brolog,
  ) {
    this.log.verbose('Auth', 'constructor()')

  }


  public login(): Promise<any> {
    this.log.verbose('Auth', 'login()')

    return new Promise((resolve, reject) => {
      // Add callback for lock `authenticated` event
      this.lock.on('authenticated', (authResult) => {
        this.log.verbose('Auth', 'login() on(authenticated)')
        localStorage.setItem('id_token', authResult.idToken)
        resolve(authResult)
      })

      this.lock.on('unrecoverable_error', error => {
        this.log.verbose('Auth', 'login() on(unrecoverable_error)')
        reject(error)
      })

      this.lock.on('authorization_error', error => {
        this.log.verbose('Auth', 'login() on(authorization_error)')
        reject(error)
      })

      // Call the show method to display the widget.
      this.lock.show()
    })
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired()
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token')
  };

}
