import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckemailComponent } from './checkemail.component';

const routes: Routes = [
    {
        path: '',
        component: CheckemailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CheckemailRoutingModule {
}
