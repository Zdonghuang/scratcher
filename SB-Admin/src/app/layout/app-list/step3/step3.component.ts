import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppApi } from '../../../appApi';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-list-step3',
    templateUrl: './step3.component.html',
    styleUrls: ['../step1/step1.component.scss'],
    animations: [routerTransition()]
})
export class Step3Component implements OnInit {
  busy = false;
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
    id: 0
  };
  appfile;
  step3right = true;
    constructor(public router: Router, public http: AppApi, public userService: UserService) {}

    ngOnInit() {
      if (localStorage.getItem('upappid') || localStorage.getItem('appid')) {
        const id = localStorage.getItem('upappid') ? localStorage.getItem('upappid') : localStorage.getItem('appid');
        this.showAppinfo(id);
      } else {
        this.router.navigate(['/layout/app-list/myapp']);
      }
      this.step3right = this.isPC();
      if (sessionStorage.getItem('routeurl')) {
        this.router.navigate(['/layout/app-list/step2']);
      }
    }

    isPC() {
      const userAgentInfo = navigator.userAgent;
      const Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
             const step3 = document.getElementsByClassName('step3left')[0] as HTMLStyleElement;
             step3.style.width = '98%';
             step3.style.borderRight = 'none';
             flag = false;
             break;
           }
      }
      return flag;
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
        this.appinfo.id = res.result.id;
        this.appinfo.image = res.result.image ? `https://www.ileapcloud.com/images/${res.result.image}` : res.result.image;
      });
    }


    gobackstep2() {
      this.router.navigate(['/layout/app-list/appdetail']);
      localStorage.setItem('upgrade', 'yes');
    }

    imgcolor() {
      const img = document.getElementsByClassName('uploadimg')[0] as HTMLInputElement;
      if (img.style.background === 'rgb(191, 191, 231)') {
        img.style.background = '';
      } else {
        img.style.background = 'rgb(191, 191, 231)';
      }
    }

    uploadfile(e) {
      this.appfile = e.target.files[0];
    }

    gostep4() {
      if (this.appfile) {
        this.busy = true;
        const tarFile = this.appfile.name.split('.');
        if (
          tarFile[tarFile.length - 2] === 'tar' &&
          tarFile[tarFile.length - 1] === 'gz' ||
          tarFile[tarFile.length - 1] === 'zip' ||
          tarFile[tarFile.length - 1] === 'apk'
        ) {
          if (this.appfile.size < 104857600) {
            if (this.appfile.size !== 0) {
              const formData = new FormData();
              formData.append('file', this.appfile);
              this.http.upLoadFile(formData)
              .subscribe((data: any) => {
                if (data.status === 'ok') {
                  this.busy = false;
                  this.http.updateStep(localStorage.getItem('appid'), 3).subscribe((resa: any) => {
                    if (resa.status === 'ok') {
                      this.router.navigate(['/layout/app-list/step2']);
                      const obj = {
                        3: localStorage.getItem('email'),
                        htmlReplace: {
                          userName: this.userService.getCurrentUser().username,
                          appName: this.appinfo.appName
                        }
                      };
                      this.http.sendEmail(obj).subscribe(() => {});
                      this.http.getCommonInfo().subscribe((res: any) => {
                        if (res.status === 'ok' && res.result.value) {
                          const adminObj = {
                            4: res.result.value,
                            htmlReplace: {
                              userName: this.userService.getCurrentUser().username,
                              appName: this.appinfo.appName,
                              version: this.appinfo.version
                            }
                          };
                          this.http.sendEmail(adminObj).subscribe(() => {});
                        }
                      });
                    }
                  });
                }
              });
            } else {
              this.showtext = true;
              this.busy = false;
              this.text = 'Files can not be empty, please re-upload!';
              setTimeout(() => {
                this.showtext = false;
                this.text = '';
              }, 1000);
            }
          } else {
            this.showtext = true;
            this.busy = false;
            this.text = 'File size exceeds the upper limit, please upload files less than 100Mb';
            setTimeout(() => {
              this.showtext = false;
              this.text = '';
            }, 1000);
          }
        } else {
          this.showtext = true;
          this.busy = false;
          this.text = 'Please upload the development package file in the correct format';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1000);
        }
      } else {
        this.showtext = true;
        this.text = 'Please upload the app development kit';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1000);
      }
    }
}
