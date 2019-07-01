import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Security } from '../../security';

@Component({
    selector: 'app-certificate',
    templateUrl: './certificate.component.html',
    styleUrls: ['./certificate.component.scss'],
    animations: [routerTransition()]
})
export class CertificateComponent implements OnInit {
  list;
    constructor(public http: Security) {}

    ngOnInit() {
    }
}
