import { Component, OnInit } from '@angular/core';
import { BookingNavSetting } from '../../../shared/bookingNav.setting';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AlertService } from '../../../core/alert/alert.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: [ './step2.component.scss' ]
})
export class Step2Component implements OnInit {

  public chooses = [];
  public therapists = [];
  public chooseTherapist = [];
  //countchoose是当前已选的计数，count是选项中的人数
  private countchoose = 0;
  public count = 0;
  public price;
  public massageType;

  constructor(private http: Http, private router: Router, private alertService: AlertService) {
    BookingNavSetting.setCurrentBookingStep(2);
  }

  ngOnInit() {

    this.http.get('/assets/data/bookingstep2.json')
      .toPromise()
      .then((res: Response | any) => {
        console.log(res);
        if (res.status == 200) {
          this.chooses = res.json();


          this.http.get('/assets/data/price.json')
            .toPromise()
            .then((res: Response | any) => {
              this.price = res.json();

              this.http.get('/assets/data/home-massage-type.json')
                .toPromise()
                .then((res) => {
                  this.massageType = res.json();

                  this.chooses[ 0 ].options = [];
                  this.chooses[ 1 ].options = [];
                  this.chooses[ 2 ].options = [];
                  for (let i = 0; i < this.price.length; i++) {
                    this.chooses[ 0 ].options.push(this.price[ i ].title);
                  }
                  for (let i = 0; i < this.price[ 0 ].priceList.length; i++) {
                    this.chooses[ 1 ].options.push(this.price[ 0 ].priceList[ i ].time + " minutes - £" + this.price[ 0 ].priceList[ i ].price);
                  }
                  for (let i = 0; i < this.massageType.length; i++) {
                    let str = this.massageType[ i ].title;
                    if (str.indexOf("Massage") < 0) {
                      str += " Massage";
                    }
                    this.chooses[ 2 ].options.push(str);
                  }

                  //每个选项的默认选项是第一个
                  for (let i = 0; i < this.chooses.length; i++) {
                    this.chooses[ i ].chooseoption = this.chooses[ i ].options[ 0 ];
                  }

                  //选中的人数是第一个选择的内容
                  let str = this.chooses[ 0 ].chooseoption;
                  //选中'-'后面的数字
                  this.count = str.substr(str.indexOf('-') + 1, 1);


                })
                .catch((err) => {
                  console.log(err);
                });

            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });


    this.http.get('/assets/data/massage-therapists.json')
      .toPromise()
      .then((res)=> {
        if (res.status == 200) {
          this.therapists = res.json();
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  changeChoose(choose, option) {
    choose.chooseoption = option;

    //每次修改第一个的选项后重置下面人物选择部分内容并修改第二个选项的价格
    if (choose === this.chooses[ 0 ]) {
      this.countchoose = 0;
      let str = this.chooses[ 0 ].chooseoption;
      this.count = str.substr(str.indexOf('-') + 1, 1);
      this.chooseTherapist = [];
      for (let i = 0; i < this.therapists.length; i++) {
        $('#' + this.therapists[ i ].name).removeClass('img-active');
      }

      this.chooses[ 1 ].options = [];
      let priceList = this.price[ this.count - 1 ].priceList;
      for (let i = 0; i < priceList.length; i++) {
        this.chooses[ 1 ].options.push(priceList[ i ].time + " minutes - £" + priceList[ i ].price);
      }
      //默认选项是第一个
      this.chooses[ 1 ].chooseoption = this.chooses[ 1 ].options[ 0 ];
    }
  };


  toggleTherapist(therapist) {
    let flag = 0;
    //以下代码吧这个元素从数组中删除，并不改变原顺序。复杂度O(n^2)
    //找到该元素，并把后面元素依次往前移动，最后pop掉最后元素
    for (let i = 0; i < this.chooseTherapist.length; i++) {
      if (therapist === this.chooseTherapist[ i ]) {
        flag = 1;
        this.countchoose--;
        for (let j = i; j < this.chooseTherapist.length - 1; j++) {
          this.chooseTherapist[ j ] = this.chooseTherapist[ j + 1 ];
        }
        this.chooseTherapist.pop();
        break;
      }
    }
    if (!flag) {
      this.countchoose++;
      // console.log(count);
      // console.log($scope.count);
      // console.log(count > $scope.count);
      if (this.countchoose > this.count) {
        this.alertService.error('The number of therapist has reached the limit!');
        this.countchoose--;
        return;
      }
      this.chooseTherapist.push(therapist);
    }
    $('#' + therapist.name).toggleClass('img-active');
  };

  continue() {
    //一个是string一个是number,+string是吧string转为number
    console.log(this.countchoose);
    console.log(this.count);
    if (this.countchoose !== +this.count) {
      this.alertService.question('Haven\'t choose the Therapist', 'Either therapist?',
        () => {
          this.chooseTherapist = [ {
            name: 'Either Therapist'
          } ];
          this.nextstep();
        });
    } else {
      this.nextstep();
    }
  };

  private nextstep() {
    let choise = [];
    for (let i = 0; i < this.chooses.length; i++) {
      let item = {
        type: this.chooses[ i ].type,
        option: this.chooses[ i ].chooseoption,
      };
      choise.push(item);
    }
    choise.push({
      type: 'chooseTherapist',
      option: this.chooseTherapist
    });
    console.log(choise);
    sessionStorage.step2 = choise;
    this.router.navigate([ '/booking/step3' ]);
  }

  back() {
    this.router.navigate([ '/booking/step1' ]);
  };
}
