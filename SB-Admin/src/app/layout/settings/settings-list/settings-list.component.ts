import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SettingsApi } from '../../../settings';
import { Router } from '@angular/router';
import {UserService} from '../../../shared/services/user.service';

@Component({
    selector: 'app-settings-list',
    templateUrl: './settings-list.component.html',
    styleUrls: ['./settings-list.component.scss'],
    animations: [routerTransition()]
})
export class SettingsListComponent implements OnInit {
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
    showAPK = false;
    APKversion;
    APKFlie;
    constructor(public http: SettingsApi, public router: Router, public user: UserService) {}

    ngOnInit() {
      if (this.user.isLoggedIn()) {
        this.getSettingList();
      }
    }
    getAservice(con) {
      sessionStorage.setItem('key', con.service);
      this.router.navigate([`/layout/settings/details`]);
    }
    getSettingList() {
      this.http.getSttingList().subscribe((res: any) => {
        if (res.status === 'OK') {
          this.settinglist = res.result;
        }
      });
    }
    uploadfile(e) {
      if (e.files[0].name.indexOf('.apk') !== -1) {
        this.APKFlie = e.files[0];
      }
    }
    uploadAPK() {
      if (this.APKFlie && this.APKversion) {
        const formData = new FormData();
        formData.append('file', this.APKFlie);
        this.http.uploadAPK(this.APKversion, formData).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.showAPK = false;
          }
        });
      }
    }
}
