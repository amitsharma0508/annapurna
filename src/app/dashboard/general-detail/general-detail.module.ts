import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralDetailPageRoutingModule } from './general-detail-routing.module';

import { GeneralDetailPage } from './general-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralDetailPageRoutingModule
  ],
  declarations: [GeneralDetailPage]
})
export class GeneralDetailPageModule {}
