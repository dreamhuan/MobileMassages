import { Component, OnInit } from '@angular/core';
import { NavSetting } from '../../../shared/nav.setting';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/alert/alert.service';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  public emailAddress;
  public password;

  constructor(private router: Router, private alertService: AlertService, private userService: UserService) { }

  ngOnInit() {
    NavSetting.navInit(7)
  }

  forgetPwd() {
    this.router.navigate([ '/forgetpassword' ]);
  };

  //TODO:登陆登出判断
  login() {
    let content = {
      emailAddress: this.emailAddress,
      password: this.password
    };
    let promise = this.userService.login(content);
    promise.then(function (data) {
      console.log(data);
      this.alertService.success("Login Successful!");
      console.log(data);
      sessionStorage.currentAccount = data.id;
      this.router.navigate([ '/home' ]);
    }, function (reason) {
      console.log(reason);
      this.alertService.error(reason);
    })
  }

}
