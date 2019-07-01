import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';

const routes: Routes = [
    {
        path: '',
        component: DetailsComponent,
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
export class DetailsRoutingModule {
}
