import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDeviceRoutingModule } from './add-device-routing.module';
import { AddDeviceComponent } from './add-device.component';
import { PageHeaderModule } from '../../../shared';
import { AppApi } from '../../../appApi';
import { DeviceApi } from '../../../device';

@NgModule({
    imports: [CommonModule, AddDeviceRoutingModule, PageHeaderModule],
    declarations: [AddDeviceComponent],
    providers: [
      AppApi,
      DeviceApi
    ]
})
export class AddDeviceModule {}
