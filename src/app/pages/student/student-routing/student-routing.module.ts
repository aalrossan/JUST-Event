import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'show-event', pathMatch: 'full' },
  { path: 'student-account', loadChildren: '../student-account/student-account.module#StudentAccountPageModule' },
  { path: 'show-event', loadChildren: '../show-event/show-event.module#ShowEventPageModule' },
  { path: 'show-event-info/:eventName/:id', loadChildren: '../show-event-info/show-event-info.module#ShowEventInfoPageModule' },
  { path: 'show-evaluation-event/:eventName/:id', loadChildren: '../show-evaluation-event/show-evaluation-event.module#ShowEvaluationEventPageModule' },
  { path: 'notification', loadChildren: '../notification/notification.module#NotificationPageModule' },
  { path: 'show-notification/:id', loadChildren: '../show-notification/show-notification.module#ShowNotificationPageModule' },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
