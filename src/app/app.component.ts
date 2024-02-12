import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../environments/environment';


import { AccountService } from './_services';
import { Account, Role } from './_models';

// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS
// declare var $: any; // jQuery

// Variable para Google Analytics
declare let gtag: (property: string, value: any, configs: any) => {};

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  // Theme variables
  public isLightTheme = false;

  // Container variables
  Role = Role;
  account: Account;

  constructor(
    private accountService: AccountService,
    public router: Router
  ) {
    this.accountService.account.subscribe(x => this.account = x);

    // Para poblar lo de google Analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsId, {
          page_path: event.urlAfterRedirects
        });
        gtag('config', environment.googleAnalyticsId2, {
          page_path: event.urlAfterRedirects
        });
        gtag('config', environment.googleAnalyticsId3, {
          page_path: event.urlAfterRedirects
        });
      }
    });
  }

  ngOnInit(): void {
    // $(document).ready(function () {
    //     $('.tooltipped').tooltip({
    //         position: 'bottom',
    //         margin: 2
    //     });
    // });

  }

  logout() {
    this.accountService.logout();

  }

  // Theme switcher
  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }


  ngAfterViewInit(): void {
    // Tooltip materializecss
    var elemsTooltip = document.querySelectorAll('.tooltipped');
    var instancesTooltip = M.Tooltip.init(elemsTooltip, {
      position: 'bottom',
      margin: 5
    });
  }


}
