import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { WorkflowService } from '../../../shared/services/workflow.service';
import { Workflow } from 'src/app/shared/models/workflow';

let editor = null;

@Component({
  selector: 'app-workflow-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  animations: [routerTransition()]
})
export class EditorComponent implements OnInit, OnDestroy {
  onSaving = false;
  iframeLoaded = false;
  closeResult = '';
  newName = '';
  emptyNameAlert = false;

  constructor(public router: Router, public workflowService: WorkflowService, private modalService: NgbModal) {
    editor = this;
  }

  handleIframeTask(event) {
    if (event.data === 'save-workflow') {
      editor.save();
    }
  }

  ngOnInit() {
    const workflowString = sessionStorage.getItem('workflow-data');
    if (workflowString) {
      const workflow: Workflow = JSON.parse(workflowString);
      this.newName = workflow.name;
    }

    window.addEventListener('message', this.handleIframeTask);
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('workflow-data');
  }

  onIframeLoaded() {
    this.iframeLoaded = true;
  }

  onCancel() {
    this.router.navigate(['/layout/workflow']);
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
        this.workflowService.edit(workflow).subscribe(
          (res: Workflow) => {
            this.router.navigate(['/layout/workflow']);
            this.onSaving = false;
          },
          err => {
            this.onSaving = false;
          }
        );
      } else {
        this.workflowService.add(this.newName.trim(), flow).subscribe(
          (res: Workflow) => {
            this.router.navigate(['/layout/workflow']);
            this.onSaving = false;
          },
          err => {
            this.onSaving = false;
          }
        );
      }
    }
  }

}
