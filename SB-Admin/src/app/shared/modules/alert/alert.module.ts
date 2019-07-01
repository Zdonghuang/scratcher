import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService } from './services/alert.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [AlertComponent],
  providers: [AlertService]
})
export class AlertModule { }
