import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppListComponent } from './app-list.component';

const routes: Routes = [
    {
        path: '',
        component: AppListComponent,
        children: [
          { path: '', redirectTo: 'myapp', pathMatch: 'prefix' },
          { path: 'myapp', loadChildren: './myapp/myapp.module#MyappModule' },
          { path: 'step1', loadChildren: './step1/step1.module#Step1Module' },
          // { path: 'step2', loadChildren: './step2/step2.module#Step2Module' },
          // { path: 'step3', loadChildren: './step3/step3.module#Step3Module' },
          { path: 'step2', loadChildren: './step4/step4.module#Step4Module' },
          { path: 'appdetail', loadChildren: './todevice/todevice.module#ToDeviceModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppListRoutingModule {
}
