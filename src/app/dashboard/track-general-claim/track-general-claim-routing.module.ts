import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackGeneralClaimPage } from './track-general-claim.page';

const routes: Routes = [
  {
    path: '',
    component: TrackGeneralClaimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackGeneralClaimPageRoutingModule {}
