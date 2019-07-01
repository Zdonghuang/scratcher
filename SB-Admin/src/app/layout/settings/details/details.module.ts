import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { PageHeaderModule } from '../../../shared';
import { SettingsApi } from '../../../settings';

@NgModule({
    imports: [CommonModule, DetailsRoutingModule, PageHeaderModule],
    declarations: [DetailsComponent],
    providers: [SettingsApi]
})
export class DetailsModule {}
