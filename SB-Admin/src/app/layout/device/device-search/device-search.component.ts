import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute, Params, ParamMap, NavigationEnd } from '@angular/router';
import { DeviceApi } from '../../../device';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-search',
  templateUrl: './device-search.component.html',
  styleUrls: ['./device-search.component.scss'],
  animations: [routerTransition()]
})
export class DeviceSearchComponent implements OnInit {
  search = '';
  DeviceLists = [];
  Lists = [];
  lables = '';
  checkAll = false;
  selectData = [];
  selectOne = [];
  showtext = false;
  text = '';
  i = 0;
  List = [];
  dfList = [];
  pagelist = [];
  constructor(public http: DeviceApi, public route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    // this.search
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.search = params.get('id');
    // });
    // this.route.params.subscribe(params => {
    //   this.search = decodeURI(this.route.snapshot.paramMap.get('id'));
    // });
    // this.route.params.subscribe(data => (this.search = data.id));
    // this.getDefineDeviceList();
    this.searchFun();
  }

  searchFun() {
    this.route.params.subscribe(data => (this.search = data.id));
    this.searchDevice();
  }

  ngAfterViewInit() {
    // 监听路由变化
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.searchFun();
      }
    });
  }

  searchDevice() {
    this.List = [];
    this.http.searchDevice(this.search).subscribe((res: any) => {
      if (res.status === 'OK') {
        if (res.result.length > 0) {
          this.List = res.result;
          this.http.searchPreDevice(this.search).subscribe((data: any) => {
            if (data.status === 'OK') {
              this.dfList = this.List.concat(data.result);
              this.pagelist = [];
              const page = Math.ceil(res.result.length / 10);
              for (let i = 1; i <= page; i++) {
                this.pagelist.push(i);
              }
              this.Lists = this.dfList.slice(0, 10);
            }
          });
        } else {
          this.http.searchPreDevice(this.search).subscribe((data: any) => {
            if (data.status === 'OK') {
              this.dfList = data.result;
              this.pagelist = [];
              const page = Math.ceil(res.result.length / 10);
              for (let i = 1; i <= page; i++) {
                this.pagelist.push(i);
              }
              this.Lists = this.dfList.slice(0, 10);
            }
          });
        }
      }
    });
  }

  getpage(){
    
  }

  getDefineDeviceList() {
    this.http.getPredefinedDeviceList().subscribe((data: any) => {
      if (data.status === 'OK' && data.result.length) {
        this.DeviceLists = data.result;
        this.getDeviceList();
      }
    });
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
        this.selectAll();
      }
    });
  }

  selectAll() {
    this.Lists = this.DeviceLists.map(item => {
      return Object.assign(item, { select: this.checkAll });
    });
  }
  selectAlls() {
    this.checkAll = !this.checkAll;
    this.Lists.map(item => {
      item.select = this.checkAll;
      return item;
    });
  }

  selectItem(id) {
    this.selectOne = this.Lists.filter(function(item) {
      return item.uuid == id;
    });
    this.selectOne[0].select = !this.selectOne[0].select;
  }

  getSelect() {
    this.selectData = this.Lists.filter(function(item) {
      return item.select == true;
    });
  }

  sendAll(text) {
    this.getSelect();
    if (this.selectData.length > 0) {
      for (this.i = 0; this.i < this.selectData.length; this.i++) {
        this.sencommand(text, this.selectData[this.i]);
      }
    } else {
      alert('请选择要操作的数据！');
    }
  }

  deleteAll() {
    this.getSelect();
    if (this.selectData.length > 0) {
      if (confirm(`Are you sure you want to delete devices?`)) {
        for (this.i = 0; this.i < this.selectData.length; this.i++) {
          if (this.selectData[this.i].status == 0) {
            this.deleteOne(this.selectData[this.i]);
          } else {
            this.unenroll(this.selectData[this.i].uuid);
          }
        }
        if (this.i == this.selectData.length) {
          this.searchDevice();
        }
      } else {
        this.text = 'delete cancled!';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1800);
      }
    } else {
      alert('请选择要操作的数据！');
    }
  }

  // send
  sencommand(text, con) {
    if (text === 'certificate' && con.status) {
      const json = {
        command: 'getagentinfo',
        parameter: '',
        type: 'execute',
        uuid: con.uuid
      };
      this.http.sendcommand(json).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.http.commandinfo(res.result.commandid).subscribe((resp: any) => {});
          if (this.i == this.selectData.length) {
            this.text = 'Send successfully!';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1800);
          }
        }
      });
    } else {
      this.i = this.selectData.length;
      this.text = 'Send failed!';
      this.showtext = true;
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1800);
    }
  }

  // delete
  deleteOne(con) {
    this.http.deletePredefinedDevice(con.uuid).subscribe((res: any) => {
      if (res.status === 'OK') {
        this.getDefineDeviceList();
        if (this.i == this.selectData.length - 1) {
          this.text = 'Delete successful';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1800);
        }
      } else {
        this.i = this.selectData.length;
        this.text = 'delete failed!';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1800);
      }
    });
  }

  // enroll
  unenroll(id) {
    // if (confirm('Are you sure you want to cancel the enroll?')) {
    this.http.unenroll(id).subscribe((res: any) => {
      if (res.status === 'OK') {
        this.getDeviceList();
        if (this.i == this.selectData.length - 1) {
          this.text = 'Successful operation';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1800);
        }
      } else {
        this.i = this.selectData.length;
        this.text = 'delete failed!';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1800);
      }
    });
    // }
  }

  addAll() {
    this.getSelect();
    if (this.selectData.length > 0) {
      for (this.i = 0; this.i < this.selectData.length; this.i++) {
        if (this.selectData[this.i].status == 0) {
          this.addtagPre(this.lables, this.selectData[this.i]);
        } else {
          this.addtag(this.lables, this.selectData[this.i]);
        }
      }
      if (this.i == this.selectData.length) {
        this.searchDevice();
      }
    } else {
      alert('请选择要操作的数据！');
    }
  }

  // addtag
  addtag(text, con) {
    if (text.length > 0) {
      this.http.devicetag(con.uuid).subscribe((res: any) => {
        if (res.result != null) {
          text += ',';
          text += res.result;
        }
        const addjson = {
          tag: text,
          uuid: con.uuid
        };
        this.http.deviceAddtag(addjson).subscribe((res: any) => {
          if (res.status === 'OK') {
            if (this.i == this.selectData.length) {
              this.searchDevice();
              // this.text = 'Add tag successfully!';
              // this.showtext = true;
              // setTimeout(() => {
              //   this.text = '';
              //   this.showtext = false;
              // }, 1800);
            }
          }
        });
      });
    } else {
      this.i = this.selectData.length;
      this.text = 'Add tag failed!';
      this.showtext = true;
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1800);
    }
  }

  // addtag
  addtagPre(text, con) {
    if (text.length > 0) {
      this.http.devicetagPre(con.uuid).subscribe((res: any) => {
        if (res.result != null) {
          text += ',';
          text += res.result;
        }
        const addjson = {
          tag: text,
          uuid: con.uuid
        };
        this.http.deviceAddtagPre(addjson).subscribe((res: any) => {
          if (res.status === 'OK') {
            if (this.i == this.selectData.length) {
              this.searchDevice();
              this.text = 'Add tag successfully!';
              this.showtext = true;
              setTimeout(() => {
                this.text = '';
                this.showtext = false;
              }, 1800);
            }
          }
        });
      });
    } else {
      this.i = this.selectData.length;
      this.text = 'Add tag failed!';
      this.showtext = true;
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1800);
    }
  }


  send(text,con){
    if (text === 'certificate' && con.status) {
      const json = {
        command: 'getagentinfo',
        parameter: '',
        type: 'execute',
        uuid: con.uuid
      };
      this.http.sendcommand(json).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.http.commandinfo(res.result.commandid).subscribe((resp: any) => { })
            this.text = 'Send successfully!';
            this.showtext = true;
            setTimeout(() => {
              this.text = '';
              this.showtext = false;
            }, 1800);
        }
      });
    } else {
      this.text = 'Send failed!';
      this.showtext = true;
      setTimeout(() => {
        this.text = '';
        this.showtext = false;
      }, 1800);
    }
  }

  delete(con){
    if(con.status){
      this.http.unenroll(con.uuid).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.text = 'Successful operation';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1800);
          this.getDeviceList();
        } else {
          this.text = 'delete failed!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1800);
        }
      });
    }else{
      this.http.deletePredefinedDevice(con.uuid).subscribe((res: any) => {
        if (res.status === 'OK') {
          this.text = 'Delete successful';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1800);
          this.getDefineDeviceList();
        } else {
          this.text = 'delete failed!';
          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1800);
        }
      });
    }
  }


}
