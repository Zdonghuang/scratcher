import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDeviceRoutingModule } from './todevice-routing.module';
import { ToDeviceComponent } from './todevice.component';
import { PageHeaderModule } from '../../../shared';
import { AppApi } from '../../../appApi';
import { DeviceApi } from '../../../device';
import { WorkflowService } from '../../../shared/services/workflow.service';

@NgModule({
    imports: [CommonModule, ToDeviceRoutingModule, PageHeaderModule, FormsModule],
    declarations: [ToDeviceComponent],
    providers: [
      AppApi,
      DeviceApi,
      WorkflowService
    ]
})
export class ToDeviceModule {}
