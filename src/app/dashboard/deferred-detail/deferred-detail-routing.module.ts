import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeferredDetailPage } from './deferred-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DeferredDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeferredDetailPageRoutingModule {}
