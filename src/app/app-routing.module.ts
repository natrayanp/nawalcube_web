import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
{ path: '',
  loadChildren: './nologin/nologin.module#NologinModule'
},
{
  path: 'developers',
  loadChildren: './devmodule/devmodule.module#DevmoduleModule'
},
{
  path: 'authorise',
  loadChildren: './authorise/authorise.module#AuthoriseModule'
},
{
  path: 'login',
  loadChildren: './login/login.module#LoginModule'
},
{
  path: 'secure',
  canLoad: [AuthGuard],
  loadChildren: './postlogin/postlogin.module#PostloginModule'  
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
