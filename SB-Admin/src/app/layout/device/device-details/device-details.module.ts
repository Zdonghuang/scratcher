import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceDetailsRoutingModule } from './device-details-routing.module';
import { DeviceDetailsComponent } from './device-details.component';
import { PageHeaderModule } from '../../../shared';
import { DeviceApi } from '../../../device';

@NgModule({
    imports: [CommonModule, DeviceDetailsRoutingModule, PageHeaderModule],
    declarations: [DeviceDetailsComponent],
    providers: [
      DeviceApi
    ]
})
export class DeviceDetailsModule {}
