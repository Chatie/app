/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import { Injectable } from '@angular/core'
import { Http }       from '@angular/http'
import {
  BehaviorSubject,
  Observable,
}                     from 'rxjs'

import 'rxjs/add/operator/map'

import { Hostie }        from '../models/hostie'

import { HostieBackend } from './hostie-backend'

/**
 * How to build Angular 2 apps using Observable Data Services - Pitfalls to avoid
 * http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
 *
 * 3 Common Rxjs Pitfalls that you might find while building Angular 2 Applications
 * http://blog.angular-university.io/angular-2-rxjs-common-pitfalls/
 */
@Injectable()
export class HostieStore {
  private hostieList:  BehaviorSubject<Hostie[]> = new BehaviorSubject([])

  constructor(
    private http: Http,
    private hostieBackend: HostieBackend,
  ) {
    console.log('Hello Hostie Provider')
    this.hostieList.next(hostieBackend.list())
  }

  add(newHostie: Hostie): Observable<boolean> {
    const obs = this.hostieBackend.add(newHostie)

    obs.subscribe(res => {
      const hostieList = this.hostieList.getValue()
      hostieList.push(newHostie)

      this.hostieList.next(hostieList)
    })

    return obs
  }

  del(delHostie: Hostie): Observable<boolean> {
    const obs = this.hostieBackend.del(delHostie)

    obs.subscribe(res => {
      const hostieList = this.hostieList.getValue()

      hostieList.forEach((hostie, idx) => {
        if (hostie.id === delHostie.id) {
          hostieList.splice(idx, 1)

          this.hostieList.next(hostieList)
        }
      })
    })

    return obs
  }

  list(): Observable<Hostie[]> {
    return this.hostieList.asObservable()
  }

  search(id) {

  }

  update(hostie: Hostie) {

  }
}


