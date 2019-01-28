import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'manager-home', pathMatch: 'full' },
  { path: 'manager-home', loadChildren: '../manager-home/manager-home.module#ManagerHomePageModule' },
  { path: 'manager-account', loadChildren: '../manager-account/manager-account.module#ManagerAccountPageModule' },
  { path: 'create-admin', loadChildren: '../create-admin/create-admin.module#CreateAdminPageModule' },
  { path: 'logfile', loadChildren: '../logfile/logfile.module#LogfilePageModule' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
