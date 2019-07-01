import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { AppApi } from '../../../appApi';
import { DeviceApi } from '../../../device';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
    selector: 'app-list-add-device',
    templateUrl: './add-device.component.html',
    styleUrls: ['./add-device.component.scss'],
    animations: [routerTransition()]
})
export class AddDeviceComponent implements OnInit {
  showtext = false;
  text = '';
  mydevice = [];
  next = false;
  pin;
  error = false;
  // 1代表从app来，0代表从设备来
  from = 1;
  constructor(public router: Router, public http: AppApi, public device: DeviceApi) {}

    ngOnInit() {
      this.router['transitions'].value.currentSnapshot.url === '/layout/device/device-list' ? (this.from = 0) : (this.from = 1);
    }
    tostep3() {
      this.router.navigate(['/layout/app-list/step3']);
    }
    bindpin() {
      if (this.pin) {
        this.device.bindpin(this.pin).subscribe((res: any) => {
          if (res.status === 'OK' && res.result) {
            this.error = false;
            if (this.from === 1) {
              this.todevice();
            } else {
              this.todevice();
            }
          } else {
            this.error = true;
            this.text = 'Failed to add device';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1800);
          }
        });
      } else {
        this.text = 'Pin code cannot be empty';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1800);
      }
    }
    todevice() {
      this.router.navigate(['/layout/device/device-list']);
    }
}
