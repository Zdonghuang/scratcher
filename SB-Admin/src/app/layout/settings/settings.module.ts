import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PageHeaderModule } from '../../shared';
import { SettingsApi } from '../../settings';

@NgModule({
    imports: [CommonModule, SettingsRoutingModule, PageHeaderModule],
    declarations: [SettingsComponent],
    providers: [SettingsApi]
})
export class SettingsModule {}
