import { Component, OnInit , OnDestroy} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { AppApi } from '../../../appApi';
import { DeviceApi } from '../../../device';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkflowService } from '../../../shared/services/workflow.service';
import { Workflow } from 'src/app/shared/models/workflow';
import { AppService } from '../../../shared/services/app.service';
import { UserService } from '../../../shared/services/user.service';

let editor = null;
@Component({
    selector: 'app-list-todevice',
    templateUrl: './todevice.component.html',
    styleUrls: ['./todevice.component.scss'],
    animations: [routerTransition()]
})
export class ToDeviceComponent implements OnInit, OnDestroy {
  showtext = false;
  text = '';
  adevice = '';
  aworkflow = '';
  devices = [];
  add_device =  false;
  error = false;
  pin = '';
  workflowlist = [];
  work_flow = false;
  onSaving = false;
  iframeLoaded = false;
  closeResult = '';
  newName = '';
  emptyNameAlert = false;
  appfile;
  busy = false;
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
    constructor(public router: Router, public userService: UserService, public http: AppApi, public device: DeviceApi, public workflow: WorkflowService, private modalService: NgbModal,
      public appService: AppService) {
      editor = this;
    }
    handleIframeTask(event) {
      if (event.data === 'save-workflow') {
        editor.save();
      }
    }
    ngOnInit() {
      if (this.userService.isLoggedIn()) {
        if (localStorage.getItem('upappid') || localStorage.getItem('appid')) {
          const id = localStorage.getItem('upappid') ? localStorage.getItem('upappid') : localStorage.getItem('appid');
          this.showAppinfo(id);
        } else {
          this.router.navigate(['/layout/app-list/myapp']);
        }
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
        this.appinfo.id = res.result.id;
        this.appinfo.image = res.result.image ? `https://www.ileapcloud.com/images/${res.result.image}` : res.result.image;

        this.workflow.getbyApp(this.appinfo.appId).subscribe(wf => {
          console.log(`find workflow by app ${this.appinfo.appId} = ${wf}`);
          if (wf) {
            this.aworkflow = wf.payloadId;
          }
        });

        this.getDeviceList();
        this.GetWorkflowlist(false);

        const workflowString = sessionStorage.getItem('workflow-data');
        if (workflowString) {
          const workflow: Workflow = JSON.parse(workflowString);
          this.newName = workflow.name;
        }
        window.addEventListener('message', this.handleIframeTask);
      });
    }

    getDeviceList() {
      this.device.getDeviceList().subscribe((res: any) => {
        if (res.status === 'OK' && res.result.length) {
          this.devices = res.result;
          this.adevice = res.result[0].uuid;
          const obj = {
            deviceId: this.adevice,
            appId: this.appinfo.appId
          };

          this.appService.bindDevice(obj.appId, obj.deviceId).subscribe(success => {
            if (!success) {
              console.log(`bind device failed: appId=${obj.appId}, deviceId=${obj.deviceId}`);
            }
          });
        }
      });
    }
    setdevice(e) {
      this.adevice = e.target.value;
      const obj = {
        deviceId: this.adevice,
        appId: this.appinfo.appId
      };

      this.appService.bindDevice(obj.appId, obj.deviceId).subscribe(success => {
        if (!success) {
          console.log(`bind device failed: appId=${obj.appId}, deviceId=${obj.deviceId}`);
        }
      });
    }
    bindWorkflow() {
      this.appService.bindWorkflow(this.appinfo.appId, this.aworkflow).subscribe(success => {
        if (!success) {
          console.log(`bind device failed: appId=${this.appinfo.appId}, nodeRedId=${this.aworkflow}`);
        }
      });
    }
    setworkflow(e) {
      this.aworkflow = e.target.value;
      this.bindWorkflow();
    }
    bindpin() {
      if (this.pin) {
        this.device.bindpin(this.pin).subscribe((res: any) => {
          if (res.status === 'OK' && res.result) {
            this.error = false;
            this.add_device = false;
            this.getDeviceList();
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
        this.error = true;
        this.text = 'Pin code cannot be empty';
        this.showtext = true;
        setTimeout(() => {
          this.text = '';
          this.showtext = false;
        }, 1800);
      }
    }
    GetWorkflowlist(bind: boolean) {
      this.workflow.getAvailable(this.appinfo.appId).subscribe(res => {
        this.workflowlist = res;

        if (bind) {
          this.bindWorkflow();
        }
      });
    }
    ngOnDestroy(): void {
      sessionStorage.removeItem('workflow-data');
    }
    onIframeLoaded() {
      this.iframeLoaded = true;
    }
    onSave(content: any) {
      if (this.newName.trim().length === 0) {
        this.emptyNameAlert = true;
        this.modalService.open(content).result.then(res => {
          if (this.newName.trim().length !== 0) {
            this.onSaving = true;
            window.frames[0].postMessage('cmd-save');
          }
        });
      } else {
        this.onSaving = true;
        window.frames[0].postMessage('cmd-save');
      }
    }
    save() {
      const flow = sessionStorage.getItem('saved-workflow');
      if (flow) {
        const workflowString = sessionStorage.getItem('workflow-data');
        if (workflowString) {
          const workflow: Workflow = JSON.parse(workflowString);
          workflow.content = flow;
          this.workflow.edit(workflow).subscribe(
            (res: Workflow) => {
              if (typeof res === 'object') {
                this.aworkflow = res.payloadId;
                this.work_flow = false;
                this.onSaving = false;
                this.GetWorkflowlist(true);
              }
            }
          );
        } else {
          this.workflow.add(this.newName.trim(), flow).subscribe(
            (res: Workflow) => {
              if (res !== null) {
                this.aworkflow = res.payloadId;
                this.work_flow = false;
                this.onSaving = false;
                this.GetWorkflowlist(true);
              }
              if (Number(res) === 70006) {
                this.error = true;
                this.text = 'Name already exists';
                this.showtext = true;
                setTimeout(() => {
                  this.text = '';
                  this.showtext = false;
                }, 1800);
              }
            }
          );
        }

      }
    }
    uploadfile(e) {
      this.appfile = e.target.files[0];
    }
    gostep3() {
      if (this.aworkflow && this.adevice && this.appfile) {
        this.http.updateStep(localStorage.getItem('appid'), 2).subscribe((data: any) => {
          if (data.status === 'ok') {
            localStorage.setItem('appid', `${localStorage.getItem('appid')}`);
            this.gostep4();
          }
        });
      } else if (!this.adevice) {
        this.showtext = true;
        this.text = 'Please select device';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      } else if (!this.aworkflow) {
        this.showtext = true;
        this.text = 'Please select workflow';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      } else if (!this.appfile) {
        this.showtext = true;
        this.text = 'Please upload the app development kit';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      }
    }

    gostep4() {
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
            }, 1800);
          }
        } else {
          this.showtext = true;
          this.busy = false;
          this.text = 'File size exceeds the upper limit, please upload files less than 100Mb';
          setTimeout(() => {
            this.showtext = false;
            this.text = '';
          }, 1800);
        }
      } else {
        this.showtext = true;
        this.busy = false;
        this.text = 'Please upload the development package file in the correct format';
        setTimeout(() => {
          this.showtext = false;
          this.text = '';
        }, 1800);
      }
    }
}

