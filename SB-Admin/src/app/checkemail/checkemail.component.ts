import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { Register } from '../register';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-checkemail',
    templateUrl: './checkemail.component.html',
    styleUrls: ['./checkemail.component.scss'],
    animations: [routerTransition()]
})
export class CheckemailComponent implements OnInit {
    text = '';
    box = false;
    showtext = false;
    show = true;
    email = localStorage.getItem('email');
    count = 5;
    send = true;
    sendtime = 10;
    constructor(public router: Router, public userService: UserService, public http: Register) {}

    ngOnInit() {
      this.checkemail();
    }
    // getuserinfo() {
    //   this.http.getuserinfo().subscribe((res: any) => {
    //     if (res.status === 'ok') {
    //       if (res.result.emailValid !== 0) {
    //         this.show = false;
    //         this.animation();
    //       } else {
    //         this.checkemail();
    //       }
    //     }
    //   });
    // }
    sendemail() {
      if (this.send) {
        this.send = false;
        const obj = {
          id: this.userService.getCurrentUser().id,
          email: localStorage.getItem('email'),
          source: 'ciot'
        };
        this.http.sendemail(obj).subscribe((res: any) => {
          if (res.status === 'ok') {
            this.text = 'Successful delivery';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1800);
          }
        });
        const sID = setInterval(() => {
          if (this.sendtime > 1) {
            this.sendtime--;
          } else {
            clearInterval(sID);
            this.send = true;
          }
        }, 1000);
      } else {
        this.text = 'Send failure, try again ten seconds later.';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 2000);
      }
    }

    checkemail() {
      if (this.router['rawUrlTree'].queryParams.key) {
        this.http.checkemail(this.router['rawUrlTree'].queryParams.key).subscribe((res: any) => {
          if (res.status === 'ok') {
            this.box = true;
            this.show = false;
            this.animation();
          } else if (res.result === 50004) {
            this.text = 'Links have expired';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 2000);
          }
        });
      } else {
        this.box = false;
        this.show = true;
      }
    }

    animation() {
      const intervalID = setInterval(() => {
        if (this.count > 1) {
          this.count--;
        } else if (this.userService.isLoggedIn) {
          this.router.navigate(['/layout']);
          clearInterval(intervalID);
        } else {
          this.userService.logout();
          clearInterval(intervalID);
        }
      }, 1000);
    }
}
