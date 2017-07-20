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

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BookingModule,
    ContactusModule,
    FaqModule,
    HomeModule,
    PagesModule,
    PricingModule,
    StylesModule,
    TherapistModule
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})

export class AppRoutesModule {
}
