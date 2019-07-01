import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyappRoutingModule } from './myapp-routing.module';
import { MyappComponent } from './myapp.component';
import { PageHeaderModule } from '../../../shared';
import { AppApi } from '../../../appApi';

@NgModule({
    imports: [CommonModule, MyappRoutingModule, PageHeaderModule],
    declarations: [MyappComponent],
    providers: [
      AppApi
    ]
})
export class MyappModule {}
