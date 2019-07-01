import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { PageHeaderModule } from '../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { UserInfo } from '../../userinfo';
@NgModule({
  imports: [CommonModule, Ng2Charts, InfoRoutingModule, PageHeaderModule, FormsModule],
  declarations: [InfoComponent],
  providers: [UserInfo]
})
export class InfoModule {}
