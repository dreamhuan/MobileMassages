import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './routes/pages/error404/error404.component';
import { Error500Component } from './routes/pages/error500/error500.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [

  { path: 'test', component: TestComponent },
  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },
  // Not found
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
