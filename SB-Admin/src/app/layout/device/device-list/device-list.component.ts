import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { DeviceApi } from '../../../device';
import { Subscription } from 'rxjs';
import {UserService} from '../../../shared/services/user.service';

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss'],
    animations: [routerTransition()]
})
export class DeviceListComponent implements OnInit {
    DeviceLists = [];
    showadd = false;
    showaddping = false;
    showType = 1;
    json = {
      mobile: '',
      model: '',
      name: '',
      os: '',
      status: 0,
      uuid: ''
    };
    showtext = false;
    text = '';
    pagelist = [];
    constructor(public http: DeviceApi, public router: Router, public user: UserService) {}

    ngOnInit() {
      sessionStorage.removeItem('enroll');
      if (this.user.isLoggedIn()) {
        this.getDefineDeviceList();
      }
      // this.http.configList().subscribe((res: any) => {
      //   console.log(res);
      // });
    }

    getDefineDeviceList() {
      this.http.getPredefinedDeviceList().subscribe((data: any) => {
        if (data.status === 'OK') {
          this.DeviceLists = data.result;
          this.getDeviceList();
        }
      });
    }

    getDeviceList() {
      this.http.getDeviceList().subscribe((res: any) => {
        if (res.status === 'OK') {
          res.result.filter((item) => {
            this.DeviceLists.filter((items, i) => {
              if (items.uuid === item.uuid) {
                this.DeviceLists.splice(i, 1);
              }
            });
          });
          this.DeviceLists.filter((it) => {
            res.result.push(it);
          });
          this.DeviceLists = res.result;
          const page = Math.ceil(res.result.length / 10);
          for (let i = 1; i <= page; i++) {
            this.pagelist.push(i);
          }
          this.DeviceLists = this.DeviceLists.slice(0, 10);
        }
      });
    }

    addPredefinedDevice() {
      this.http.addPredefinedDevice(this.json).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.text = 'Successful addition of new equipment';
          this.showtext = true;
          this.json = {
            mobile: '',
            model: '',
            name: '',
            os: '',
            status: 0,
            uuid: ''
          };
          this.getDefineDeviceList();
          this.showadd = false;
          setTimeout(() => {
            this.text = '';
          this.showtext = false;
          }, 1800);
        } else {
          this.text = 'Failure to add new device';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
          this.showtext = false;
          }, 1800);
        }
      });
    }

    deletePredefinedDevice(con) {
      if (confirm(`Are you sure you want to delete ${con.name} devices?`)) {
        this.http.deletePredefinedDevice(con.uuid).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.getDefineDeviceList();
            this.text = 'Delete successful';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
            this.showtext = false;
            }, 1800);
          }
        });
      }
    }

    unenroll(id) {
      if (confirm('Are you sure you want to cancel the enroll?')) {
        this.http.unenroll(id).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.getDefineDeviceList();
            this.text = 'Successful operation';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
            this.showtext = false;
            }, 1800);
          } else {
            this.getDefineDeviceList();
            this.text = 'operation failed';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
            this.showtext = false;
            }, 1800);
          }
        });
      }
    }

    redata() {
      this.showadd = false;
      this.json = {
        mobile: '',
        model: '',
        name: '',
        os: '',
        status: 0,
        uuid: ''
      };
    }

    goDeviceDetails(id, bl) {
      if (bl === true) {
        sessionStorage.setItem('enroll', '1');
      }
      sessionStorage.setItem('uuid', id);
      this.router.navigate(['/layout/device/device-details']);
    }

    goDeviceEdit(id, bl) {
      if (bl === true) {
        sessionStorage.setItem('enroll', '1');
      }
      sessionStorage.setItem('uuid', id);
      this.router.navigate(['/layout/device/device-edit']);
    }

    sencommand(text, con) {
      if (text === 'certificate' && con.enrolled) {
        const json = {
          command: 'getagentinfo',
          parameter: '',
          type: 'execute',
          uuid: con.uuid
        };
        this.http.sendcommand(json).subscribe((res: any) => {
          if (res.status === 'OK') {
            this.http.commandinfo(res.result.commandid).subscribe((resp: any) => {
            });
            this.text = 'Send successfully!';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1800);
          }
        });
      } else {
        this.text = 'send failed';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1800);
      }
    }
    toadd() {
      this.router.navigate(['/layout/device/add-device']);
    }

  // 切换视图
  changeType(n) {
    this.showType = n;
  }
}
