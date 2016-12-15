import { Http }       from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

import { Hostie } from '../models/hostie'

/**
 * How to build Angular 2 apps using Observable Data Services - Pitfalls to avoid
 * http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
 */
@Injectable()
export class HostieBackend {
  private hostieList: Hostie[] = [
    {
      id: 1,
      token: '111',
      nick: 'lizhuohuan',
      createTime: 4132412343241,
      memo: 'zixia memo',
      status: 0,
      version: '0.7.1',
      runtime: 'win32',
    },
    {
      id: 2,
      token: '222',
      nick: 'I am hostie',
      createTime: 1479609614286,
      memo: 'token memo',
      status: 1,
      version: '0.7.0',
      runtime: 'docker',
    },
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
                    .cache()
  }

  del(delHostie: Hostie): Observable<boolean> {
    const lenBefore = this.hostieList.length
    this.hostieList = this.hostieList.filter(hostie => hostie.id !== delHostie.id)
    const lenAfter = this.hostieList.length

    return this.http.get('https://www.wechaty.io')
                    .map(res => lenAfter < lenBefore && res.ok)
                    .cache()
  }

  edit(hostie) {
    if (this.del(hostie.id)) {
      this.add(hostie)
      return true
    }
    return false
  }

  list(): any[]
  list(id?): any[] | any {
    console.log(this.hostieList)

    if (typeof id !== 'undefined') {
      const result = this.hostieList.filter(hostie => hostie.id == id)
      if (result.length) {
        return result[0]
      }
      return null
    }
    return this.hostieList
  }

}
