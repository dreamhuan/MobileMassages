import { Injectable } from '@angular/core';
import { SystemService } from '../system/system.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(private systemService: SystemService) { }
  register(content): Promise<any> {
    let param = {
      firstName: content.firstName,
      lastName: content.lastName,
      emailAddress: content.emailAddress,
      mobileNumber: content.mobileNumber,
      password: content.password
    };
    console.log(param);
    return this.systemService.post('web/user/register', param).toPromise();
  };

  login(content): Promise<any> {
    let param = {
      emailAddress: content.emailAddress,
      password: content.password
    };
    console.log(param);
    return this.systemService.post('web/user/login', param).toPromise();
  };

  resetPassword(content): Promise<any> {
    let param = {
      emailAddress: content.emailAddress,
    };
    console.log(param);
    return this.systemService.post('web/user/resetPassword', param).toPromise();
  };
}
