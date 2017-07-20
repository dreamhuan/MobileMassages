import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class AlertService {

  constructor() { }

  success(message) {
    swal('success!', message, 'success');
  }

  error(message) {
    swal('error!', message, 'error');
  }

  warning(title, message, callback) {
    swal({
      title: title,
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'confirm',
      cancelButtonText: 'cancel'
    }).then(callback, (dismiss) => {
      if (dismiss === 'cancel') {
        // ignore
      } else {
        console.log(dismiss);
      }
    });
  }

  question(title, message, callback) {
    swal({
      title: title,
      text: message,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'confirm',
      cancelButtonText: 'cancel'
    }).then(callback, (dismiss) => { //callback是确定的回调，后面是其他的回调
      if (dismiss === 'cancel') {
        // ignore
      } else {
        console.log(dismiss);
      }
    });
  }

  input(title, message, callback) {
    swal({
      title: title,
      text: message,
      type: 'info',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'confirm',
      cancelButtonText: 'cancel'
    }).then((inputValue) => {
      callback(inputValue);
    }, (dismiss) => {
      if (dismiss === 'cancel') {
        // ignore
      } else {
        console.log(dismiss);
      }
    });
  }
}
