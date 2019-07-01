import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SettingsApi } from '../../../settings';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    animations: [routerTransition()]
})
export class DetailsComponent implements OnInit {
    key = sessionStorage.getItem('key');
    aService = {
      id: null,
      uid: null,
      serviceKey: '',
      payload: {
        smtpHost : '',
        smtpPWD : '',
        subject : '',
        smtpUserName : '',
        use : '',
        smtpPort : ''
       }
     };
     showtext = false;
     text = '';
    constructor(public http: SettingsApi, public router: Router, public user: UserService) {}

    ngOnInit() {
      if (this.user.isLoggedIn()) {
        this.getAservice();
      }
      this.isPC();
      window.addEventListener('resize', () => {
        this.isPC();
      });
    }
    goback() {
      this.router.navigate(['/layout/settings/settings-list']);
    }
    getAservice() {
      if (this.key) {
        this.http.getAsetting(this.key).subscribe((res: any) => {
          if (res.status === 'OK' && res.result && res.result.payload.use !== 'user') {
            this.aService = res.result;
          } else {
            this.aService.payload = {
              smtpHost : '',
              smtpPWD : '',
              subject : '',
              smtpUserName : '',
              use : '',
              smtpPort : ''
             };
          }
        });
      }
    }
    setAsetting() {
      if (this.aService.payload.smtpHost && this.aService.payload.subject &&
        this.aService.payload.smtpPWD && this.aService.payload.smtpUserName &&
        this.aService.payload.smtpPort) {
        this.aService.payload.use = 'xxx';
        this.http.setAsetting(this.key, this.aService.payload).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.getAservice();
            this.showtext = true;
            this.text = 'Successful operation';
            setTimeout(() => {
              this.showtext = false;
              this.text = '';
            }, 1800);
          }
        });
      }
    }
    reset() {
      if (this.aService.payload.smtpHost && this.aService.payload.subject &&
          this.aService.payload.smtpPWD && this.aService.payload.smtpUserName &&
          this.aService.payload.smtpPort) {
          this.aService.payload.use = 'user';
          this.http.setAsetting(this.key, this.aService.payload).subscribe((res: any) => {
            if (res.status === 'OK') {
              this.getAservice();
              this.showtext = true;
              this.text = 'Successful operation';
              setTimeout(() => {
                this.showtext = false;
                this.text = '';
              }, 1800);
            }
          });
        }
    }
    isPC() {
      const userAgentInfo = navigator.userAgent;
      const Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
      const input = document.getElementsByClassName('fr');
      for (let i = 0; i < input.length; i++) {
        const m = input[i] as HTMLInputElement;
        m.style.width = '50%';
      }
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          for (let i = 0; i < input.length; i++) {
            const m = input[i] as HTMLInputElement;
            m.style.width = '30%';
          }
          break;
        }
      }
    }
}

