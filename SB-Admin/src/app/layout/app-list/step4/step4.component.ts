import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppApi } from '../../../appApi';
import {UserService} from '../../../shared/services/user.service';

@Component({
    selector: 'app-list-step4',
    templateUrl: './step4.component.html',
    styleUrls: ['../step1/step1.component.scss'],
    animations: [routerTransition()]
})
export class Step4Component implements OnInit {
  leap = localStorage.getItem('url');
  showtext = false;
  text = '';
  appinfo = {
    image : '',
    version: '',
    bundleId: '',
    appName: '',
    description: '',
    appId: '',
    appUrl: '',
    category: '',
    customDeveloper: '',
    step: 0,
    state: 2,
    id: 0
  };
  step3right = true;
    constructor(public router: Router, public user: UserService, public http: AppApi) {}

    ngOnInit() {
      if (this.user.isLoggedIn()) {
        if (localStorage.getItem('upappid') || localStorage.getItem('appid')) {
          const id = localStorage.getItem('upappid') ? localStorage.getItem('upappid') : localStorage.getItem('appid');
          this.showAppinfo(id);
        } else {
          this.router.navigate(['/layout/app-list/myapp']);
        }
        window.addEventListener('resize', () => {
          this.step3right = this.isPC();
        });
        this.step3right = this.isPC();
      }
    }

    isPC() {
      if (this.router.url.indexOf('/layout/app-list/step2') > -1) {
        const userAgentInfo = navigator.userAgent;
        const Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
        const step3 = document.getElementsByClassName('step3left')[0] as HTMLStyleElement;
        let flag = true;
        step3.style.width = '50%';
        step3.style.borderRight = '1px dashed #666';
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            step3.style.width = '98%';
            step3.style.borderRight = 'none';
            flag = false;
            break;
          }
        }
        return flag;
      }
    }

    showAppinfo(id) {
      this.http.getAppInfo(id)
      .subscribe((res: any) => {
        this.appinfo.appId = res.result.appId;
        this.appinfo.appName = res.result.appname;
        this.appinfo.category = res.result.category;
        this.appinfo.customDeveloper = res.result.customDeveloper;
        this.appinfo.bundleId = res.result.bundleId;
        this.appinfo.appUrl = res.result.appUrl;
        this.appinfo.version = res.result.version;
        this.appinfo.description = res.result.description;
        this.appinfo.step = res.result.step;
        this.appinfo.state = res.result.state;
        this.appinfo.id = res.result.id;
        this.appinfo.image = res.result.image ? `https://www.ileapcloud.com/images/${res.result.image}` : res.result.image;
      });
    }

    gomyapp() {
      this.router.navigate(['/layout/app-list/myapp']);
    }

    undoMyApp(con) {
      if (confirm(`Are you sure you want to withdraw the  ${con.appName} app?`)) {
        this.http.undoMyApp(con.id).subscribe((res: any) => {
          if (res.status === 'ok') {
            this.text = 'Successful operation';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
            this.showtext = false;
            }, 1800);
            this.router.navigate(['/layout/app-list/myapp']);
          }
        });
      }
    }

    gostep1(id) {
      localStorage.setItem('appid', id);
      localStorage.removeItem('upgrade');
      this.router.navigate(['/layout/app-list/step1']);
    }
}
