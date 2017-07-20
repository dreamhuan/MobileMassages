import { Injectable } from '@angular/core';
import { SystemService } from '../system/system.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookingService {

  constructor(private systemService: SystemService) { }

  booking(content): Promise<any> {
    let param = {
      userId: content.userId,
      therapists: content.therapists,
      date: content.date,
      time: content.time,
      style: content.style,
      massageLength: content.massageLength,
      address: content.address,
      creditCardNumber: content.creditCardNumber,
    };
    return this.systemService.post('web/booking/booking', param).toPromise();
  }
}
