import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDeviceComponent } from './todevice.component';

const routes: Routes = [
    {
        path: '',
        component: ToDeviceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToDeviceRoutingModule {
}
