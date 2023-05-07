import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotorTpRenewalDetailPage } from './motor-tp-renewal-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MotorTpRenewalDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotorTpRenewalDetailPageRoutingModule {}
