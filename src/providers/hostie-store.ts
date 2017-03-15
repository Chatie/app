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
}                     from  'rxjs'
import                      'rxjs/add/operator/map'

import {
  Hostie,
  HostieBackend,
  HostieStatus,
}                 from '../backends/hostie-backend'

@Injectable()
export class HostieStore {
  private backend: HostieBackend

  private _hosties:  BehaviorSubject<Hostie[]> = new BehaviorSubject([])
  get hosties() {
    return this._hosties
                .asObservable()
                .share()
  }

  constructor(
    private http: Http,
  ) {
    console.log('Hello Hostie Provider')
    this.backend = new HostieBackend(http)
    this._hosties.next(this.backend.list())
  }

  insert(newHostie: Hostie): Observable<boolean> {
    const obs = this.backend.insert(newHostie)

    obs.subscribe(res => {
      const newHosties = this._hosties.getValue()
      newHosties.push(newHostie)

      this._hosties.next(newHosties)
    })

    return obs
  }

  remove(delHostie: Hostie): Observable<boolean> {
    const obs = this.backend.remove(delHostie)

    obs.subscribe(res => {
      const hostieList = this._hosties.getValue()

      hostieList.some((hostie, idx) => {
        if (hostie.id === delHostie.id) {
          hostieList.splice(idx, 1)
          this._hosties.next(hostieList)
          return true
        }
        return false
      })
    })

    return obs
  }

  find(id: string) {

  }

  update(hostie: Hostie) {

  }
}

export { Hostie }
