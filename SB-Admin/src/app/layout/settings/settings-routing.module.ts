import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
          { path: '', redirectTo: 'settings-list', pathMatch: 'prefix' },
          {path: 'settings-list', loadChildren: './settings-list/settings-list.module#SettingsListModule'},
          {path: 'details', loadChildren: './details/details.module#DetailsModule'},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
