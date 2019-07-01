import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { Security } from '../../../security';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-security-list',
    templateUrl: './security-list.component.html',
    styleUrls: ['./security-list.component.scss'],
    animations: [routerTransition()]
})
export class SecurityListComponent implements OnInit {
  list;
    constructor(public http: Security, public router: Router, public userService: UserService) {}

    ngOnInit() {
      if (this.userService.isLoggedIn()) {
        this.getcertlit();
      } else {
        this.userService.logout();
      }
    }
    getcertlit() {
      this.http.getcertlist().subscribe((res: any) => {
        this.list = res;
      });
    }
    todetail(con) {
      sessionStorage.setItem('security', con);
      this.router.navigate(['/layout/security/details']);
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
