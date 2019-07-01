import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PageHeaderModule } from '../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { AppApi } from '../../appApi';
import { DeviceApi } from '../../device';
@NgModule({
    imports: [CommonModule, Ng2Charts, HomeRoutingModule, PageHeaderModule],
    declarations: [HomeComponent],
    providers: [
      DeviceApi,
      AppApi
    ]
})
export class HomeModule {}
