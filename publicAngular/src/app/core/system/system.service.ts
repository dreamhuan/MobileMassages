import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { hostip, handleError, extractData } from '../config';

@Injectable()
export class SystemService {

  private user;
  private uid: string;
  private loginToken: string;

  constructor(private http: Http) { }

  hasCode() {
    if (this.user) {
      return this.user.code;
    } else {
      return null;
    }
  }

  getUser() {
    let userCache = null;

    if (!sessionStorage.user) {
      userCache = null;
    }
    else {
      userCache = JSON.parse(sessionStorage.user);
    }

    //判断是否存在用户缓存
    if (this.user && userCache) {
      //判断本地缓存和session或者localstorage里面的用户信息是否相同
      if (this.user._id !== userCache._id) {
        this.user = userCache;
      }
    } else if (!this.user && userCache) {
      this.user = userCache;
    }
    return this.user;
  }

  setUser(newUser) {
    this.user = newUser;
    sessionStorage.user = JSON.stringify(newUser);
  }

  getUID() {
    if (!this.user) {
      this.user = JSON.parse(localStorage.user);
    }
    return this.user._id;
  }

  setUID(newUID) {
    this.uid = newUID;
    sessionStorage.uid = newUID;
  }

  getHostIP() {
    // return window.location.protocol + '//' + window.location.host;
    return hostip;
  }

  getLoginToken() {
    if (!this.loginToken) {
      this.loginToken = sessionStorage.loginToken;
    }
    return this.loginToken;
  }

  setLoginToken(newLoginToken) {
    this.loginToken = newLoginToken;
    sessionStorage.loginToken = this.loginToken;
  }

  post(url, param = null, successcb = null, errorcb = null): Observable<String> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    return this.http.post(hostip + url, param)
      .map((res: Response | any) => {
        const body = res.json();
        if (body.code === 0) {
          if (successcb) successcb();
        } else {
          if (errorcb) errorcb();
        }
        return body;
      })
      .catch(handleError);
  }
}
