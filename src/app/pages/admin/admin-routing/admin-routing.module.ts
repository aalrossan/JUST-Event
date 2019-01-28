import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'event-manager', pathMatch: 'full' },
  { path: 'create-event', loadChildren: '../create-event/create-event.module#CreateEventPageModule' },
  { path: 'modify-event/:id', loadChildren: '../modify-event/modify-event.module#ModifyEventPageModule' },
  { path: 'admin-account', loadChildren: '../admin-account/admin-account.module#AdminAccountPageModule' },
  { path: 'event-manager', loadChildren: '../event-manager/event-manager.module#EventManagerPageModule' },
  { path: 'create-evaluation/:eventName/:id', loadChildren: '../create-evaluation/create-evaluation.module#CreateEvaluationPageModule' },
  { path: 'analysis/:id', loadChildren: '../analysis/analysis.module#AnalysisPageModule' },
  { path: 'services-allocation/:id', loadChildren: '../services-allocation/services-allocation.module#ServicesAllocationPageModule' },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
