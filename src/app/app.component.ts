import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services';
import { Account, Role } from './_models';

// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS
declare var $: any; // jQuery

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    // Container variables
    Role = Role;
    account: Account;

    constructor(
        private accountService: AccountService
    ) {
        this.accountService.account.subscribe(x => this.account = x);
    }

    ngOnInit(): void {
        $(document).ready(function () {
            $('.tooltipped').tooltip({
                position: 'bottom',
                margin: 2
            });
        });
    }

    logout() {
        this.accountService.logout();
    }
}