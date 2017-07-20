import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { routes } from './routes';
import { PagesModule } from './pages/pages.module';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true }),
    PagesModule,
    HomeModule
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})

export class AppRoutesModule {
}
