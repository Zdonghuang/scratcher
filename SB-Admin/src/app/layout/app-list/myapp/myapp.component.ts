import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { AppApi } from '../../../appApi';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-list-myapp',
    templateUrl: './myapp.component.html',
    styleUrls: ['./myapp.component.scss'],
    animations: [routerTransition()]
})
export class MyappComponent implements OnInit {
  leap = localStorage.getItem('url');
  myAppLists = [];
  myAppList = [];
  // pagelist = [1,2,3,4,5,6,7,8,9];
  pagelist = [];
  showtext = false;
  showType = 1;
  text = '';
    constructor(public router: Router, public userService: UserService, public http: AppApi) {}

    ngOnInit() {
      if (this.userService.isLoggedIn()) {
        this.showData();
        localStorage.removeItem('upgrade');
        localStorage.removeItem('upappid');
        localStorage.removeItem('appid');
        sessionStorage.removeItem('routeurl');
      }
    }

    showData() {
      this.http.getMyAppList().subscribe((data: any) => {
        if (data.status === 'ok') {
          const arr = [];
          data.result.filter(item => {
            arr.push(item.id);
          });
          arr.sort();
          arr.filter(b => {
            data.result.filter(a => {
              if (a.id === b) {
                this.myAppLists.push(a);
              }
            });
          });
          this.pagelist = [];
          const page = Math.ceil(data.result.length / 10);
          for (let i = 1; i <= page; i++) {
            this.pagelist.push(i);
          }
          this.myAppList = this.myAppLists.slice(0, 10);
        }
      }, err => {
        if (err) {
          this.userService.logout();
        }
      });
    }

    setpage(e) {
      const ul = document.getElementsByClassName('page')[0];
      for (let i = 0 ; i < ul.children.length; i++) {
        ul.children[i].className = 'pages';
      }
      e.target.className = 'pages active';
      this.myAppList = this.myAppLists.slice((Number(e.target.innerHTML) - 1) * 10, (Number(e.target.innerHTML) - 1) * 10 + 10);
    }

    showTable() {
      this.router.navigate(['/layout/app-list/step1']);
    }

    toappstep(con) {
      if (con.state === 1) {
        this.router.navigate([`/layout/app-list/appdetail`]);
      } else if (con.state === 2 || con.state === -1) {
        this.router.navigate([`/layout/app-list/step2`]);
      }
      localStorage.setItem('appid', con.id);
      localStorage.setItem('upgrade', 'yes');
    }

    // 切换视图
  changeType(n) {
    this.showType = n;
  }

}
