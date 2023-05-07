import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralRenewalOthersPage } from './general-renewal-others.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralRenewalOthersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRenewalOthersPageRoutingModule {}
