import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceEditComponent } from './device-edit.component';

const routes: Routes = [
    {
        path: '', component: DeviceEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceEditRoutingModule {
}
