import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublicSiteLayoutComponent } from './public-site-layout/public-site-layout.component';

const routes: Routes = [
  {
    path: '', component: PublicSiteLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicSiteRoutingModule { }
