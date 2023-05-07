import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },   {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./component/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'rural-life-detail-all',
    loadChildren: () => import('./dashboard/rural-life-detail-all/rural-life-detail-all.module').then( m => m.RuralLifeDetailAllPageModule)
  },
  {
    path: 'rural-life-members',
    loadChildren: () => import('./dashboard/rural-life-members/rural-life-members.module').then( m => m.RuralLifeMembersPageModule)
  },
  {
    path: 'general-claim-type',
    loadChildren: () => import('./dashboard/general-claim-type/general-claim-type.module').then( m => m.GeneralClaimTypePageModule)
  },
  {
    path: 'track-general-claim',
    loadChildren: () => import('./dashboard/track-general-claim/track-general-claim.module').then( m => m.TrackGeneralClaimPageModule)
  },
  {
    path: 'business',
    loadChildren: () => import('./business/business.module').then( m => m.BusinessPageModule)
  },
  {
    path: 'business-detail',
    loadChildren: () => import('./business/business-detail/business-detail.module').then( m => m.BusinessDetailPageModule)
  },
  {
    path: 'annuity-scheme-details',
    loadChildren: () => import('./dashboard/annuity-scheme-details/annuity-scheme-details.module').then( m => m.AnnuitySchemeDetailsPageModule)
  },
  {
    path: 'credit-detail',
    loadChildren: () => import('./dashboard/credit-detail/credit-detail.module').then( m => m.CreditDetailPageModule)
  },
  {
    path: 'life-detail',
    loadChildren: () => import('./dashboard/life-detail/life-detail.module').then( m => m.LifeDetailPageModule)
  },
  {
    path: 'general-detail',
    loadChildren: () => import('./dashboard/general-detail/general-detail.module').then( m => m.GeneralDetailPageModule)
  },
  {
    path: 'motor-tp-renewal-detail',
    loadChildren: () => import('./dashboard/motor-tp-renewal-detail/motor-tp-renewal-detail.module').then( m => m.MotorTpRenewalDetailPageModule)
  },
  {
    path: 'overseas-travel-insurance',
    loadChildren: () => import('./dashboard/overseas-travel-insurance/overseas-travel-insurance.module').then( m => m.OverseasTravelInsurancePageModule)
  },
  {
    path: 'motor-cp-renewal',
    loadChildren: () => import('./dashboard/motor-cp-renewal/motor-cp-renewal.module').then( m => m.MotorCpRenewalPageModule)
  },
  {
    path: 'fire-sf-renewal',
    loadChildren: () => import('./dashboard/fire-sf-renewal/fire-sf-renewal.module').then( m => m.FireSfRenewalPageModule)
  },
  {
    path: 'fire-sf-renewal-detail',
    loadChildren: () => import('./dashboard/fire-sf-renewal-detail/fire-sf-renewal-detail.module').then( m => m.FireSfRenewalDetailPageModule)
  },
  {
    path: 'immediate-detail',
    loadChildren: () => import('./dashboard/immediate-detail/immediate-detail.module').then( m => m.ImmediateDetailPageModule)
  },
  {
    path: 'deferred-detail',
    loadChildren: () => import('./dashboard/deferred-detail/deferred-detail.module').then( m => m.DeferredDetailPageModule)
  },
  {
    path: 'others',
    loadChildren: () => import('./dashboard/others/others.module').then( m => m.OthersPageModule)
  },
  {
    path: 'general-renewal-others',
    loadChildren: () => import('./dashboard/general-renewal-others/general-renewal-others.module').then( m => m.GeneralRenewalOthersPageModule)
  },
  {
    path: 'general-insurance-type-others',
    loadChildren: () => import('./dashboard/general-insurance-type-others/general-insurance-type-others.module').then( m => m.GeneralInsuranceTypeOthersPageModule)
  },
  {
    path: 'general-claim',
    loadChildren: () => import('./dashboard/general-claim/general-claim.module').then( m => m.GeneralClaimPageModule)
  },
  {
    path: 'general-claim-others',
    loadChildren: () => import('./dashboard/general-claim-others/general-claim-others.module').then( m => m.GeneralClaimOthersPageModule)
  },
  {
    path: 'report-details',
    loadChildren: () => import('./dashboard/report-details/report-details.module').then( m => m.ReportDetailsPageModule)
  },
  {
    path: 'general-insurance-document',
    loadChildren: () => import('./dashboard/general-insurance-document/general-insurance-document.module').then( m => m.GeneralInsuranceDocumentPageModule)
  },
  {
    path: 'domestic-travel-insurance',
    loadChildren: () => import('./dashboard/domestic-travel-insurance/domestic-travel-insurance.module').then( m => m.DomesticTravelInsurancePageModule)
  },
  {
    path: 'nekor',
    loadChildren: () => import('./dashboard/nekor/nekor.module').then( m => m.NekorPageModule)
  },
  {
    path: 'rural-housing-insurance',
    loadChildren: () => import('./dashboard/rural-housing-insurance/rural-housing-insurance.module').then( m => m.RuralHousingInsurancePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
