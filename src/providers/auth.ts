import {
  Injectable,
}                   from '@angular/core'
import { Storage }  from '@ionic/storage'

import {
  AuthHttp,
  JwtHelper,
}                   from 'angular2-jwt'
import {
  Auth0UserProfile,
  // Management,
  WebAuth,
}                   from 'auth0-js'
import Auth0Lock    from 'auth0-lock'

import { Brolog }   from 'brolog'
import {
  BehaviorSubject,
  Observable,
  Subscription,
}                   from 'rxjs/Rx'
import              'rxjs/add/operator/map'

const STORAGE_KEY = {
  ACCESS_TOKEN:   'access_token',
  ID_TOKEN:       'id_token',
  USER_PROFILE:   'user_profile',
  /**
   * OIDC-conformant refresh tokens: https://auth0.com/docs/api-auth/tutorials/adoption/refresh-tokens
   * Silent Authentication: https://auth0.com/docs/api-auth/tutorials/silent-authentication
   */
  REFRESH_TOKEN:  'refresh_token',
}

/**
 * Auth0 API Configuration
 */
const AUTH0 = {
  CLIENT_ID:  'kW2jmKVAO6xMY9H4fYPUtFJSSRJbe3sz',
  DOMAIN:     'zixia.auth0.com',
}

interface AuthSnapshot {
  profile: Auth0UserProfile | null
}

@Injectable()
export class Auth {
  public snapshot: AuthSnapshot

  private expireTimer: NodeJS.Timer | null

  /**
   * User Profile: https://auth0.com/docs/user-profile
   * Structure of the User Profile: https://auth0.com/docs/user-profile/user-profile-structure
   * Control the contents of an ID token: https://auth0.com/docs/tokens/id-token#control-the-contents-of-an-id-token
   * OpenID Connect Standard Claims: https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
   */
  public profile: BehaviorSubject<Auth0UserProfile | null>

  /**
   * Persisting user authentication with BehaviorSubject in Angular
   *  - https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243
   * BehaviorSubject.asObservable.toPromise() will not return the last value without next a new one! :(
   *  - https://github.com/ReactiveX/RxJS/issues/1478
   *  - https://github.com/Reactive-Extensions/RxJS/issues/1088
   */
  private _status = new BehaviorSubject<boolean>(false)
  public get status() {
    this.log.verbose('Auth', 'get status()')
    return this._status.asObservable() // .share()
  }

  private _valid = false
  public get valid() { // guard for readyonly
    this.log.silly('Auth', 'get valid() = %s', this._valid)
    return this._valid
  }

  private jwtHelper = new JwtHelper()
  private storage   = new Storage()

  private accessToken:  string | null = null
  private refreshToken: string | null = null
  private _idToken:     string | null = null
  private get idToken() {
    this.log.silly('Auth', 'get idToken() = %s', this._idToken && this._idToken.length)
    return this._idToken
  }
  private set idToken(newIdToken) {
    this.log.verbose('Auth', 'set idToken(%s)', newIdToken && newIdToken.length)
    this._idToken = newIdToken
    if (newIdToken) {
      this.scheduleExpire(newIdToken)
    } else {
      this.unscheduleExpire()
    }
  }

  private refreshSubscription: Subscription

  constructor(
    public authHttp:  AuthHttp,
    public log:       Brolog,
  ) {
    this.log.verbose('Auth', 'constructor()')

    this.init()
  }

  async init() {
    this.log.verbose('Auth', 'init()')

    this.snapshot = {} as any

    try {

      this.profile = new BehaviorSubject<Auth0UserProfile | null>(null)
      this.profile.subscribe(p => this.snapshot.profile = p)

      await this.load()

      if (this.idToken && this.snapshot.profile) {
        this.log.silly('Auth', 'init() from storage for user({email:%s})', this.snapshot.profile.email)
        this._status.next(true)
      } else {
        this.log.silly('Auth', 'init() idToken(length:%s) & profile(%s) not ready',
                                this.idToken && this.idToken.length,
                                this.snapshot.profile,
                      )
      }

    } catch (e) {
      this.log.error('Auth', 'init() exception: %s', e.message)
      return
    }

  }

  /**
   * Lock Configurable Options: https://auth0.com/docs/libraries/lock/v10/customization
   */
  private getAuth0Lock(): Auth0LockStatic {
    this.log.verbose('Auth', 'getAuth0Lock()')

    const options: Auth0LockConstructorOptions = {
      // oidcConformant: true,
      languageDictionary: {
        title: 'Chatie',
      },
      // Lock: Authentication Parameters
      // - https://auth0.com/docs/libraries/lock/v10/sending-authentication-parameters#supported-parameters
      auth: {
        params: {
          // scope: 'openid profile user_metadata app_metadata email offline_access ', // offline_access for refreshToken(?)
          scope: 'openid email profile offline_access', // offline_access for refreshToken(?)
        },
        redirect: false,  // must use popup for ionic2
        responseType: 'id_token token', // token for `accessToken`
      },
      allowSignUp:          false,
      allowForgotPassword:  false,
      allowedConnections: ['github'],
      initialScreen: 'login',
      // usernameStyle: 'email',
      socialButtonStyle: 'big',
      mustAcceptTerms:   true,
      rememberLastLogin: true,
      autofocus: true,
      autoclose: false,
      theme: {
        logo: 'https://avatars2.githubusercontent.com/u/25162437?v=3&s=200',
        primaryColor: '#32db64',
      },
    }

    const auth0Lock = new Auth0Lock(
      AUTH0.CLIENT_ID,
      AUTH0.DOMAIN,
      options,
    )

    // Rxjs.Observable.merge
    // Rxjs.Observable.fromEvent(auth0Lock, 'unrecoverable_error')
    // Rxjs.Observable.fromEvent(auth0Lock, 'authorization_error')
    auth0Lock.on('unrecoverable_error', error => {
      this.log.warn('Auth', 'login() on(unrecoverable_error) error:%s', error)
      this._status.error(error)
      auth0Lock.hide()
    })

    auth0Lock.on('authorization_error', error => {
      this.log.verbose('Auth', 'login() on(authorization_error)')
      this._status.error(error)
    })

    // Add callback for lock `authenticated` event
    // TODO: replace on with Observable.fromEvent().switchMap(getProfile)
    auth0Lock.on('authenticated', async (authResult) => {
      this.log.verbose('Auth', 'login() on(authenticated, authResult={%s})',
                                Object.keys(authResult).join(','),
                      )

      this.accessToken  = authResult.accessToken
      this.idToken      = authResult.idToken

      if (!this.idToken) {
        this.log.error('Auth', 'login() Auth0Lock.on(authenticated) no idToken')
        return
      }

      const profile = await this.getProfile()
      this.profile.next(profile)

      // auth0Lock.getProfile(this.idToken, (error, profile) => {
      //   if (error) {
      //     // Handle error
      //     this.log.warn('Auth', 'login() Auth0Lock.getProfile() error:%s', error)
      //     return
      //   }
      //   this.log.verbose('Auth', 'login() Auth0Lock.getProfile() profile:{email:%s,...}',
      //                             profile.email,
      //                   )
      // }) // Auth0Lock.getProfile

      await this.save()
      this.scheduleRefresh()
      auth0Lock.hide()
      this.log.verbose('Auth', 'getAuth0Lock() Auth0Lock.on(authenticated) _status.next(true)')
      this._status.next(true)
    })

    return auth0Lock
  }

  async getProfile(): Promise<Auth0UserProfile> {
    this.log.verbose('Auth', 'getProfile()')

    return new Promise<Auth0UserProfile>((resolve, reject) => {
      if (!this.idToken || !this.accessToken) {
        const e = new Error('no id/access token')
        this.log.error('Auth', 'getProfile() %s', e.message)
        return reject(e)
      }

      // const userId: string = this.jwtHelper.decodeToken(this.idToken).sub
      // this.getManagement().getUser(userId, (error, profile) => {
      // auth0Lock.getProfile(this.idToken, (error, profile) => {
      // auth0Lock.getUserInfo(this.accessToken, (error, profile) => {
      this.getWebAuth().client.userInfo(this.accessToken, (error, profile) => {
        this.log.verbose('Auth', 'getProfile() WebAuth.client.userInfo()')

        if (error) {
          const e = new Error(error.description)
          this.log.error('Auth', 'getProfile() WebAuth.client.userInfo() %s', e.message)
          return reject(e)
        }

        this.log.silly('Auth', 'getProfile() WebAuth.client.userInfo() got {email=%s,...}', profile.email)
        return resolve(profile)

      })
    })
  }

  getWebAuth() {
    this.log.verbose('Auth', 'getWebAuth()')

    return new WebAuth({
      clientID: AUTH0.CLIENT_ID,
      domain:   AUTH0.DOMAIN,
    })
  }

  /*
  getManagement() {
    this.log.verbose('Auth', 'getManagement')

    if (!this.accessToken) {
      throw new Error('no access token')
    }

    return new Management({
      domain: AUTH0.DOMAIN,
      token:  this.accessToken,
    })
  }
  */

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

  /**
   *
   */
  public login(): void {
    this.log.verbose('Auth', 'login()')

    const auth0Lock = this.getAuth0Lock()

    // Call the show method to display the widget.
    auth0Lock.show()
  }

  public logout(): void {
    this.log.verbose('Auth', 'logout()')

    // Unschedule the token refresh
    this.unscheduleRefresh()
    this.unscheduleExpire()
    this.remove()

    this.log.verbose('Auth', 'logout() _status.next(false)')
    this._status.next(false)
  }

  // public authenticated(): boolean {
  //   // Check if there's an unexpired JWT
  //   // It searches for an item in localStorage with key == 'id_token'
  //   // return tokenNotExpired()
  //   const valid = !!this.idToken && tokenNotExpired(STORAGE_KEY.ID_TOKEN, this.idToken)
  //   this.log.verbose('Auth', 'authenticated(): %s', valid)

  //   return valid
  // }

  private scheduleExpire(idToken: string|null): void {
    this.log.verbose('Auth', 'scheduleExpire()')

    if (this.expireTimer) {
      clearTimeout(this.expireTimer)
      this.log.silly('Auth', 'scheduleExpire() clearTimeout()')
      this.expireTimer = null
    }

    if (!idToken) {
      this.log.verbose('Auth', 'scheduleExpire() no idToken')
      this.log.verbose('Auth', 'scheduleExpire() _status.next(false)')
      this._status.next(false)
      return
    }

    try {
      const expire  = this.jwtHelper.getTokenExpirationDate(idToken)
      const now     = new Date()
      const timeout = expire.getTime() - now.getTime()

      this.expireTimer = setTimeout(() => {
        this.log.verbose('Auth', 'scheduleExpire() _status.next(false)')
        this._status.next(false)
      }, timeout)
      this.log.silly('Auth', 'scheduleExpire() setTimeout(,%s) = %s hours',
                              timeout,
                              Math.round(timeout / 3600) / 1000,
                    )
    } catch (e) {
      this.log.error('Auth', 'scheduleExpire() exception: %s', e.message)
    }
  }

  public scheduleRefresh() {
    this.log.verbose('Auth', 'scheduleRefresh()')

    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token

    if (!this.idToken) {
      this.log.error('Auth', 'scheduleRefresh() error: no this.idToken')
      return
    }
    const source = Observable.of(this.idToken).flatMap(token => {
      if (!token) {
        const e = new Error('scheduleRefresh() failed to get token')
        this.log.error('Auth', e.message)
        throw e
      }

      const decodedToken = this.jwtHelper.decodeToken(token)
      this.log.verbose('Auth', 'scheduleRefresh() for token {email:%s,...}', decodedToken.email)

      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time
      const jwtIat = this.jwtHelper.decodeToken(token).iat
      const jwtExp = this.jwtHelper.decodeToken(token).exp
      const iat = new Date(0)
      const exp = new Date(0)

      const delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

      return Observable.interval(delay)
    })

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    })
  }

  public async startupTokenRefresh() {
    this.log.verbose('Auth', 'startupTokenRefresh()')

    // http://stackoverflow.com/a/34190965/1123955
    if (this.valid) {
      // If the user is authenticated, use the token stream
      // provided by angular2-jwt and flatMap the token
      const source = this.authHttp.tokenStream.flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          const now: number = new Date().valueOf()
          const jwtExp: number = this.jwtHelper.decodeToken(token).exp
          const exp: Date = new Date(0)
          exp.setUTCSeconds(jwtExp)

          // XXX the delay should be shorter
          // becasue we should emit refresh before scheduleExpire()
          // maybe 1 hour?
          const delay: number = exp.valueOf() - now

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
    this.log.verbose('Auth', 'unscheduleRefresh()')

    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe()
    }
  }

  public unscheduleExpire(): void {
    this.log.verbose('Auth', 'unscheduleExpire()')

    if (this.expireTimer) {
      clearTimeout(this.expireTimer)
      this.log.silly('Auth', 'unscheduleExpire() clearTimeout()')
      this.expireTimer = null
    }
  }

  public async getNewJwt() {
    this.log.verbose('Auth', 'getNewJwt()')

    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    try {
      // Configure Auth0
      /**
       * Token Lifetime: https://auth0.com/docs/tokens/id-token#token-lifetime
       */
      this.getWebAuth().renewAuth({
        // ???
        // https://github.com/auth0/auth0.js/blob/master/example/index.html
        // https://auth0.com/docs/libraries/auth0js/v8#using-renewauth-to-acquire-new-tokens
        // https://auth0.com/forum/t/remember-me-in-authservice-using-auth0-js-v8/5037
        //
        // audience: 'https://example.com/api/v2',
        // scope: 'read:something write:otherthing',

        // Hosted Login Page: https://auth0.com/docs/hosted-pages/login
        // redirectUri: 'https://zixia.auth0.com/login?client=g6P417oEmHON1BuPdsV9foNgP4h98dmh',
        usePostMessage: true,
      }, (err, authResult) => {
        if (err) {
          this.log.error('Auth', 'getNewJwt() WebAuth.renewAuth() error: %s', err)
          return
        }
        this.accessToken  = authResult.accessToken
        this.idToken      = authResult.idToken
        this.refreshToken = authResult.refreshToken

        this.save()

      })
    } catch (e) {
      this.log.error('Auth', 'getNewJwt() error: %s', e.message)
    }
  }

  async save(): Promise<void> {
    this.log.verbose('Auth', 'save()')

    await this.storage.ready()

    this.storage.set(STORAGE_KEY.ACCESS_TOKEN,  this.accessToken)
    this.storage.set(STORAGE_KEY.ID_TOKEN,      this.idToken)
    this.storage.set(STORAGE_KEY.REFRESH_TOKEN, this.refreshToken)

    this.storage.set(STORAGE_KEY.USER_PROFILE,  this.snapshot.profile)
  }

  async remove(): Promise<void> {
    this.log.verbose('Auth', 'remove()')

    await this.storage.ready()

    // Remove token from localStorage
    this.storage.remove(STORAGE_KEY.ACCESS_TOKEN)
    this.storage.remove(STORAGE_KEY.ID_TOKEN)
    this.storage.remove(STORAGE_KEY.REFRESH_TOKEN)

    this.storage.remove(STORAGE_KEY.USER_PROFILE)

    this.accessToken  = null
    this.idToken      = null
    this.refreshToken = null

    this.profile.next(null)
  }

  async load(): Promise<void> {
    this.log.verbose('Auth', 'load()')

    await this.storage.ready()
    this.log.silly('Auth', 'load() Storage.ready() done')

    this.accessToken  = await this.storage.get(STORAGE_KEY.ACCESS_TOKEN)
    this.idToken      = await this.storage.get(STORAGE_KEY.ID_TOKEN)
    this.refreshToken = await this.storage.get(STORAGE_KEY.REFRESH_TOKEN)

    const profile = await this.storage.get(STORAGE_KEY.USER_PROFILE)
    this.profile.next(profile)

    this.log.silly('Auth', 'load() Storage.get() all done. profile={email:%s,...}',
                            profile.email,
                  )

  }

}
