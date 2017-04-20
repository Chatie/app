import {
  Injectable,
  NgZone,
}                   from '@angular/core'
import { Storage }  from '@ionic/storage'
// import { Http }    from '@angular/http'

import {
  AuthHttp,
  JwtHelper,
  tokenNotExpired,
}                   from 'angular2-jwt'
import Auth0        from 'auth0-js'
import Auth0Lock    from 'auth0-lock'

import { Brolog }   from 'brolog'
import {
  // BehaviorSubject,
  Observable,
  Subscription,
}                   from 'rxjs'
import              'rxjs/add/operator/map'

export type User = {
  id:       string,
  name:     string,
  email:    string,
  profile:  object,
}

const STORAGE_KEY = {
  ACCESS_TOKEN:   'access_token',
  ID_TOKEN:       'id_token',
  PROFILE:        'profile',
  REFRESH_TOKEN:  'refresh_token',
}

/**
 * Auth0 API Configuration
 */
const AUTH0 = {
  CLIENT_ID:  'kW2jmKVAO6xMY9H4fYPUtFJSSRJbe3sz',
  DOMAIN:     'zixia.auth0.com',
}

@Injectable()
export class Auth {
  user: Object | null

  jwtHelper = new JwtHelper()
  storage   = new Storage()

  refreshSubscription: Subscription
  accessToken:  string
  idToken:      string | null

  // Configure Auth0
  auth0WebAuth = new Auth0.WebAuth({
    clientID: AUTH0.CLIENT_ID,
    domain:   AUTH0.DOMAIN,
  })

  auth0Lock = new Auth0Lock(
    AUTH0.CLIENT_ID,
    AUTH0.DOMAIN,
    {
      allowSignUp: false,
      initialScreen: 'login',
      usernameStyle: 'email',
      socialButtonStyle: 'big',
      autofocus: true,
      auth: {
        redirect: false,
      },
      theme: {
        logo: 'https://avatars2.githubusercontent.com/u/25162437?v=3&s=200',
        primaryColor: '#ec4889',
      },
    },
  )

  constructor(
    public authHttp:  AuthHttp,
    public log:       Brolog,
    public ngZone:    NgZone,
  ) {
    this.log.verbose('Auth', 'constructor()')

    this.init()
  }

  private async init(): Promise<void> {
    this.log.verbose('Auth', 'init()')

    try {
      this.idToken  = await this.storage.get(STORAGE_KEY.ID_TOKEN)
      const profile = await this.storage.get(STORAGE_KEY.PROFILE)
      // this.user = JSON.parse(profile)
      this.user = profile
    } catch (e) {
      console.log(e)
    }

    this.auth0Lock.on('authenticated', authResult => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.storage.set(STORAGE_KEY.ACCESS_TOKEN,  authResult.accessToken)
        this.storage.set(STORAGE_KEY.ID_TOKEN,      authResult.idToken)
        this.storage.set(STORAGE_KEY.REFRESH_TOKEN, authResult.refreshToken)

        this.accessToken  = authResult.accessToken
        this.idToken      = authResult.idToken

        // Fetch profile information
        this.auth0Lock.getUserInfo(this.accessToken, (error, profile) => {
          if (error) {
            // Handle error
            alert(error)
            return
          }

          profile.user_metadata = profile.user_metadata || {}
          // this.storage.set('profile', JSON.stringify(profile))
          this.storage.set('profile', profile)
          this.user = profile
        })

        this.auth0Lock.hide()

        this.ngZone.run(() => this.user = authResult.profile)
        // // Schedule a token refresh
        this.scheduleRefresh();
      }

    })
  }

    /*
    https://github.com/auth0/lock/issues/541

        authenticated$ = Observable
        .fromEvent(this.authService.authLock, 'authenticated')
        .do((authResult: any) => {
            localStorage.setItem('id_token', authResult.idToken);
        })
        .map(()=>new auth.LoginSuccessAction({}));

getProfile(idToken: string): Observable<any>{
        return new Observable(observer => {
            this.lock.getProfile(idToken, (err, profile) => {
            if (err) {
                observer.error(err);
            }
            else {
                console.log(profile);
                observer.next(profile);
                observer.complete();
            }
            });
        });
    }
    */

  public async login(): Promise<boolean> {
    this.log.verbose('Auth', 'login()')

    return new Promise<boolean>((resolve, reject) => {
      // Add callback for lock `authenticated` event
      this.auth0Lock.on('authenticated', (authResult) => {
        this.log.verbose('Auth', 'login() on(authenticated)')

        this.auth0Lock.getUserInfo(authResult.accessToken, async (error, profile) => {
          if (error) {
            // Handle error
            return reject(error)
          }

          await this.storage.ready()

          this.storage.set(STORAGE_KEY.ACCESS_TOKEN,  authResult.accessToken)
          this.storage.set(STORAGE_KEY.ID_TOKEN,      authResult.idToken)
          this.storage.set(STORAGE_KEY.REFRESH_TOKEN, authResult.refreshToken)

          // this.storage.set(STORAGE_KEY.PROFILE,       JSON.stringify(profile))
          this.storage.set(STORAGE_KEY.PROFILE,       profile)

          this.accessToken  = authResult.accessToken
          this.idToken      = authResult.idToken
          this.user         = profile

          /**
           * Resolve
           */
          return resolve(true)
        })
      })

      this.auth0Lock.on('unrecoverable_error', error => {
        this.log.verbose('Auth', 'login() on(unrecoverable_error)')
        return resolve(false)
      })

      this.auth0Lock.on('authorization_error', error => {
        this.log.verbose('Auth', 'login() on(authorization_error)')
        return resolve(false)
      })

      // Call the show method to display the widget.
      this.auth0Lock.show()
    })
  }

  public authenticated(): boolean {
    this.log.verbose('Auth', 'authenticated()')

    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    // return tokenNotExpired()
    if (!this.idToken) {
      return false
    }
    return tokenNotExpired(STORAGE_KEY.ID_TOKEN, this.idToken)
  }

  public logout(): void {
    this.log.error('Auth', 'logout()')

    // Remove token from localStorage
    this.storage.remove(STORAGE_KEY.ACCESS_TOKEN)
    this.storage.remove(STORAGE_KEY.ID_TOKEN)
    this.storage.remove(STORAGE_KEY.REFRESH_TOKEN)

    this.storage.remove(STORAGE_KEY.PROFILE)

    this.idToken = null
    this.ngZone.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh()
  }

  public scheduleRefresh() {
    this.log.verbose('Auth', 'scheduleRefresh()')

    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token

    if (!this.idToken) {
      this.log.error('Auth', 'scheduleRefresh() error: no this.idToken')
      return
    }
    let source = Observable.of(this.idToken).flatMap(token => {
      this.log.verbose('Auth', 'scheduleRefresh() for token:%s', token)

      if (!token) {
        const e = new Error('scheduleRefresh() failed to get token')
        this.log.error('Auth', e.message)
        throw e
      }

      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time
      let jwtIat = this.jwtHelper.decodeToken(token).iat
      let jwtExp = this.jwtHelper.decodeToken(token).exp
      let iat = new Date(0)
      let exp = new Date(0)

      let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

      return Observable.interval(delay)
    })

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    })
  }

  public startupTokenRefresh() {
    this.log.verbose('Auth', 'startupTokenRefresh()')

    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = this.authHttp.tokenStream.flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf()
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp
          let exp: Date = new Date(0)
          exp.setUTCSeconds(jwtExp)
          let delay: number = exp.valueOf() - now

          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay)
        })

        // Once the delay time from above is
        // reached, get a new JWT and schedule
        // additional refreshes
        source.subscribe(() => {
          this.getNewJwt()
          this.scheduleRefresh()
        })
    }
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe()
    }
  }

  public async getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    try {
      this.auth0WebAuth.renewAuth({
        // ???
        // https://github.com/auth0/auth0.js/blob/master/example/index.html
        // https://auth0.com/docs/libraries/auth0js/v8#using-renewauth-to-acquire-new-tokens
        // https://auth0.com/forum/t/remember-me-in-authservice-using-auth0-js-v8/5037
        //
        // audience: 'https://example.com/api/v2',
        // scope: 'read:something write:otherthing',

        // Hosted Login Page: https://auth0.com/docs/hosted-pages/login
        redirectUri: 'https://zixia.auth0.com/login?client=g6P417oEmHON1BuPdsV9foNgP4h98dmh',
        usePostMessage: true,
      }, (err, authResult) => {
        if (err) {
          this.log.error('Auth', 'getNewJwt() WebAuth.renewAuth() error: %s', err)
          return
        }
        this.storage.set(STORAGE_KEY.ACCESS_TOKEN,  authResult.accessToken)
        this.storage.set(STORAGE_KEY.ID_TOKEN,      authResult.idToken)
        this.storage.set(STORAGE_KEY.REFRESH_TOKEN, authResult.refreshToken)

        this.accessToken  = authResult.accessToken
        this.idToken      = authResult.idToken
      })
    } catch (e) {
      this.log.error('Auth', 'getNewJwt() error: %s', e.message)
    }
  }

}
