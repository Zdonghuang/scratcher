import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, CommonModule, DeviceRoutingModule, PageHeaderModule],
  declarations: [DeviceComponent]
})
export class DeviceModule {}
