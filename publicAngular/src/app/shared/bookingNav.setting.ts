export class BookingNavSetting {

  //为了解决在booking的其他二级状态点击nav的booking页面状态栏不会变化的bug
  //而迫不得已引入全局作用域（因为同二级路由切换不会调用父级路由的controller）
  // bookingStepOption1234对应四个选项的class是否为true
  // 为了解决同二级路由跳转状态不改变的已放进$rootScope
  // $scope.bookingStepOption = [
  //     {opt: 1, cls: 0},
  //     {opt: 2, cls: 0},
  //     {opt: 3, cls: 0},
  //     {opt: 4, cls: 0},
  // ];
  public static bookingStepOption = [
    { opt: 1, cls: 0 },
    { opt: 2, cls: 0 },
    { opt: 3, cls: 0 },
    { opt: 4, cls: 0 },
  ];

  //设置当前booking的state
  public static setCurrentBookingStep(num: number) {
    this.bookingStepOption[ 0 ].cls = 0;
    this.bookingStepOption[ 1 ].cls = 0;
    this.bookingStepOption[ 2 ].cls = 0;
    this.bookingStepOption[ 3 ].cls = 0;
    this.bookingStepOption[ num - 1 ].cls = 1;
  };
}
