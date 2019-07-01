import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceSearchRoutingModule } from './device-search-routing.module';
import { DeviceSearchComponent } from './device-search.component';
import { PageHeaderModule } from '../../../shared';
import { DeviceApi } from '../../../device';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, CommonModule, DeviceSearchRoutingModule, PageHeaderModule],
  declarations: [DeviceSearchComponent],
  providers: [DeviceApi]
})
export class DeviceSearchModule {}
