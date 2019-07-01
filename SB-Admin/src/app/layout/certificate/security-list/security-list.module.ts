import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityListRoutingModule } from './security-list-routing.module';
import { SecurityListComponent } from './security-list.component';
import { PageHeaderModule } from '../../../shared';
import { Security } from '../../../security';

@NgModule({
    imports: [CommonModule, SecurityListRoutingModule, PageHeaderModule],
    declarations: [SecurityListComponent],
    providers: [Security]
})
export class SecurityListModule {}
