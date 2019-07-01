import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppListRoutingModule } from './app-list-routing.module';
import { AppListComponent } from './app-list.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, AppListRoutingModule, PageHeaderModule],
    declarations: [AppListComponent]
})
export class AppListModule {}
