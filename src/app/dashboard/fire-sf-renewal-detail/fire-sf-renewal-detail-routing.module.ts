import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireSfRenewalDetailPage } from './fire-sf-renewal-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FireSfRenewalDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireSfRenewalDetailPageRoutingModule {}
