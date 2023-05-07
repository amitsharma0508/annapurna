import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireSfRenewalPage } from './fire-sf-renewal.page';

const routes: Routes = [
  {
    path: '',
    component: FireSfRenewalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireSfRenewalPageRoutingModule {}
