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

export const routes = [

  // { path: '', redirectTo: 'test', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component:HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'therapist', component: TherapistComponent },
      { path: 'styles', component: StylesComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contactus', component: ContactusComponent },
    ]
  }

];
