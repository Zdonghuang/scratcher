import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceSearchComponent } from './device-search.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceSearchRoutingModule {}
