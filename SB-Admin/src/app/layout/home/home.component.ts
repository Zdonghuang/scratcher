import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AppApi } from '../../appApi';
import { DeviceApi } from '../../device';
import {UserService} from '../../shared/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
    public doughnutChartLabels: string[] = [
        'In development',
        'In audit',
        'On line',
        'Withdrawn',
        'Audit failure'
    ];
    public doughnutChartData = [];
    public doughnutChartType: string;
    public pieChartLabels: string[] = [
        'enroll',
        'unenroll'
    ];
    public pieChartData = [];
    public pieChartType: string;
    constructor(public http: AppApi, public device: DeviceApi, public user: UserService) {}

    ngOnInit() {
      if (this.user.isLoggedIn()) {
        this.getMyapp();
        this.getMydevice();
      }
    }

    getMyapp() {
      const arr = [0, 0, 0, 0, 0];
      this.http.getMyAppList().subscribe((data: any) => {
        if (data.status === 'ok') {
          data.result.filter(item => {
            if (item.state === 1) {
              arr[0]++;
            }
            if (item.state === 2) {
              arr[1]++;
            }
            if (item.state === 6) {
              arr[2]++;
            }
            if (item.state === -1) {
              arr[3]++;
            }
            if (item.state === 3) {
              arr[4]++;
            }
          });
          arr.filter((d, i) => {
            if (d > 0) {
              this.doughnutChartData[i] = d;
            }
          });
          this.doughnutChartType = 'doughnut';
        }
      });
    }

    getMydevice() {
      this.device.getDeviceList().subscribe((res: any) => {
        if (res.status === 'OK') {
          this.pieChartData[0] = res.result.length;
          this.pieChartType = 'pie';
          this.device.getPredefinedDeviceList().subscribe((data: any) => {
            if (data.status === 'OK' && data.result.length) {
              this.pieChartData[1] = data.result.length;
              this.pieChartType = 'pie';
            }
          });
        }
      });
    }
}
