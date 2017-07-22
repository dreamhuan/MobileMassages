import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NavSetting } from '../../shared/nav.setting';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: [ './pricing.component.scss' ]
})
export class PricingComponent implements OnInit {

  public prices;

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    this.http.get('/assets/data/price.json')
      .toPromise()
      .then((res) => {
        this.prices = res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    NavSetting.navInit(4)

  }

  booking() {
    this.router.navigate([ '/booking/step1' ]);
  }

}
