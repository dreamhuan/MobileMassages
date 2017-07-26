import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { routes } from './routes';
import { PagesModule } from './pages/pages.module';
import { HomeModule } from './home/home.module';
import { BookingModule } from './booking/booking.module';
import { ContactusModule } from './contactus/contactus.module';
import { FaqModule } from './faq/faq.module';
import { PricingModule } from './pricing/pricing.module';
import { StylesModule } from './styles/styles.module';
import { TherapistModule } from './therapist/therapist.module';
import { SuccessfulBookingComponent } from './successful-booking/successful-booking.component';
import { AdministrationComponent } from './administration/administration.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    BookingModule,
    ContactusModule,
    FaqModule,
    HomeModule,
    PagesModule,
    PricingModule,
    StylesModule,
    TherapistModule
  ],
  declarations: [SuccessfulBookingComponent, AdministrationComponent],
  exports: [
    RouterModule
  ]
})

export class AppRoutesModule {
}
