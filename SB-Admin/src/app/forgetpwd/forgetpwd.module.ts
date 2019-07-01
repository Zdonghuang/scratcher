import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ForgetpwdRoutingModule } from './forgetpwd-routing.module';
import { ForgetpwdComponent } from './forgetpwd.component';
import { Register } from '../register';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, ForgetpwdRoutingModule, FormsModule],
  declarations: [ForgetpwdComponent],
  providers: [Register]
})
export class ForgetpwdModule {}
