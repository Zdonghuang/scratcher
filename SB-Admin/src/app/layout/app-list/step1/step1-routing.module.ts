import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './step1.component';

const routes: Routes = [
    {
        path: '',
        component: Step1Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Step1RoutingModule {
}
