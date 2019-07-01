import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Security } from '../../../security';
import {UserService} from '../../../shared/services/user.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    animations: [routerTransition()]
})
export class DetailsComponent implements OnInit {
    key = sessionStorage.getItem('security');
    data = {
      notAfter: '',
      notBefore: ''
    };
    constructor(public http: Security, public router: Router, public user: UserService) {
      if (!this.key) {
        this.key = '';
      }
    }

    ngOnInit() {
      if (this.user.isLoggedIn() && this.key) {
        this.getcertlit();
      } else {
        this.router.navigate(['/layout/security/security-list']);
      }
    }
    getcertlit() {
      this.http.getacert(this.key).subscribe((res: any) => {
        this.data = res;
      });
    }
    tosecuritylist() {
      this.router.navigate(['/layout/security/security-list']);
    }
    delete(name) {
      if (confirm('Are you sure you want to delete it?')) {
        this.http.delcertlist(name).subscribe((res: any) => {
          if (res) {
            this.getcertlit();
          }
        });
      }
    }
}
