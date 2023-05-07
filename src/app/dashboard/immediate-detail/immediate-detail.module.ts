import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImmediateDetailPageRoutingModule } from './immediate-detail-routing.module';

import { ImmediateDetailPage } from './immediate-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImmediateDetailPageRoutingModule
  ],
  declarations: [ImmediateDetailPage]
})
export class ImmediateDetailPageModule {}
