import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful-booking',
  templateUrl: './successful-booking.component.html',
  styleUrls: ['./successful-booking.component.scss']
})
export class SuccessfulBookingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout(function () {
      this.router.navigate(['/home']);
    }, 1000);
  }

}
