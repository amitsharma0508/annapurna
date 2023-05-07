import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NekorPage } from './nekor.page';

const routes: Routes = [
  {
    path: '',
    component: NekorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NekorPageRoutingModule {}
