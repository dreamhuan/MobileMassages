/**
 * Created by muyonghui on 2017/5/3.
 */
import { Observable } from "rxjs";
import { Response } from '@angular/http';

// const Hostip = 'http://123.206.111.244:4000/';
const Hostip = 'http://localhost:8080/';

const ExtractData = (res: Response | any) => {
  let body = res.json();
  return body || {};
};

const HandleError = (error: Response | any) => {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
};

export const hostip = Hostip;
export const extractData = ExtractData;
export const handleError = HandleError;
