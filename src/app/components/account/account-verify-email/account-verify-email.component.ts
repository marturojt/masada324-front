import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { CommonModule } from '@angular/common';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({
  selector: 'app-account-verify-email',
  // standalone: true,
  // imports: [
  //   RouterLink,
  //   CommonModule
  // ],
  templateUrl: './account-verify-email.component.html',
  styleUrl: './account-verify-email.component.scss'
})
export class AccountVerifyEmailComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];

    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.accountService.verifyEmail(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.toastWin('Verification successful, you can now login');
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: () => {
          this.emailStatus = EmailStatus.Failed;
        }
      });
  }

}
