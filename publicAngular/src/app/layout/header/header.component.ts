import { Component, OnInit } from '@angular/core';
import { NavSetting } from '../../shared/nav.setting';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("test");
    NavSetting.navInit(0);
    setTimeout(() => {
      // console.log($(".rightSlideMenu .filter"));
      $(".rightSlideMenu .filter").click(() => { this.closeMenu(); })
    }, 0);
  }

  closeMenu() {
    console.log("test");
    $(".menu").animate({ right: '-100%' }, 300, () => {
      $(".filter").animate({ opacity: '0' }, 300, () => {
        $(".rightSlideMenu").css('display', 'none');
        $("body").css({ overflow: "scroll" });
        $(".filter").css('opacity', '0.6');
        $(".menu").css('right', '0');
      });
    });
  }

  openMenu() {
    $(".rightSlideMenu").css('display', 'block');
    $("body").css({ overflow: "hidden" });
  }
}
