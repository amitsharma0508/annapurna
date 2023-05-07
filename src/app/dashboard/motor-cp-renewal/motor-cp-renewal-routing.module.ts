import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotorCpRenewalPage } from './motor-cp-renewal.page';

const routes: Routes = [
  {
    path: '',
    component: MotorCpRenewalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotorCpRenewalPageRoutingModule {}
