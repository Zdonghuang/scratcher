import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyappComponent } from './myapp.component';

const routes: Routes = [
    {
        path: '',
        component: MyappComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyappRoutingModule {
}
