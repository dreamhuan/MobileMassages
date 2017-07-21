declare var $:any;
export class NavSetting {

  //放在每个主要页面的controller开头
  //用于将对应的页面粗体化
  //使用：$timeout(function(){NavSetting.navInit(whatYouWant)},0);
  static target: number;

  public static navInit(target) {
    if (!this.target) this.target = 0;
    $('.navbar-nav li a').eq(this.target).attr('style', '');
    $(".rightSlideMenu .menu .navGroup .navItem").eq(this.target).attr('style', '');

    this.target = target;
    $('.navbar-nav li a').eq(this.target).attr('style', 'font-weight:bold;color:#9a9691!important;');
    $(".rightSlideMenu .menu .navGroup .navItem").eq(this.target).attr('style', 'font-weight:bold;color:#9a9691!important;');

    if (target === 7) { //PC的signIn不能改颜色所以再替换掉
      $('.navbar-nav li a').eq(this.target).attr('style', 'font-weight:bold;');
    }
  };
}
