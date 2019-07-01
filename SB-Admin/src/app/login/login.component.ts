import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';

import { UserService } from '../shared/services/user.service';
import { Register } from '../register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  busy = false;
  logindatas;
  src;
  showtext = false;
  text = '';
  constructor(public userService: UserService, public email: Register, private translate: TranslateService, public router: Router) {
      this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
      this.translate.setDefaultLang('en');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'zh-CHS');
      this.logindatas = {
        username: '',
        forum: 'e/c',
        password: '',
        source: 'leez',
      };
  }
  ngOnInit() {
  }
  onLoggedin() {
    if (this.logindatas.username === '') {
      this.text = 'Please enter the user name!';
      this.showtext = true;
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1500);
    } else if (this.logindatas.password === '') {
      this.text = 'Please input a password!';
      this.showtext = true;
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1500);
    } else {
      this.busy = true;
      this.userService.login(this.logindatas.username, this.logindatas.password).subscribe(data => {
        this.busy = false;

        this.userService.getUserInfo().subscribe(info => {
          localStorage.setItem('loginTime', `${new Date().getTime()}`);

          if (info.emailValid === 0) {
            const obj = {
              id: info.id,
              email: info.email,
              source: 'ciot'
            };
            this.email.sendemail(obj).subscribe((r: any) => {
              if (r.status === 'ok') {
                this.text = 'Successful delivery';
                this.showtext = true;
                setTimeout(() => {
                  this.text = '';
                  this.showtext = false;
                }, 1800);
              }
            });
            this.router.navigate(['/checkemail']);
          } else {
            this.router.navigate(['/layout']);
          }
        });
      }, error => {
        switch (Number(error.result)) {
          case 10010:
            this.text = 'Please try again in 10 minutes';
            this.showtext = true;
            break;
          case 10011:
            this.text = 'user does not exist';
            this.showtext = true;
            break;
          case 10022:
            this.text = 'Username or password incorrect';
            this.showtext = true;
            break;
          case 10014:
            this.text = 'Picture Verification Code incorrect';
            this.showtext = true;
            break;
          default:
            this.text = 'Login failed';
            this.showtext = true;
        }
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1500);
      });
    }
  }
}

