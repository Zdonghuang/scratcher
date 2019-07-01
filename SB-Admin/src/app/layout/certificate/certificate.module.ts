import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { CertificateComponent } from './certificate.component';
import { PageHeaderModule } from '../../shared';
import { Security } from '../../security';

@NgModule({
    imports: [CommonModule, CertificateRoutingModule, PageHeaderModule],
    declarations: [CertificateComponent],
    providers: [Security]
})
export class CertificateModule {}
