import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceComponent,
    children: [
      { path: '', redirectTo: 'device-list', pathMatch: 'prefix' },
      { path: 'device-list', loadChildren: './device-list/device-list.module#DeviceListModule' },
      { path: 'device-details', loadChildren: './device-details/device-details.module#DeviceDetailsModule' },
      { path: 'device-edit', loadChildren: './device-edit/device-edit.module#DeviceEditModule' },
      { path: 'add-device', loadChildren: './device-add/add-device.module#AddDeviceModule' },
      { path: 'device-search/:id', loadChildren: './device-search/device-search.module#DeviceSearchModule' }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceRoutingModule {
}
