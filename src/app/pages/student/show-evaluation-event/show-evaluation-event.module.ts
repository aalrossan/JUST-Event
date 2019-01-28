import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowEvaluationEventPage } from './show-evaluation-event.page';

const routes: Routes = [
  {
    path: '',
    component: ShowEvaluationEventPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowEvaluationEventPage]
})
export class ShowEvaluationEventPageModule { }
