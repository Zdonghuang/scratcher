import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step2Component } from './step2.component';

const routes: Routes = [
    {
        path: '',
        component: Step2Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Step2RoutingModule {
}
