import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow.component';
import { WorkflowDetailComponent } from './workflow-detail/workflow-detail.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
    {
        path: '',
        component: WorkflowComponent
    },
    {
        path: 'editor',
        component: EditorComponent
    },
    {
        path: 'detail/:id',
        component: WorkflowDetailComponent
    },
    {
      path: 'Mdetail/:id',
      component: MobileDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkflowRoutingModule {
}
