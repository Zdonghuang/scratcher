import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step4RoutingModule } from './step4-routing.module';
import { Step4Component } from './step4.component';
import { PageHeaderModule } from '../../../shared';
import { AppApi } from '../../../appApi';

@NgModule({
    imports: [CommonModule, Step4RoutingModule, PageHeaderModule],
    declarations: [Step4Component],
    providers: [
      AppApi
    ]
})
export class Step4Module {}
