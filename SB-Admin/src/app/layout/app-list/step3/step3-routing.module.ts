import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step3Component } from './step3.component';

const routes: Routes = [
    {
        path: '',
        component: Step3Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Step3RoutingModule {
}
