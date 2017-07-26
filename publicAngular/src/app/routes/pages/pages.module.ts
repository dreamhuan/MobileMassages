import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from '../../layout/layout.module';
import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { ForgetpwdComponent } from './forgetpwd/forgetpwd.component';

@NgModule({
    imports: [
        SharedModule,
        LayoutModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        Error404Component,
        Error500Component,
        ForgetpwdComponent,
    ],
    exports: [
        RouterModule,
        LoginComponent,
        RegisterComponent,
        Error404Component,
        Error500Component,
    ]
})
export class PagesModule { }
