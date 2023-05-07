import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path:'common',
    loadChildren: () => import('./common/common.module').then(m => m.CommonPageModule)
  },
  {
    path:'general-insurance-type',
    loadChildren: () => import('./general-insurance-type/general-insurance-type.module').then(m => m.GeneralInsuranceTypePageModule)
  },
  {
    path:'rural-life-detail-all',
    loadChildren: () => import('./rural-life-detail-all/rural-life-detail-all.module').then(m => m.RuralLifeDetailAllPageModule)
  },
  {
    path:'general-claim-type',
    loadChildren:() => import('./general-claim-type/general-claim-type.module').then(m => m.GeneralClaimTypePageModule)
  },
  {
    path:'track-general-claim',
    loadChildren:() => import('./track-general-claim/track-general-claim.module').then(m => m.TrackGeneralClaimPageModule)
  },
  {
    path:'annuity-scheme-details',
    loadChildren:() => import('./annuity-scheme-details/annuity-scheme-details.module').then(m => m.AnnuitySchemeDetailsPageModule)
  },
  {
    path: 'credit-detail',
    loadChildren: () => import('./credit-detail/credit-detail.module').then( m => m.CreditDetailPageModule)
  },
  {
    path: 'life-detail',
    loadChildren: () => import('./life-detail/life-detail.module').then( m => m.LifeDetailPageModule)
  },
  {
    path: 'general-detail',
    loadChildren: () => import('./general-detail/general-detail.module').then( m => m.GeneralDetailPageModule)
  },
  {
    path: 'motor-tp-renewal-detail',
    loadChildren: () => import('./motor-tp-renewal-detail/motor-tp-renewal-detail.module').then( m => m.MotorTpRenewalDetailPageModule)
  },
  {
    path: 'overseas-travel-insurance',
    loadChildren: () => import('./overseas-travel-insurance/overseas-travel-insurance.module').then( m => m.OverseasTravelInsurancePageModule)
  },
  {
    path: 'motor-cp-renewal',
    loadChildren: () => import('./motor-cp-renewal/motor-cp-renewal.module').then( m => m.MotorCpRenewalPageModule)
  },
  {
    path: 'fire-sf-renewal',
    loadChildren: () => import('./fire-sf-renewal/fire-sf-renewal.module').then( m => m.FireSfRenewalPageModule)
  },
  {
    path: 'fire-sf-renewal-detail',
    loadChildren: () => import('./fire-sf-renewal-detail/fire-sf-renewal-detail.module').then( m => m.FireSfRenewalDetailPageModule)
  },
  {
    path: 'immediate-detail',
    loadChildren: () => import('./immediate-detail/immediate-detail.module').then( m => m.ImmediateDetailPageModule)
  },
  {
    path: 'deferred-detail',
    loadChildren: () => import('./deferred-detail/deferred-detail.module').then( m => m.DeferredDetailPageModule)
  },
  {
    path: 'others',
    loadChildren: () => import('./others/others.module').then( m => m.OthersPageModule)
  },
  {
    path: 'general-renewal-others',
    loadChildren: () => import('./general-renewal-others/general-renewal-others.module').then( m => m.GeneralRenewalOthersPageModule)
  },
  {
    path: 'general-insurance-type-others',
    loadChildren: () => import('./general-insurance-type-others/general-insurance-type-others.module').then( m => m.GeneralInsuranceTypeOthersPageModule)
  },
  {
    path: 'general-claim',
    loadChildren: () => import('./general-claim/general-claim.module').then( m => m.GeneralClaimPageModule)
  },
  {
    path: 'general-claim-others',
    loadChildren: () => import('./general-claim-others/general-claim-others.module').then( m => m.GeneralClaimOthersPageModule)
  },
  {
    path: 'report-details',
    loadChildren: () => import('./report-details/report-details.module').then( m => m.ReportDetailsPageModule)
  },
  {
    path: 'general-insurance-document',
    loadChildren: () => import('./general-insurance-document/general-insurance-document.module').then( m => m.GeneralInsuranceDocumentPageModule)
  },
  {
    path: 'domestic-travel-insurance',
    loadChildren: () => import('./domestic-travel-insurance/domestic-travel-insurance.module').then( m => m.DomesticTravelInsurancePageModule)
  },
  {
    path: 'nekor',
    loadChildren: () => import('./nekor/nekor.module').then( m => m.NekorPageModule)
  },
  {
    path: 'rural-housing-insurance',
    loadChildren: () => import('./rural-housing-insurance/rural-housing-insurance.module').then( m => m.RuralHousingInsurancePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
