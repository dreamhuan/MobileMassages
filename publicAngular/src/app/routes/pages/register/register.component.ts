import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/user/user.service';
import { AlertService } from '../../../core/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public firstName;
  public lastName;
  public emailAddress;
  public mobileNumber;
  public password;

  constructor(private userService:UserService,private alertService:AlertService,private router:Router) { }

  ngOnInit() {
  }

  signup(isValid) {

    console.log(isValid);
    // check to make sure the form is completely valid
    if (isValid) {
      let signupdata = {
        firstName: this.firstName,
        lastName: this.lastName,
        emailAddress: this.emailAddress,
        mobileNumber: this.mobileNumber,
        password: this.password
      };
      let promise = this.userService.register(signupdata);
      promise.then(function (data) {
        console.log(data);
        this.alertService.success("Register Successful!");
        console.log(data);
        sessionStorage.currentAccount= data.id;

        this.router.navigate(['/home']);
      }, function (reason) {
        console.log(reason);
        this.alertService.error(reason);
      })
    } else {
      this.alertService.error('Error!');
    }
  }
}
