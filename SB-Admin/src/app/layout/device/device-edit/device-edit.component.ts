import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { DeviceApi } from '../../../device';

@Component({
    selector: 'app-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['./device-edit.component.scss'],
    animations: [routerTransition()]
})
export class DeviceEditComponent implements OnInit {
    showtext = false;
    text = '';
    DeviceDetails = {
      id: '',
      mobile: '',
      model: '',
      name: '',
      os: '',
      status: 0,
      uuid: ''
    };
    constructor(public http: DeviceApi, public router: Router) {}

    ngOnInit() {
      if (!sessionStorage.getItem('uuid')) {
        this.router.navigate(['/layout/device/device-list']);
      } else if (!sessionStorage.getItem('enroll')) {
        this.getPredefinedDevice(sessionStorage.getItem('uuid'));
      } else {
        this.getDeviceinfo(sessionStorage.getItem('uuid'));
      }
    }

    getPredefinedDevice(id) {
      this.http.getPredefinedDevice(id).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.DeviceDetails = res.result;
        }
      });
    }
    getDeviceinfo(id) {
      this.http.DeviceDetails(id).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.DeviceDetails = res.result;
        }
      });
    }
    putPredefinedDevice() {
      this.http.putPredefinedDevice(this.DeviceDetails).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.text = 'Modified success';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
          this.showtext = false;
          }, 1800);
        } else {
          this.text = 'Modification failed';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
          this.showtext = false;
          }, 1800);
        }
      });
    }

    goback() {
      this.router.navigate(['/layout/device/device-list']);
    }
}
