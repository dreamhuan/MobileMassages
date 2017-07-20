import { Component, OnInit } from '@angular/core';
import 'jquery';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { NavSetting } from '../../shared/nav.setting';
import { DateUtil } from '../../shared/date.util';

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

  constructor(private http: Http) { }

  //TODO bs图片轮播，bs的日期选择器，lib库的引入,cookie
  ngOnInit() {
    // $('#myCarousel').carousel({ interval: 3500 });//每隔5秒自动轮播

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

    // $('#datepicker').datetimepicker({
    //   format: 'yyyy-mm-dd',
    //   language: 'en',
    //   weekStart: 1,
    //   todayBtn: 1,
    //   autoclose: 1,
    //   todayHighlight: 1,
    //   startView: 2,
    //   minView: 2,
    //   forceParse: 0
    // });

    // $('#timepicker').wickedpicker();

    setTimeout(function () {
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
    // let date = $('#datepicker').val();
    // if (!date) date = new Date().Format("yyyy-MM-dd");
    // let time = $('#timepicker').val();
    // console.log(date);
    // console.log(time);
    // console.log(time.length);
    // let step1 = {
    //   date: date,
    //   time: time
    // };
    // $cookieStore.put('step1', step1);
    // $state.go('booking.step2');
  };

}
