import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingNavSetting } from '../../../shared/bookingNav.setting';
import { AlertService } from '../../../core/alert/alert.service';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: [ './step3.component.scss' ]
})
export class Step3Component implements OnInit {

  public showType = 0;
  public firstName;
  public lastName;
  public emailAddress;
  public mobileNumber;
  public password;

  constructor(private router: Router, private alertService: AlertService, private userService: UserService) {
    BookingNavSetting.setCurrentBookingStep(3);
  }

  ngOnInit() {
    if (sessionStorage.currentAccount) {
      this.alertService.success("Already Login");
      this.router.navigate([ '/booking/step4' ]);
    }
  }


  forgetPwd() {
    this.router.navigate([ '/forgetpassword' ]);
  };

  continue() {
    let step3, flag = 1;
    if (this.showType === 0) {
      step3 = {
        showType: 0,
        firstName: this.firstName,
        lastName: this.lastName,
        emailAddress: this.emailAddress,
        mobileNumber: this.mobileNumber,
        password: this.password
      }

    }
    else {
      step3 = {
        showType: 1,
        emailAddress: this.emailAddress,
        password: this.password
      }
    }

    sessionStorage.step3 = JSON.stringify(step3);
    if (step3.showType === 0) {
      let promise = this.userService.register(step3);
      promise.then(function (data) {
        console.log(data);
        this.alertService.success("Register Successful");
        console.log(data);
        sessionStorage.currentAccount = data.id;
        this.router.navigate([ '/booking/step4' ]);
      }, function (reason) {
        console.log(reason);
        flag = 0;
        this.alertService.error(reason);
      })
    }
    else {
      let promise = this.userService.login(step3);
      promise.then(function (data) {
        console.log(data);
        this.alertService.success("Login Successful");
        console.log(data);
        sessionStorage.currentAccount = data.id;
        this.router.navigate([ '/booking/step4' ]);
      }, function (reason) {
        console.log(reason);
        flag = 0;
        this.alertService.error(reason);
      })
    }
    console.log(step3.showType);
  };

  back() {
    this.router.navigate([ '/booking/step2' ]);
  };
}
