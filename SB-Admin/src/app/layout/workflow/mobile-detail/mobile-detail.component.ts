import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Workflow, WorkflowStatus } from '../../../shared/models/workflow';
import { WorkflowService } from '../../../shared/services/workflow.service';

@Component({
  selector: 'app-mobile-detail',
  templateUrl: './mobile-detail.component.html',
  styleUrls: ['./mobile-detail.component.scss'],
  animations: [routerTransition()]
})
export class MobileDetailComponent implements OnInit {
  workflow: Workflow = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public workflowSevice: WorkflowService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'));
      window.addEventListener('resize', () => {
        const userAgentInfo = navigator.userAgent;
        const Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0 || (window.innerWidth < 1024)) {
            flag = false;
            break;
          }
        }
        if (flag && this.router.url.indexOf('/layout/workflow/Mdetail/') > -1) {
          this.router.navigate([`/layout/workflow/detail/${id}`]);
        } else if (!flag && this.router.url.indexOf('/layout/workflow/detail/') > -1) {
          this.router.navigate([`/layout/workflow/Mdetail/${id}`]);
        }
      });
      this.workflow = this.workflowSevice.cachedData.find(f => f.id === id);
    });
  }

  contentString(): string {
    return JSON.stringify(JSON.parse(this.workflow.content), null, 2);
  }

  goback() {
    this.router.navigate(['/layout/workflow']);
  }

  close() {
    this.router.navigate(['/layout/workflow']);
  }

  edit() {
    sessionStorage.setItem('workflow-data', JSON.stringify(this.workflow));
    this.router.navigate(['/layout/workflow/editor']);
  }

  delete() {
    if (confirm('Are you sure to delete the workflow?')) {
      this.workflowSevice.delete(this.workflow.payloadId).subscribe(res => {
        if (res) {
          this.router.navigate(['/layout/workflow']);
        }
      });
    }
  }
}
