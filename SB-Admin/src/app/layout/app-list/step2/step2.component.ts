import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppApi } from '../../../appApi';

@Component({
    selector: 'app-list-step2',
    templateUrl: './step2.component.html',
    styleUrls: ['../step1/step1.component.scss'],
    animations: [routerTransition()]
})
export class Step2Component implements OnInit, OnDestroy {
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
    constructor(public router: Router, public http: AppApi) {}

    handleIframeTask(event) {
      console.log(event.data);
    }

    ngOnInit() {
      window.addEventListener('message', this.handleIframeTask);
    }

    ngOnDestroy(): void {
      sessionStorage.removeItem('workflow-id');
      sessionStorage.removeItem('workflow-data');
    }

    onCancel() {
      // this.router.navigate(['/layout/workflow']);
    }

    onSave() {
      window.frames[0].postMessage('cmd-save');
      // this.router.navigate(['/layout/workflow']);
    }

}
