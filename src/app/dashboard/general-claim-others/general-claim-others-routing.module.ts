import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralClaimOthersPage } from './general-claim-others.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralClaimOthersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralClaimOthersPageRoutingModule {}
