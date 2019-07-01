import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step1RoutingModule } from './step1-routing.module';
import { Step1Component } from './step1.component';
import { PageHeaderModule } from '../../../shared';
import { AppApi } from '../../../appApi';

@NgModule({
    imports: [CommonModule, Step1RoutingModule, PageHeaderModule],
    declarations: [Step1Component],
    providers: [
      AppApi
    ]
})
export class Step1Module {}
