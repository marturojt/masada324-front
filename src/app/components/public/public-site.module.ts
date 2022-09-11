import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicSiteRoutingModule } from './public-site-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublicSiteLayoutComponent } from './public-site-layout/public-site-layout.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    PublicSiteLayoutComponent,
    BibliotecaComponent
  ],
  imports: [
    CommonModule,
    PublicSiteRoutingModule
  ]
})
export class PublicSiteModule { }
