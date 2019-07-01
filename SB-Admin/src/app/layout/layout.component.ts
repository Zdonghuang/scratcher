import { Component, OnInit } from '@angular/core';
import { Register } from '../register';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    collapedSideBar: boolean;

    constructor(public http: Register, public router: Router, public userService: UserService) {}

    ngOnInit() {
      if (this.userService.isLoggedIn()) {
        this.http.getuserinfo().subscribe((res: any) => {
          if (res.status === 'ok' && res.result.emailValid === 0) {
            this.userService.logout();
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
