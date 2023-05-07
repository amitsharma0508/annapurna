import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackGeneralClaimPageRoutingModule } from './track-general-claim-routing.module';

import { TrackGeneralClaimPage } from './track-general-claim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackGeneralClaimPageRoutingModule
  ],
  declarations: [TrackGeneralClaimPage]
})
export class TrackGeneralClaimPageModule {}
