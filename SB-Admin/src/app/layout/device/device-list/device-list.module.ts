import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceListRoutingModule } from './device-list-routing.module';
import { DeviceListComponent } from './device-list.component';
import { PageHeaderModule } from '../../../shared';
import { DeviceApi } from '../../../device';

@NgModule({
    imports: [CommonModule, DeviceListRoutingModule, PageHeaderModule],
    declarations: [DeviceListComponent],
    providers: [
      DeviceApi
    ]
})
export class DeviceListModule {}
