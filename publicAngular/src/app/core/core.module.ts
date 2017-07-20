import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SystemService } from './system/system.service';
import { AlertService } from './alert/alert.service';
import { BookingService } from './booking/booking.service';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    HttpModule,
  ],
  declarations: [],
  providers: [
    SystemService,
    AlertService,
    BookingService,
    UserService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
