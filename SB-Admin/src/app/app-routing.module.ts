import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'prefix' },
  { path: 'layout', loadChildren: './layout/layout.module#LayoutModule' },
  { path: 'index', loadChildren: './index/index.module#IndexModule' },
  { path: 'checkemail', loadChildren: './checkemail/checkemail.module#CheckemailModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  { path: 'forgetpwd', loadChildren: './forgetpwd/forgetpwd.module#ForgetpwdModule' },
  { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
  { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
  { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
