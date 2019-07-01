import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step3RoutingModule } from './step3-routing.module';
import { Step3Component } from './step3.component';
import { PageHeaderModule } from '../../../shared';
import { AppApi } from '../../../appApi';

@NgModule({
    imports: [CommonModule, Step3RoutingModule, PageHeaderModule],
    declarations: [Step3Component],
    providers: [
      AppApi
    ]
})
export class Step3Module {}
