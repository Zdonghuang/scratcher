import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckemailRoutingModule } from './checkemail-routing.module';
import { CheckemailComponent } from './checkemail.component';
import { PageHeaderModule } from '../shared';
import { Register } from '../register';

@NgModule({
    imports: [CommonModule, CheckemailRoutingModule, PageHeaderModule],
    declarations: [CheckemailComponent],
    providers: [Register]
})
export class CheckemailModule {}
