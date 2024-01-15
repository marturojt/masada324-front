import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterLink } from '@angular/router';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { AccountVerifyEmailComponent } from './account-verify-email/account-verify-email.component';
import { AccountLoginComponent } from './account-login/account-login.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        RouterLink
    ],
    declarations: [
        LayoutComponent,
        AccountLoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        AccountRegisterComponent,
        AccountVerifyEmailComponent
    ]
})
export class AccountModule { }
