import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityListComponent } from './security-list.component';

const routes: Routes = [
    {
        path: '',
        component: SecurityListComponent,
        children: [
          // { path: '', redirectTo: 'device-list', pathMatch: 'prefix' },
          // { path: 'device-list', loadChildren: './device-list/device-list.module#DeviceListModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityListRoutingModule {
}
