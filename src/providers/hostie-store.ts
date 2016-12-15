import { Injectable } from '@angular/core'
import { Http }       from '@angular/http'
import {
  BehaviorSubject,
  Observable,
}                     from 'rxjs'

import 'rxjs/add/operator/map'

import { Hostie }               from '../models/hostie'

import { HostieBackend } from './hostie-backend'

/**
 *
 */
@Injectable()
export class HostieStore {
  private _hostieList:  BehaviorSubject<Hostie[]>   = new BehaviorSubject([])
  public hostieList:    Observable<Hostie[]>        = this._hostieList.asObservable()

  constructor(
    private http: Http,
    private hostieBackend: HostieBackend,
  ) {
    console.log('Hello Hostie Provider')
    const list = hostieBackend.list()
    this._hostieList.next(list)
  }

  add(newHostie: Hostie): Observable<boolean> {
    const obs = this.hostieBackend.add(newHostie)

    obs.subscribe(res => {
      const hostieList = this._hostieList.getValue()
      hostieList.push(newHostie)

      this._hostieList.next(hostieList)
    })

    return obs
  }

  del(delHostie: Hostie): Observable<boolean> {
    const obs = this.hostieBackend.del(delHostie)

    obs.subscribe(res => {
      const hostieList = this._hostieList.getValue()

      hostieList.forEach((hostie, idx) => {
        if (hostie.id === delHostie.id) {
          hostieList.splice(idx, 1)

          this._hostieList.next(hostieList)
        }
      })
    })

    return obs
  }

}


