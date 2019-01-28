import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthManagerGuard } from './guards/authManager/auth-manager.guard';
import { AuthAdminGuard } from './guards/authAdmin/auth-admin.guard';
import { AuthStudentGuard } from './guards/authStudent/auth-student.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule' },
  { path: 'login-manager', loadChildren: './pages/public/login-manager/login-manager.module#LoginManagerPageModule' },

  // Manager Routes
  { path: 'managers', loadChildren: './pages/manager/manager-routing/manager-routing.module#ManagerRoutingModule', canActivate: [AuthManagerGuard] },

  // Admin Routes
  { path: 'admins', loadChildren: './pages/admin/admin-routing/admin-routing.module#AdminRoutingModule', canActivate: [AuthAdminGuard] },

  // Student Routes
  { path: 'students', loadChildren: './pages/student/student-routing/student-routing.module#StudentRoutingModule', canActivate: [AuthStudentGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
