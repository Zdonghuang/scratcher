import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step4Component } from './step4.component';

const routes: Routes = [
    {
        path: '',
        component: Step4Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Step4RoutingModule {
}
