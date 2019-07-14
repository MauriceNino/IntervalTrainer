import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlansPage } from './plans.page';
import { EditPlanPageModule } from '../edit-plan/edit-plan.module';

const routes: Routes = [
  {
    path: '',
    component: PlansPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlansPage],
  exports: [PlansPage]
})
export class PlansPageModule {}
