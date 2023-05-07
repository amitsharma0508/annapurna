import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralClaimPage } from './general-claim.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralClaimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralClaimPageRoutingModule {}
