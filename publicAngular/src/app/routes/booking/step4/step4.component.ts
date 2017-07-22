import { Component, OnInit } from '@angular/core';
import { BookingNavSetting } from '../../../shared/bookingNav.setting';
import { AlertService } from '../../../core/alert/alert.service';
import { BookingService } from '../../../core/booking/booking.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: [ './step4.component.scss' ]
})
export class Step4Component implements OnInit {

  public cardName;
  public cardNumber;
  public cardExpirationDate;
  public cardSecurityCode;
  public billingPostalCode;
  public streetAddress;
  public streetAddress2;
  public stateProvince;
  public postCode;
  public parkingInstructions;
  public giftCode;
  public showOrderSummary;
  public orderSummary;
  public step4 = 0;
  public step4data;

  constructor(private router: Router, private alertService: AlertService, private bookingService: BookingService) {
    BookingNavSetting.setCurrentBookingStep(4);

  }

  ngOnInit() {

    $('#datepicker').datetimepicker({
      format: 'YYYY-MM-DD',
    });
  }


  apply() {
    if (this.cardName
      && this.cardNumber
      && this.cardExpirationDate
      && this.cardSecurityCode
      && this.billingPostalCode) {
      this.alertService.success('Check Successful');
    } else {
      this.alertService.error('Haven\'t filled the former content');
    }
  };

  book() {
    if (this.step4 === 0) {
      this.step4data = {
        streetAddress: this.streetAddress,
        streetAddress2: this.streetAddress2,
        stateProvince: this.stateProvince,
        postCode: this.postCode,
        parkingInstructions: this.parkingInstructions || ''  //如果是undefined就改为空字符串
      };
      this.step4 = 1;


      this.showOrderSummary = false;
      let step1 = sessionStorage.step1 && JSON.parse(sessionStorage.step1) || null;
      let step2 = sessionStorage.step2 && JSON.parse(sessionStorage.step2) || null;
      let step3 = sessionStorage.step3 && JSON.parse(sessionStorage.step3) || null;
      console.log('step1');
      console.log(step1);
      console.log('step2');
      console.log(step2);
      console.log('step3');
      console.log(step3);
      console.log('step4');
      console.log(this.step4data);

      if (step1 && step2) {
        let date = step1.date.split('-').reverse();
        [ date[ 0 ], date[ 1 ] ] = [ date[ 1 ], date[ 0 ] ];
        let datetime = date.join('/') + ' ' + step1.time.replace(' : ', ':');
        console.log(datetime);

        let session = step2[ 0 ].option.substring(0, step2[ 0 ].option.indexOf('-') - 1);
        console.log(session);

        let therapist = step2[ 3 ].option[ 0 ].name;
        for (let i = 1; i < step2[ 3 ].option.length; i++) {
          therapist += ',' + step2[ 3 ].option[ i ].name;
        }
        let detail = step2[ 2 ].option.substring(0, step2[ 2 ].option.indexOf('Massage') - 1) + '/' +
          step2[ 1 ].option.substring(0, step2[ 1 ].option.indexOf(' ') + 4) + '/' + therapist;
        console.log(detail);

        let address = this.step4data.streetAddress.length > 10 ? this.step4data.streetAddress.substr(0, 10) + '...' : this.step4data.streetAddress + ', ' + this.step4data.postCode;
        console.log(address);

        let money = step2[ 1 ].option.substring(step2[ 1 ].option.indexOf('-') + 3, step2[ 1 ].option.length);
        console.log(money);

        this.orderSummary = {
          datetime: datetime,
          session: session + ' Session',
          detail: detail,
          address: address,
          money: money
        };
        this.showOrderSummary = true;
      }
      return;
    }
    this.step4data.cardName = this.cardName;
    this.step4data.cardNumber = this.cardNumber;
    this.step4data.cardExpirationDate = this.cardExpirationDate;
    this.step4data.cardSecurityCode = this.cardSecurityCode;
    this.step4data.billingPostalCode = this.billingPostalCode;
    this.step4data.giftCode = this.giftCode;

    sessionStorage.step4 = JSON.stringify(this.step4data);

    let step1 = JSON.parse(sessionStorage.step1);
    let step2 = JSON.parse(sessionStorage.step2);
    let step3 = sessionStorage.currentAccount;
    if (!(step1 && step2 && step3 && this.step4data)) {
      this.alertService.error('Haven\'t filled the former content');
      return;
    }

    let data = {
      userId: sessionStorage.currentAccount,
      therapists: step2[ 3 ].option,
      date: step1.date,
      time: step1.time,
      style: step2[ 2 ].option,
      massageLength: step2[ 1 ].option,
      address: (this.step4data.streetAddress + this.step4data.streetAddress2),
      creditCardNumber: this.step4data.cardNumber,
    };
    console.log(data);
    let promise = this.bookingService.booking(data);
    promise.then(function (data) {
      sessionStorage.removeItem('step1');
      sessionStorage.removeItem('step2');
      sessionStorage.removeItem('step3');
      sessionStorage.removeItem('step4');
      this.router.navigate('[/successfulBooking]')
    }, function (data) {
      this.alertService.error(data);
    }).catch(function (err) {
      console.log(err);
    });
  };

  back() {
    if (this.step4 === 1) {
      this.step4 = 0;
      return;
    }
    this.router.navigate([ '/booking/step3' ]);
  };
}
