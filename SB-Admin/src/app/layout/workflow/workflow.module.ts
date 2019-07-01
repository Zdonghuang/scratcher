import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowComponent } from './workflow.component';
import { PageHeaderModule } from '../../shared';

import { NgxJsonViewModule } from 'ng-json-view';
import { WorkflowDetailComponent } from './workflow-detail/workflow-detail.component';
import { EditorComponent } from './editor/editor.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';

@NgModule({
    imports: [CommonModule, WorkflowRoutingModule, PageHeaderModule, NgxJsonViewModule, FormsModule],
    declarations: [WorkflowComponent, WorkflowDetailComponent, EditorComponent, MobileDetailComponent]
})
export class WorkflowModule {}
