import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { TherapistComponent } from './therapist/therapist.component';
import { StylesComponent } from './styles/styles.component';
import { PricingComponent } from './pricing/pricing.component';
import { FaqComponent } from './faq/faq.component';
import { ContactusComponent } from './contactus/contactus.component';
import { Step1Component } from './booking/step1/step1.component';
import { Step2Component } from './booking/step2/step2.component';
import { Step3Component } from './booking/step3/step3.component';
import { Step4Component } from './booking/step4/step4.component';

export const routes = [

  // { path: '', redirectTo: 'test', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'booking',
        component: BookingComponent,
        children: [
          { path: '', redirectTo: 'step1', pathMatch: 'full' },
          { path: 'step1', component: Step1Component },
          { path: 'step2', component: Step2Component },
          { path: 'step3', component: Step3Component },
          { path: 'step4', component: Step4Component },
        ]
      },
      { path: 'therapist', component: TherapistComponent },
      { path: 'styles', component: StylesComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contactus', component: ContactusComponent },
    ]
  }

];
