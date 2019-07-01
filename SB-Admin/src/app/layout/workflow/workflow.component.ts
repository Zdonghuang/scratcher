import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Workflow, WorkflowStatus, DeviceInfo } from '../../shared/models/workflow';
import { WorkflowService } from '../../shared/services/workflow.service';
import { UserService } from '../../shared/services/user.service';

const PAGE_SIZE = 10;

@Component({
    selector: 'app-workflow',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.scss'],
    animations: [routerTransition()]
})
export class WorkflowComponent implements OnInit {

    workflows: Workflow[] = [];
    showType = 1;
    pageCount = 1;
    pages: number[] = [1];
    curPage = 1;

    toStart = true;
    devicelist: DeviceInfo[] = [];

    ngbModalOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false
    };

    model = {
        appId: '',
        userId: '',
        deviceId: '',
        startParam: ''
    };
    paramNotReady = true;

    constructor(public router: Router,
        public workflowSevice: WorkflowService,
        private modalService: NgbModal,
        public userService: UserService) {}

    ngOnInit() {
        if (this.userService.getCurrentUser()) {
            this.getPage(1);
            this.model.userId = this.userService.getCurrentUser().id.toString();
        }
    }

    getPage(page: number) {
        this.workflowSevice.getPage(page, PAGE_SIZE).subscribe(
            res => {
                if (res) {
                    this.workflowSevice.setCache(res.data);
                    this.workflows = res.data;
                    this.pageCount = res.count;

                    const cnt = Math.ceil(res.count / 10);
                    this.pages.length = 0;
                    for (let i = 1; i <= cnt; i++) {
                        this.pages.push(i);
                    }

                    this.curPage = page;
                }
            }
        );
    }

    createWorkflow() {
        sessionStorage.removeItem('workflow-data');
        this.router.navigate(['/layout/workflow/editor']);
    }

    editWorkflow(id: number) {
        const flow = this.workflows.find(f => f.id === id);
        sessionStorage.setItem('workflow-data', JSON.stringify(flow));
        this.router.navigate(['/layout/workflow/editor']);
    }

    deleteWorkflow(payloadId: string) {
        if (confirm('Are you sure to delete the workflow?')) {
            this.workflowSevice.delete(payloadId).subscribe(
                (res) => {
                    if (res) {
                        this.getPage(this.curPage);
                    }
                }
            );
        }
    }

    detailWorkflow(id: number) {
        const userAgentInfo = navigator.userAgent;
        const Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
        const flow = this.workflows.find(f => f.id === id);
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0 || (window.innerWidth < 1024)) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.router.navigate([`/layout/workflow/detail/${id}`]);
        } else {
          this.router.navigate([`/layout/workflow/Mdetail/${id}`]);
        }
    }

    showStartStopButtons(flow: Workflow): boolean {
        if (!flow.type) {
            return false;
        }

        return flow.type.toLowerCase() === 'nodered';
    }

    onStart(startform: any, payloadId: string) {
        this.toStart = true;
        this.paramNotReady = true;

        this.devicelist.length = 0;
        this.model.deviceId = '';
        this.model.appId = '';
        this.model.startParam = '';

        this.workflowSevice.findAWD(payloadId).subscribe(
            res => {
                if (res) {
                    this.model.appId = res.appId;
                    res.devices.forEach((dev: any) => {
                        this.devicelist.push({
                            deviceName: dev.deviceName,
                            deviceId: dev.deviceId,
                            deviceModel: dev.deviceModel
                        });
                    });
                    if (this.devicelist.length > 0) {
                        this.model.deviceId = this.devicelist[0].deviceId;
                    }
                }
                this.paramNotReady = false;
            }
        );

        this.modalService.open(startform, this.ngbModalOptions).result.then(res => {
            if (res === 'OK') {
                console.log(`starting workflow ${payloadId} ...`);
                this.startWorkflow(this.model.appId, this.model.userId, this.model.deviceId, this.model.startParam, payloadId);
            }
        });
    }

    onStop(startform: any, payloadId: string) {
        this.toStart = false;
        this.paramNotReady = true;

        this.devicelist.length = 0;
        this.model.deviceId = '';
        this.model.appId = '';
        this.model.startParam = '';

        this.workflowSevice.findAWD(payloadId).subscribe(
            res => {
                if (res) {
                    this.model.appId = res.appId;
                    res.devices.forEach((dev: any) => {
                        this.devicelist.push({
                            deviceName: dev.deviceName,
                            deviceId: dev.deviceId,
                            deviceModel: dev.deviceModel
                        });
                    });
                    if (this.devicelist.length > 0) {
                        this.model.deviceId = this.devicelist[0].deviceId;
                    }
                }
                this.paramNotReady = false;
            }
        );

        this.modalService.open(startform, this.ngbModalOptions).result.then(res => {
            if (res === 'OK') {
                console.log(`stopping workflow ${payloadId} ...`);
                this.stopWorkflow(this.model.appId, this.model.userId, this.model.deviceId, payloadId);
            }
        });
    }

    startWorkflow(appId: string, userId: string, deviceId: string, startParam: string, payloadId: string) {
        this.workflowSevice.start(appId, userId, deviceId, startParam).subscribe(
            (res) => {
                console.log(`start ${payloadId} return ${res}`);
                if (res) {
                    const flow = this.workflows.find(f => f.payloadId === payloadId);
                    flow.up = WorkflowStatus.On;
                }
            }
        );
    }

    stopWorkflow(appId: string, userId: string, deviceId: string, payloadId: string) {
        this.workflowSevice.stop(appId, userId, deviceId).subscribe(
            (res) => {
                console.log(`stop ${payloadId} return ${res}`);
                if (res) {
                    const flow = this.workflows.find(f => f.payloadId === payloadId);
                    flow.up = WorkflowStatus.Off;
                }
            }
        );
    }

    // 切换视图
    changeType(n) {
        this.showType = n;
    }
}
