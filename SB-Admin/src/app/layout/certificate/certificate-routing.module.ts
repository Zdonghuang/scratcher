import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificateComponent } from './certificate.component';

const routes: Routes = [
    {
        path: '',
        component: CertificateComponent,
        children: [
          { path: '', redirectTo: 'security-list', pathMatch: 'prefix' },
          { path: 'security-list', loadChildren: './security-list/security-list.module#SecurityListModule' },
          { path: 'details', loadChildren: './security-details/details.module#DetailsModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CertificateRoutingModule {
}
