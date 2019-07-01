import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { DeviceApi } from '../../../device';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
  animations: [routerTransition()]
})
export class DeviceDetailsComponent implements OnInit {
  DeviceDetails = {
    id: '',
    mobile: '',
    model: '',
    name: '',
    os: '',
    status: 0,
    uuid: '',
    ip: '',
    position: '',
    capabilities: '',
    createTime: 0,
    updateTime: 0,
    activeTime: 0,
    importType: '',
    agentInfo: '',
    latestAgentInfo: ''
  };
  DeviceLists = [];
  showtext = false;
  text = '';
  enroll = false;
  showupload = false;
  onetime;
  executionTime;
  upgradeTime;
  constructor(public http: DeviceApi, public router: Router) {}

  ngOnInit() {
    if (!sessionStorage.getItem('uuid')) {
      this.router.navigate(['/layout/device/device-list']);
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
      } else {
        this.getPredefinedDevice(sessionStorage.getItem('uuid'));
      }
    });
  }
  getOneTime() {
    const nowTime = new Date();
    const yy = nowTime.getFullYear();
    const MM = (nowTime.getMonth() + 1) < 10 ? `0${nowTime.getMonth() + 1}` : nowTime.getMonth() + 1;
    const dd = nowTime.getDate() < 10 ? `0${nowTime.getDate()}` : nowTime.getDate();
    const hh = nowTime.getHours() < 10 ? `0${nowTime.getHours()}` : nowTime.getHours();
    const mm = nowTime.getMinutes() < 10 ? `0${nowTime.getMinutes()}` : nowTime.getMinutes();
    const ss = nowTime.getSeconds() < 10 ? `0${nowTime.getSeconds()}` : nowTime.getSeconds();
    this.onetime = `${yy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
    this.executionTime = this.onetime;
    this.upgradeTime = this.onetime;
  }
  goback() {
    this.router.navigate(['/layout/device/device-list']);
  }

  upload() {
    this.http.versionInfo().subscribe((res: any) => {
      if (res) {
        // const json = {
        //   uuid: this.DeviceDetails.uuid,
        //   type: 'execute',
        //   command: 'client_download',
        //   parameter: ''
        // };
        // const str = {
        //   version: res.result.version,
        //   url: res.result.url,
        //   downloadTime: this.executionTime,
        //   checkCode: res.result.checkCode
        // };
        const jsonB = {
          uuid: this.DeviceDetails.uuid,
          type: 'execute',
          command: 'client_upgrade',
          parameter: ''
        };
        const strB = {
          version: res.result.version,
          url: res.result.url,
          upgradeTime: this.upgradeTime,
          checkCode: res.result.checkCode
        };
        // json.parameter = JSON.stringify(str);
        jsonB.parameter = JSON.stringify(strB);
        // this.http.send(json).subscribe((data: any) => {
        //   if (data.status === 'OK') {
        //   }
        // });lielilielilielieelielilielieelieliee
        this.http.send(jsonB).subscribe((dataB: any) => {
          if (dataB.status === 'OK') {
            this.showupload = false;
            alert('Successful operation');
          }
        });
      }
    });
  }

  getDefineDeviceList() {
    this.http.getPredefinedDeviceList().subscribe((data: any) => {
      if (data.status === 'OK' && data.result.length) {
        this.DeviceLists = data.result;
        this.getDeviceList();
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
          this.router.navigate(['/layout/device/device-list']);
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
          this.router.navigate(['/layout/device/device-list']);
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

  getDeviceList() {
    this.http.getDeviceList().subscribe((res: any) => {
      if (res.status === 'OK') {
        res.result.filter(item => {
          item.enrolled = true;
          this.DeviceLists.filter((items, i) => {
            if (items.uuid === item.uuid) {
              this.DeviceLists.splice(i, 1);
            }
          });
        });
        this.DeviceLists.filter(it => {
          res.result.push(it);
        });
        this.DeviceLists = res.result;
      }
    });
  }

  // timestamp
  add0(m) {
    return m < 10 ? '0' + m : m;
  }
  format(shijianchuo) {
    const time = new Date(shijianchuo);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return y + '/' + this.add0(m) + '/' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  }
}
