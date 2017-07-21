import { Component, OnInit } from '@angular/core';
import { BookingNavSetting } from '../../shared/bookingNav.setting';
import { NavSetting } from '../../shared/nav.setting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: [ './booking.component.scss' ]
})
export class BookingComponent implements OnInit {

  public bookingStepOption = BookingNavSetting.bookingStepOption;

  constructor(private router: Router) { }

  ngOnInit() {
    //延迟0表示加到任务队列末尾，确保渲染完页面才执行，防止得到上一个url而出错
    setTimeout(function () {
      // console.log(document.URL);
      let active = +document.URL.substr(document.URL.length - 1, 1); //获取url最后一个数字，就是step1234中的一个
      // console.log(active);

      BookingNavSetting.bookingStepOption[ active - 1 ].cls = 1;
      NavSetting.navInit(1);
    }, 0);
  }


  changeOption(item) {
    for (let i of BookingNavSetting.bookingStepOption) {
      i.cls = 0;
    }
    BookingNavSetting.bookingStepOption[ item.opt - 1 ].cls = 1;
    this.router.navigate([ '/booking/step' + item.opt ]);
  }

}
