import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { Register } from '../register';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    user = {
      email: '',
      emailValid: 0,
      forum: 'e/c',
      mobile: '',
      password: '',
      source: 'leez',
      type: 'leez',
      username: ''
    };
    password = '';
    showtext = false;
    text = '';
    constructor(private translate: TranslateService, public http: Register, public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() {}

    register() {
      if (this.user.username && this.user.email && this.user.password && this.password) {
        if (this.user.username.length < 4 || this.user.username.length > 20) {
          this.showtext = true;
          this.text = 'User name does not conform to the rules!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        } else if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.user.email)) {
          this.showtext = true;
          this.text = 'Please enter the correct mailbox!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        } else if (this.user.password !== this.password) {
          this.showtext = true;
          this.text = 'Two passwords are inconsistent, please re-enter!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        } else if (this.password.length < 8) {
          this.showtext = true;
          this.text = 'Minimum password length of 8 bits!';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        } else {
          this.http.register(this.user).subscribe((res: any) => {
            if (res.status === 'ok') {

              this.http.getuserinfo().subscribe((data: any) => {
                if (data.status === 'ok') {
                  const obj = {
                    email: data.result.email,
                    id: data.result.id,
                    source: 'ciot'
                  };

                  this.http.sendemail(obj).subscribe((da: any) => {
                    if (da.status === 'ok') {
                      this.router.navigate(['/checkemail']);
                    }
                  });
                }
              });
            } else {
              switch (res.result) {
                case 10001:
                  this.text = 'User name already exists';
                  this.showtext = true;
                  break;
                case 10003:
                  this.text = 'Mailbox already exists';
                  this.showtext = true;
                  break;
                case 10004:
                  this.text = 'User names can only be Chinese, letters, numbers and underscores, not more than 30 characters (one Chinese represents two characters)';
                  this.showtext = true;
                  break;
                case 10006:
                  this.text = 'Incorrect mailbox';
                  this.showtext = true;
                  break;
                case 10027:
                  this.text = '4-20 character, including at least three types, capital letters, lowercase letters and symbols, and prohibiting the use of commonly used passwords';
                  this.showtext = true;
                  break;
              }
              setTimeout(() => {
                this.text = '';
                this.showtext = false;
              }, 2000);
            }
          });
        }
      } else {
        this.showtext = true;
        this.text = 'Please complete each item!';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      }
    }
}
