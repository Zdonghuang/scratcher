import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SettingsApi } from '../../settings';
import { Router } from '@angular/router';
import {UserService} from '../../shared/services/user.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    animations: [routerTransition()]
})
export class SettingsComponent implements OnInit {
    settinglist = [];
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
    key = '';
    emailBox = false;
    constructor(public http: SettingsApi, public router: Router, public user: UserService) {}

    ngOnInit() {
      if (this.user.isLoggedIn()) {
        this.getSettingList();
      }
    }
    getAservice() {
      this.router.navigate(['/layout/settings/details']);
      if (this.key) {
        this.http.getAsetting(this.key).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.aService = res.result;
            this.emailBox = true;
          }
        });
      }
    }
    setAsetting() {
      if (this.aService.payload.smtpHost && this.aService.payload.subject &&
        this.aService.payload.smtpPWD && this.aService.payload.smtpUserName &&
        this.aService.payload.use && this.aService.payload.smtpPort) {
        this.http.setAsetting(this.key, this.aService.payload).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.emailBox = false;
          }
        });
      }
    }
    getSettingList() {
      this.http.getSttingList().subscribe((res: any) => {
        if (res.status === 'OK') {
          this.settinglist = res.result;
        }
      });
    }
}
