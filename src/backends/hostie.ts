/**
 * Wechaty APP for Android & Ios
 * Your ChatBot Pocket Manager
 *
 * https://github.com/wechaty/wechaty-ionic
 * Zhuohuan LI <zixia@zixia.net>
 * License Apache-2.0
 */
import { Http }       from '@angular/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {
  Hostie,
  HostieStatus,
}               from '@chatie/db'

/**
 * How to build Angular 2 apps using Observable Data Services - Pitfalls to avoid
 * http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
 */
@Injectable()
export class HostieBackend {
  private hostieList: Hostie[] = [
    {
      id: '1',
      token: '111',
      name: 'lizhuohuan',
      createTime: 4132412343241,
      note: 'zixia memo',
      status: HostieStatus.OFFLINE,
      version: '0.7.1',
      runtime: 'win32',
    } as Hostie,
    {
      id: '2',
      token: '222',
      name: 'I am hostie',
      createTime: 1479609614286,
      note: 'token memo',
      status: HostieStatus.ONLINE,
      version: '0.7.0',
      runtime: 'docker',
    } as Hostie,
  ]

  constructor(public http: Http) {
    console.log('Hello HostieBackendService Provider')
  }

  add(newHostie: Hostie): Observable<boolean> {
    let maxId = 1
    this.hostieList.forEach(hostie => {
      if (hostie.id > maxId) {
        maxId = hostie.id
      }
    })
    newHostie.id = maxId + 1

    console.log(newHostie)
    this.hostieList.push(newHostie)
    console.log(this.hostieList)

    return this.http.get('https://www.wechaty.io')
                    .map(res => res.ok)
                    // .cache()
  }

  del(delHostie: Hostie): Observable<boolean> {
    const lenBefore = this.hostieList.length
    this.hostieList = this.hostieList.filter(hostie => hostie.id !== delHostie.id)
    const lenAfter = this.hostieList.length

    return this.http.get('https://www.wechaty.io')
                    .map(res => lenAfter < lenBefore && res.ok)
                    // .cache()
  }

  edit(hostie: Hostie) {
    if (this.del(hostie)) {
      this.add(hostie)
      return true
    }
    return false
  }

  list(): Hostie[] {
    console.log(this.hostieList)

    return this.hostieList
  }

  search(id: number): Hostie | null {
    const result = this.hostieList.filter(hostie => hostie.id === id)
    if (result.length) {
      return result[0]
    }
    return null
  }
}
