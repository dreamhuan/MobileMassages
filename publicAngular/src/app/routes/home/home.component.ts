import { Component, OnInit } from '@angular/core';

declare var $: any;

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NavSetting } from '../../shared/nav.setting';
import { DateUtil } from '../../shared/date.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  public items;
  public datas;
  public prices;
  private datetime = {
    date: new Date(),
    time: new Date().toLocaleTimeString()
  };

  constructor(private http: Http, private router: Router) { }

  //TODO 日期时间选择器的样式
  ngOnInit() {
    // console.log($.fn);

    $('#myCarousel').carousel({ interval: 3500 });//每隔5秒自动轮播

    this.http.get('/assets/data/faq.json')
      .toPromise()
      .then((res: Response | any) => {
        let body = res.json();
        console.log(body);
        this.items = body;
      });

    this.http.get('/assets/data/home-massage-type.json')
      .toPromise()
      .then((res: Response | any) => {
        let body = res.json();
        console.log(body);
        this.datas = body;
      });

    this.http.get('/assets/data/price.json')
      .toPromise()
      .then((res: Response | any) => {
        let body = res.json();
        console.log(body);
        this.prices = body[ 0 ].priceList;
      });

    $('#datepicker').datetimepicker({
      format: 'YYYY-MM-DD',
    });

    $('#timepicker').datetimepicker({
      format: 'LT'
    });

    setTimeout(() => {
      NavSetting.navInit(0);
    }, 0);
  }


  continue() {
    let date = $('#datepicker').val();
    if (!date) date = DateUtil.Format(new Date(), "yyyy-MM-dd");
    let time = $('#timepicker').val();
    console.log(date);
    console.log(time);
  };


  booking() {
    let date = $('#datepicker').val();
    if (!date) date = DateUtil.Format(new Date(), 'yyyy-MM-dd');
    let time = $('#timepicker').val();
    console.log(date);
    console.log(time);
    console.log(time.length);
    let step1 = {
      date: date,
      time: time
    };
    sessionStorage.step1 = JSON.stringify(step1);
    this.router.navigate([ '/booking/step2' ]);
  };
}
