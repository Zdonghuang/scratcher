import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LogIn } from '../loginfo';
import { Register } from '../register';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule],
    declarations: [LoginComponent],
    providers: [
      LogIn,
      Register
    ]
})
export class LoginModule {}
