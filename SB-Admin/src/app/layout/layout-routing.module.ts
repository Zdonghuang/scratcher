import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'info', loadChildren: './info/info.module#InfoModule' },
            { path: 'app-list', loadChildren: './app-list/app-list.module#AppListModule' },
            { path: 'device', loadChildren: './device/device.module#DeviceModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
            { path: 'workflow', loadChildren: './workflow/workflow.module#WorkflowModule' },
            { path: 'security', loadChildren: './certificate/certificate.module#CertificateModule' },
            // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'forms', loadChildren: './form/form.module#FormModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            // { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
