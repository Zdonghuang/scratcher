import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceEditRoutingModule } from './device-edit-routing.module';
import { DeviceEditComponent } from './device-edit.component';
import { PageHeaderModule } from '../../../shared';
import { DeviceApi } from '../../../device';

@NgModule({
    imports: [CommonModule, DeviceEditRoutingModule, PageHeaderModule],
    declarations: [DeviceEditComponent],
    providers: [
      DeviceApi
    ]
})
export class DeviceEditModule {}
