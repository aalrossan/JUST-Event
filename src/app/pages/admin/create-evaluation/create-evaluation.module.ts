import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateEvaluationPage } from './create-evaluation.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEvaluationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateEvaluationPage]
})
export class CreateEvaluationPageModule { }
