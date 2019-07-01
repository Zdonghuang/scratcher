import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDeviceComponent } from './add-device.component';

const routes: Routes = [
    {
        path: '',
        component: AddDeviceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddDeviceRoutingModule {
}
