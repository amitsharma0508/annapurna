import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeferredDetailPageRoutingModule } from './deferred-detail-routing.module';

import { DeferredDetailPage } from './deferred-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeferredDetailPageRoutingModule
  ],
  declarations: [DeferredDetailPage]
})
export class DeferredDetailPageModule {}
