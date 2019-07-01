import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppApi } from '../../../appApi';
import {UserService} from '../../../shared/services/user.service';

@Component({
    selector: 'app-list-step1',
    templateUrl: './step1.component.html',
    styleUrls: ['./step1.component.scss'],
    animations: [routerTransition()]
})
export class Step1Component implements OnInit {
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
    category: 'scratcher',
    customDeveloper: '',
    step: 0,
    id: 0
  };
  disabled = '';
  tipsversion = '';
  tipsbundleId = '';
  step1right = true;
  newversion;
    constructor(public router: Router, public user: UserService, public http: AppApi) {}

    ngOnInit() {
      if (this.user.isLoggedIn()) {
        if (localStorage.getItem('upappid') || localStorage.getItem('appid')) {
          const id = localStorage.getItem('upappid') ? localStorage.getItem('upappid') : localStorage.getItem('appid');
          this.showAppinfo(id);
        }
        this.step1right = this.isPC();
        window.addEventListener('resize', () => {
          this.step1right = this.isPC();
        });
      }
    }

    upImage(e) {
      if (e.target.files[0].type.indexOf('image') < 0) {
        this.showtext = true;
        this.text = 'File format is not allowed';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1000);
      } else if (e.target.files[0].size > 1048576) {
        this.showtext = true;
        this.text = 'Upload picture size should not exceed one MB';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1000);
      } else {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        this.http.uploadImage(formData)
        .subscribe((res: any) => {
          if (res.status === 'ok') {
            this.appinfo.image = `https://www.ileapcloud.com/images/${res.result}`;
          }
        });
      }
    }

    goback() {
      this.router.navigate(['/layout/app-list/myapp']);
    }

    version(e) {
      const arr = e.target.value.split('.').length;
      if (arr < 2) {
        this.showtext = true;
        this.text = 'version does not conform to specifications';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1000);
        return;
      }
      if (!this.appinfo.version) {
        if (/\d+(\.\d+){1,4}/.test(e.target.value) && e.target.value.split('.').length < 5) {
          this.tipsversion = '';
          this.appinfo.version = e.target.value;
        } else {
          this.tipsversion = 'version does not conform to specifications';
        }
      } else if (localStorage.getItem('upappid')) {
        if (/\d+(\.\d+){1,4}/.test(e.target.value) && e.target.value.split('.').length < 5) {
          const newv = e.target.value.split('.');
          const oldv = this.appinfo.version.split('.');
          if (newv.length === oldv.length) {
            for (let i = 0; i < newv.length; i++) {
              if (newv[i] > oldv[i]) {
                this.tipsversion = '';
                this.appinfo.version = e.target.value;
              }
            }
          } else {
            this.tipsversion = 'version does not conform to specifications';
          }
        } else {
          this.tipsversion = 'version does not conform to specifications';
        }
      } else {
        this.appinfo.version = e.target.value;
        this.tipsversion = '';
      }
    }
    bundleId(e) {
      if (/^([a-zA-Z0-9]{1,62})\.([a-zA-Z0-9]{1,62})\.([a-zA-Z0-9]{1,62})$/.test(e.target.value) && e.target.value.split('.').length < 4) {
        this.tipsbundleId = '';
        this.appinfo.bundleId = e.target.value;
      } else {
        this.tipsbundleId = 'bundleId does not conform to specifications';
      }
    }

    showAppinfo(id) {
      this.http.getAppInfo(id)
      .subscribe((res: any) => {
        this.appinfo.appId = res.result.appId;
        this.appinfo.appName = res.result.appname;
        this.appinfo.category = res.result.category ? res.result.category : 'scratcher';
        this.appinfo.customDeveloper = res.result.customDeveloper;
        this.appinfo.bundleId = res.result.bundleId;
        this.appinfo.appUrl = res.result.appUrl;
        this.appinfo.version = res.result.version;
        this.newversion = res.result.version;
        this.appinfo.description = res.result.description;
        this.appinfo.step = res.result.step;
        this.appinfo.id = res.result.id;
        this.appinfo.image = res.result.image ? `https://www.ileapcloud.com/images/${res.result.image}` : res.result.image;
        this.disabled = 'disabled';
      });
    }

    gostep2() {
      const json = {
        appId: this.appinfo.appId,
        appPath: '',
        appSecret: '',
        bundleId: this.appinfo.bundleId,
        appname: this.appinfo.appName,
        category: this.appinfo.category,
        appUrl: this.appinfo.appUrl,
        customDeveloper: this.appinfo.customDeveloper,
        image: this.appinfo.image.indexOf('https://www.ileapcloud.com/images/') > -1 ? this.appinfo.image.slice(34) : this.appinfo.image,
        description: 'scratcher',
        state: 1,
        version: this.appinfo.version};
        if (this.appinfo.appName && this.appinfo.version && this.appinfo.bundleId) {
          if (!localStorage.getItem('upappid') && !localStorage.getItem('upgrade')) {
            if (this.newversion !== this.appinfo.version) {
              this.http.addApp(json).subscribe((res: any) => {
                if (res.status === 'error') {
                  switch (res.result) {
                        case 20001:
                          this.showtext = true;
                          this.text = 'App name already exists';
                          break;
                        case 20002:
                          this.showtext = true;
                          this.text = 'App bundleId already exists';
                          break;
                        case 20003:
                          this.showtext = true;
                          this.text = 'App bundleId and version number already exist';
                          break;
                        case 20004:
                          this.showtext = true;
                          this.text = 'App name does not meet requirements';
                          break;
                        case 20005:
                          this.showtext = true;
                          this.text = 'App identification does not meet the requirements';
                          break;
                        case 20006:
                          this.showtext = true;
                          this.text = 'App version number does not meet the requirements';
                          break;
                        default:
                          this.showtext = true;
                          this.text = 'Create failure' ;
                  }
                  setTimeout(() => {
                    this.showtext = false;
                    this.text = '';
                  }, 1000);
                } else if (res.status === 'ok') {
                  this.http.updateStep(res.result.id, 1).subscribe((data: any) => {
                    if (data.status === 'ok') {
                      localStorage.setItem('appid', res.result.id);
                      this.router.navigate(['/layout/app-list/appdetail']);
                      localStorage.removeItem('upappid');
                    }
                  });
                }
              });
            } else {
              this.showtext = true;
              this.text = 'Version number should be greater than the existing version number';
              setTimeout(() => {
                this.showtext = false;
                this.text = '';
              }, 1000);
            }

          } else {
            this.http.updateApp(json).subscribe((res: any) => {
              if (res.status === 'error') {
                switch (res.result) {
                  case 20001:
                    this.showtext = true;
                    this.text = 'App name already exists';
                    break;
                  case 20002:
                    this.showtext = true;
                    this.text = 'App bundleId already exists';
                    break;
                  case 20003:
                    this.showtext = true;
                    this.text = 'App bundleId and version number already exist';
                    break;
                  case 20004:
                    this.showtext = true;
                    this.text = 'App name does not meet requirements';
                    break;
                  case 20005:
                    this.showtext = true;
                    this.text = 'App identification does not meet the requirements';
                    break;
                  case 20006:
                    this.showtext = true;
                    this.text = 'App version number does not meet the requirements';
                    break;
                  default:
                    this.showtext = true;
                    this.text = 'Create failure';
                }
                setTimeout(() => {
                  this.showtext = false;
                  this.text = '';
                }, 1000);
              } else if (res.status === 'ok') {
                this.http.updateStep(this.appinfo.id, 1).subscribe((data: any) => {
                  if (data.status === 'ok') {
                    localStorage.removeItem('upappid');
                    localStorage.setItem('appid', `${this.appinfo.id}`);
                    this.router.navigate(['/layout/app-list/appdetail']);
                  }
                });
              }
            });
          }
        } else if (!this.appinfo.appName) {
          this.showtext = true;
          this.text = 'Please fill in the App Name';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
      } else if (!this.appinfo.bundleId) {
          this.showtext = true;
          this.text = 'Please fill in the App bundleId';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
      } else if (!this.appinfo.version) {
          this.showtext = true;
          this.text = 'Please fill in the App version';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
      }
    }

    isPC() {
      if (this.router.url.indexOf('/layout/app-list/step1') > -1) {
        const userAgentInfo = navigator.userAgent;
        const Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
        const step1 = document.getElementsByClassName('step1')[0] as HTMLStyleElement;
        let flag = true;
        step1.style.width = '50%';
        step1.style.borderRight = '1px dashed #666';
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            step1.style.width = '98%';
            step1.style.borderRight = 'none';
            flag = false;
            break;
          }
        }
        return flag;
      }
    }

}
