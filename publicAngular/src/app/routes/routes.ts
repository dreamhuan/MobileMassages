import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { TestComponent } from '../test/test.component';


export const routes = [

  // Not lazy-loaded routes
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Not found
  { path: '**', redirectTo: '404' }

];
