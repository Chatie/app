import {
  Injectable,
  NgZone,
}                             from '@angular/core'
import { Storage }            from '@ionic/storage'
// import { Http }            from '@angular/http'
import                            'rxjs/add/operator/map'

import Auth0Lock            from 'auth0-lock'
import {
  AuthHttp,
  JwtHelper,
  tokenNotExpired,
}                           from 'angular2-jwt'

import { Brolog }           from 'brolog'

@Injectable()
export class Auth {
  authorizathed: any
  profile: any

  jwtHelper: JwtHelper = new JwtHelper()

  storage: Storage = new Storage()
  refreshSubscription: any
  user: Object
  accessToken: string
  idToken: string | null

  // Configure Auth0
  lock = new Auth0Lock(
    'kW2jmKVAO6xMY9H4fYPUtFJSSRJbe3sz',
    'zixia.auth0.com',
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
      }
    }
  )

  constructor(
    public authHttp:  AuthHttp,
    public log:       Brolog,
    public ngZone:    NgZone,
  ) {
    this.log.verbose('Auth', 'constructor()')

   this.storage.get('profile')
                .then(profile => {
                  this.user = JSON.parse(profile);
                }).catch(error => {
                  console.log(error);
                });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });

    this.lock.on('authenticated', authResult => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.storage.set('access_token', authResult.accessToken);
        this.storage.set('id_token', authResult.idToken);
        this.storage.set('refresh_token', authResult.refreshToken);
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;

        // Fetch profile information
        this.lock.getUserInfo(this.accessToken, (error, profile) => {
          if (error) {
            // Handle error
            alert(error);
            return;
          }

          profile.user_metadata = profile.user_metadata || {};
          this.storage.set('profile', JSON.stringify(profile));
          this.user = profile;
        });

        this.lock.hide();

        this.ngZone.run(() => this.user = authResult.profile);
        // // Schedule a token refresh
        this.scheduleRefresh();
      }

    })
  }

  dumy() {
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
  }
  public async login(): Promise<any> {
    this.log.verbose('Auth', 'login()')

    return new Promise((resolve, reject) => {
      // Add callback for lock `authenticated` event
      this.lock.on('authenticated', (authResult) => {
        this.log.verbose('Auth', 'login() on(authenticated)')

        this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            // Handle error
            return reject(error)
          }

          localStorage.setItem('accessToken', authResult.accessToken)
          localStorage.setItem('profile', JSON.stringify(profile))

          localStorage.setItem('id_token', authResult.idToken)

          /**
           * Resolve
           */
          return resolve(authResult)
        })

        this.lock.on('unrecoverable_error', error => {
          this.log.verbose('Auth', 'login() on(unrecoverable_error)')
          return reject(error)
        })

        this.lock.on('authorization_error', error => {
          this.log.verbose('Auth', 'login() on(authorization_error)')
          return reject(error)
        })

        // Call the show method to display the widget.
        this.lock.show()
      })
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
    return tokenNotExpired('id_token', this.idToken)
  }

  public logout() {
    // Remove token from localStorage
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.ngZone.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
  }


  // refreshSubscription: any;

  // ...

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    let source = this.authHttp.tokenStream.flatMap(
      token => {
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);

        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

        return Observable.interval(delay);
      });

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }

  public startupTokenRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    if (this.authenticated()) {
      let source = this.authHttp.tokenStream.flatMap(
        token => {
          // Get the expiry time to generate
          // a delay in milliseconds
          let now: number = new Date().valueOf();
          let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
          let exp: Date = new Date(0);
          exp.setUTCSeconds(jwtExp);
          let delay: number = exp.valueOf() - now;

          // Use the delay in a timer to
          // run the refresh at the proper time
          return Observable.timer(delay);
        });

       // Once the delay time from above is
       // reached, get a new JWT and schedule
       // additional refreshes
       source.subscribe(() => {
         this.getNewJwt();
         this.scheduleRefresh();
       });
    }
  }

  public unscheduleRefresh() {
    // Unsubscribe fromt the refresh
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public getNewJwt() {
    // Get a new JWT from Auth0 using the refresh token saved
    // in local storage
    this.local.get('refresh_token').then(token => {
      this.lock.getClient().refreshToken(token, (err, delegationRequest) => {
        if (err) {
          alert(err);
        }
        this.local.set('id_token', delegationRequest.id_token);
      });
    }).catch(error => {
      console.log(error);
    });
  }

public scheduleRefresh() {
  // If the user is authenticated, use the token stream
  // provided by angular2-jwt and flatMap the token

  let source = Observable.of(this.idToken).flatMap(
    token => {
      console.log('token here', token);
      // The delay to generate in this case is the difference
      // between the expiry time and the issued at time
      let jwtIat = this.jwtHelper.decodeToken(token).iat;
      let jwtExp = this.jwtHelper.decodeToken(token).exp;
      let iat = new Date(0);
      let exp = new Date(0);
      
      let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
      
      return Observable.interval(delay);
    });
    
  this.refreshSubscription = source.subscribe(() => {
    this.getNewJwt();
  });
}

public startupTokenRefresh() {
  // If the user is authenticated, use the token stream
  // provided by angular2-jwt and flatMap the token
  if (this.authenticated()) {
    let source = Observable.of(this.idToken).flatMap(
      token => {
        // Get the expiry time to generate
        // a delay in milliseconds
        let now: number = new Date().valueOf();
        let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
        let exp: Date = new Date(0);
        exp.setUTCSeconds(jwtExp);
        let delay: number = exp.valueOf() - now;
        
        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(delay);
      });
    
      // Once the delay time from above is
      // reached, get a new JWT and schedule
      // additional refreshes
      source.subscribe(() => {
        this.getNewJwt();
        this.scheduleRefresh();
      });
  }
}

public unscheduleRefresh() {
  // Unsubscribe fromt the refresh
  if (this.refreshSubscription) {
    this.refreshSubscription.unsubscribe();
  }
}

public getNewJwt() {
  // Get a new JWT from Auth0 using the refresh token saved
  // in local storage
  this.storage.get('refresh_token').then(token => {
    this.auth0.refreshToken(token, (err, delegationRequest) => {
      if (err) {
        alert(err);
      }
      this.storage.set('id_token', delegationRequest.id_token);
      this.idToken = delegationRequest.id_token;
    });
  }).catch(error => {
    console.log(error);
  });
  
}


}
