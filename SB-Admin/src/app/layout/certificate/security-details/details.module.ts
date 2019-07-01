import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { PageHeaderModule } from '../../../shared';
import { Security } from '../../../security';

@NgModule({
    imports: [CommonModule, DetailsRoutingModule, PageHeaderModule],
    declarations: [DetailsComponent],
    providers: [Security]
})
export class DetailsModule {}
