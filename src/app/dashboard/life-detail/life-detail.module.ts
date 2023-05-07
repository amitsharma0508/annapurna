import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LifeDetailPageRoutingModule } from './life-detail-routing.module';

import { LifeDetailPage } from './life-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LifeDetailPageRoutingModule
  ],
  declarations: [LifeDetailPage]
})
export class LifeDetailPageModule {}
