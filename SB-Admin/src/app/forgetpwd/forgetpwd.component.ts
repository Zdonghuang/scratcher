import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { Register } from '../register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.scss'],
  animations: [routerTransition()]
})
export class ForgetpwdComponent implements OnInit {
  user = {
    email: '',
    emailValid: 0,
    forum: 'e/c',
    mobile: '',
    password: '',
    source: 'leez',
    type: 'leez',
    username: '',
    code: '',
    gcode:''
  };
  email = '';
  password = '';
  showtext = false;
  text = '';
  showok = false;
  ok = '';
  next=true;
  vpicClientId;
  vpic;
  order="send email";
  issend=false;
  constructor(private translate: TranslateService, public http: Register, public router: Router) {
    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.changePic();
  }

  // https://api.ileapcloud.com/auth-center

  createGUID() {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}${s4()}`;
  }

  changePic() {
    if (this.next) {
      this.next = false;
      this.vpicClientId = this.createGUID();
      var seconds = Date.now();
      this.vpic =
        'https://api.ileapcloud.com/auth-center/v2/imagesecurity/securityimagebytes?clientid=' +
        this.vpicClientId +
        '&time=' +
        seconds;
      setTimeout(() => {
        this.next = true;
      }, 500);
    }
  }

  send() {
    if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.user.email)) {
      this.http.emailIdentityCode('ciot', this.user.email).subscribe((res: any) => {
        if (res.status == 'ok') {
          this.issend = true;
          this.order = 'send successfully';
          setTimeout(() => {
            this.issend = false;
            this.order = 'send code';
          }, 9000000);
        } else {
          switch (res.result) {
            case 10028:
              this.text = 'The mailbox verification code is incorrect';
              this.showtext = true;
              break;
            case 10029:
              this.text = 'Missing parameters related to mailbox verification code';
              this.showtext = true;
              break;
            case 10030:
              this.text = 'The mailbox verification code is incorrect';
              this.showtext = true;
              break;
            case 50010:
              this.text = 'Verify that mail has been sent';
              this.showtext = true;
              break;
            case 50011:
              this.text = 'Mailbox cannot be empty';
              this.showtext = true;
              break;
            case 50012:
              this.text = 'Illegal mailbox format';
              this.showtext = true;
              break;
            case 50013:
              this.text = 'Mailbox has been subscribed';
              this.showtext = true;
              break;
            case 50014:
              this.text = 'Verification Code Mail Delivery Failed';
              this.showtext = true;
              break;
            case 50015:
              this.text = 'Verification code is only allowed once in 1 minute';
              this.showtext = true;
              break;
            default:
              this.text = 'unknown error';
              this.showtext = true;
          }
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1800);
        }
      });
    } else {
      this.showtext = true;
      this.text = 'Mailbox does not conform to the rules';
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1800);
    }
  }

  reset() {
    if (this.user.gcode && this.user.code && this.user.email && this.user.password && this.password) {
      if (this.user.code.length < 4) {
        this.showtext = true;
        this.text = 'code does not conform to the rules!';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      } else if (this.user.gcode.length<1) {
        this.showtext = true;
        this.text = 'pic code does not conform to the rules!';
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
      } else if (!/^(?![A-Za-z]+$)(?![a-z_]+$)(?![A-Z_]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![0-9_]+$)(?![\d\W]+$)\S{8,20}$/.test(this.password)) {
        this.showtext = true;
        this.text = 'No less than 8 bits and no more than 20 bits in length, including at least 3 types of numbers, letters, lowercase and symbols, and the use of commonly used passwords is prohibited.!';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      } else {
        var info = {
          clientId: this.vpicClientId,
          emailIdentityCode: this.user.code,
          graphIdentityCode: this.user.gcode,
          newPwd: this.password,
          userInfo: this.user.email
        };
        this.http.resetPwd(info).subscribe((res: any) => {
          if (res.status === 'ok') {
            this.showok = true;
            this.ok = 'Reset password successfully';
            setTimeout(() => {
              this.showok = false;
              this.ok = '';
              this.router.navigate(['/login']);
            }, 1800);
          } else {
            this.changePic();
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
                this.text = 'User names can only be alphanumeric and underscored, not more than 30 characters';
                this.showtext = true;
                break;
              case 10006:
                this.text = 'Incorrect mailbox';
                this.showtext = true;
                break;
              case 10007:
                this.text = 'Users have no privileges';
                this.showtext = true;
                break;
              case 10008:
                this.text = 'Verification code is empty';
                this.showtext = true;
                break;
              case 10013:
                this.text = 'IO error';
                this.showtext = true;
                break;
              case 10014:
                this.text = 'Graphic Verification Code incorrect';
                this.showtext = true;
                break;
              case 10018:
                this.text = 'unknown error';
                this.showtext = true;
                break;
              case 10021:
                this.text = 'Loss of relevant parameters of graphic verification code';
                this.showtext = true;
                break;
              case 10027:
                this.text =
                  'No less than 8 bits and no more than 20 bits in length, including at least 3 types of numbers, letters, lowercase and symbols, and the use of commonly used passwords is prohibited.';
                this.showtext = true;
                break;
              case 10028:
                this.text = 'The mailbox verification code is incorrect';
                this.showtext = true;
                break;
              case 10029:
                this.text = 'Missing parameters related to mailbox verification code';
                this.showtext = true;
                break;
              case 10030:
                this.text = 'The mailbox verification code is incorrect';
                this.showtext = true;
                break;
              default:
                this.text = 'unknown error';
                this.showtext = true;
            }
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1800);
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
