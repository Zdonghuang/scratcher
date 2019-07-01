import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { UserInfo } from '../../userinfo';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: [routerTransition()]
})
export class InfoComponent implements OnInit {
  username = '';
  email = '';
  show = 0;
  infoEmail = '';
  infoPwd = '';
  currentPwd = '';
  newPwd = '';
  confirmPwd = '';
  emailinfo = 0;
  pwdinfo = 0;
  showtext = false;
  showSuccess = false;
  text = '';
  text2 = '';
  error=0;

  constructor(public router: Router, public userService: UserService, public http: UserInfo) {}

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.username = this.userService.getCurrentUser().username;
      this.email = this.userService.getCurrentUser().email;
      this.infoEmail = this.userService.getCurrentUser().email;
    }
  }

  showChange(n) {
    this.show = n;
  }

  watchEmail() {
    this.infoEmail != '' && this.email != this.infoEmail ? (this.emailinfo = 1) : (this.emailinfo = 0);
  }

  watchPwd() {
    // if (this.currentPwd != '' && this.newPwd != '' && this.confirmPwd != '' && this.confirmPwd == this.newPwd) {
    if (this.currentPwd != '' && this.newPwd != '' && this.confirmPwd != '') {
      this.pwdinfo = 1;
    } else {
      this.pwdinfo = 0;
    }
  }

  changePwd() {  
    if (this.confirmPwd == this.newPwd && /^(?![A-Za-z]+$)(?![a-z_]+$)(?![A-Z_]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![0-9_]+$)(?![\d\W]+$)\S{8,20}$/.test(this.newPwd)) {
      const json = {
        newPwd: this.newPwd,
        oldPwd: this.currentPwd
      };
      this.http.updatePwd(json).subscribe((res: any) => {
        if (res.status == 'ok') {
          this.text = 'change password successfully';
          this.text2 = 'Please re-login!';
          this.showSuccess = true;
          setTimeout(() => {
            this.text = '';
            this.text2 = '';
            this.showSuccess = false;
            this.onLoggedout();
          }, 1800);
        }else{
          switch (res.result) {
            case 10012:
              this.text = 'Incorrect username and password';
              this.showtext = true;
              break;
            case 10019:
              this.text = 'Primitive password error';
              this.showtext = true;
              break;
            case 10018:
              this.text = 'unknown error';
              this.showtext = true;
              break;
            case 10027:
              this.text =
                'No less than 8 bits and no more than 20 bits in length, including at least 3 types of numbers, letters, lowercase and symbols, and the use of commonly used passwords is prohibited.';
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
      if (this.confirmPwd != this.newPwd) {
        this.text = 'The new password is different from the confirmation password';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1800);
      } else {
        this.showtext = true;
        this.text =
          'No less than 8 bits and no more than 20 bits in length, including at least 3 types of numbers, letters, lowercase and symbols, and the use of commonly used passwords is prohibited.';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      }
    }
  }

  changeEmail(){
    if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.infoEmail)) {
      this.http.updateEmail(this.infoEmail).subscribe((res: any) => {
        if (res.status == 'ok') {
          this.text = 'change email successfully';
          this.text2 = 'Please re-login!';
          this.showSuccess = true;
          setTimeout(() => {
            this.text = '';
            this.text2 = '';
            this.showSuccess = false;
            this.onLoggedout();
          }, 1800);
        }else{
          switch (res.result) {
            case 10006:
              this.text = 'Incorrect mailbox';
              this.showtext = true;
              break;
            case 10012:
              this.text = 'Incorrect username and password';
              this.showtext = true;
              break;
            case 10019:
              this.text = 'Primitive password error';
              this.showtext = true;
              break;
            case 10018:
              this.text = 'unknown error';
              this.showtext = true;
              break;
            case 10027:
              this.text =
                'No less than 8 bits and no more than 20 bits in length, including at least 3 types of numbers, letters, lowercase and symbols, and the use of commonly used passwords is prohibited.';
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
    }else{
      this.showtext = true;
      this.text = 'Mailbox does not conform to the rules';
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1800);
    }
  }

  onLoggedout() {
    this.userService.logout();
  }
}
