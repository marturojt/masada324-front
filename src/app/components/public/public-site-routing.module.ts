import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSiteLayoutComponent } from './public-site-layout/public-site-layout.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';

const routes: Routes = [
  {
    path: '', component: PublicSiteLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'biblioteca', component: BibliotecaComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicSiteRoutingModule { }
