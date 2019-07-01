import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step2RoutingModule } from './step2-routing.module';
import { Step2Component } from './step2.component';
import { PageHeaderModule } from '../../../shared';
import { AppApi } from '../../../appApi';

@NgModule({
    imports: [CommonModule, Step2RoutingModule, PageHeaderModule],
    declarations: [Step2Component],
    providers: [
      AppApi
    ]
})
export class Step2Module {}
