import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/alert/alert.service';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.scss']
})
export class ForgetpwdComponent implements OnInit {

  public emailAddress;
  constructor(private router:Router,private alertService:AlertService,private userService:UserService) { }

  ngOnInit() {
  }

  resetPassword () {
    let param = {
      emailAddress: this.emailAddress
    };
    let promise = this.userService.resetPassword(param);
    promise.then(function (data) {
      this.alertService.success("Email has been sent already");
      this.router.navigate(['/home']);
    }, function (reason) {
      console.log(reason);
      this.alertService.error(reason);
    })
  }

}
