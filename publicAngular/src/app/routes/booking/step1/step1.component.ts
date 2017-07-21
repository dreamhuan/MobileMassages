import { Component, OnInit } from '@angular/core';
import { BookingNavSetting } from '../../../shared/bookingNav.setting';
import { Router } from '@angular/router';
import { DateUtil } from '../../../shared/date.util';

declare var $: any;

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: [ './step1.component.scss' ]
})
export class Step1Component implements OnInit {

  private datetime = {
    date: new Date(),
    time: new Date().toLocaleTimeString()
  };

  constructor(private router: Router) {
    //因为有生命周期的缘故所以放到这里，不然会报错
    BookingNavSetting.setCurrentBookingStep(1);
  }

  ngOnInit() {

    //页面渲染完后设置min-height让step1的footer贴底
    setTimeout(function () {
      // console.log($(document.body).height());
      // console.log($('.content').offset().top);
      // console.log($('.footer').height());
      let minHeight = $(document.body).height() - ($('.footer').height() + $('.content').offset().top);
      $('.content').css('min-height', minHeight);
    }, 0);


    $('#datepicker').datetimepicker({
      format: 'YYYY-MM-DD',
    });
    $('#timepicker').datetimepicker({
      format: 'LT',
    });

  }

  continue() {
    let date = $('#datepicker').val();
    if (!date) date = DateUtil.Format(new Date(), "yyyy-MM-dd");
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
