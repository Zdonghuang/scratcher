import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsListRoutingModule } from './settings-list-routing.module';
import { SettingsListComponent } from './settings-list.component';
import { PageHeaderModule } from '../../../shared';
import { SettingsApi } from '../../../settings';

@NgModule({
    imports: [CommonModule, SettingsListRoutingModule, PageHeaderModule],
    declarations: [SettingsListComponent],
    providers: [SettingsApi]
})
export class SettingsListModule {}
