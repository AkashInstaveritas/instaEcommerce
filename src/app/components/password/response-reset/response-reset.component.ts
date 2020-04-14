import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  constructor
  (
    private fb: FormBuilder,
    private reset: RegistrationService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService
  ) {
      route.queryParams.subscribe(params => {
        this.resetPasswordForm.setValue({
          email: '',
          password: '',
          password_confirmation: '',
          resetToken: params['token'],
        });
      });
    }

  ngOnInit(): void {


  }

  /**
   * Create gettters for registation controls
   **/

  get email()
  {
    return this.resetPasswordForm.get('email');
  }

  get password()
  {
    return this.resetPasswordForm.get('password');
  }

  get password_confirmation()
  {
    return this.resetPasswordForm.get('password_confirmation');
  }
  /**
   * End getters list
   **/

  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: [''],
    resetToken: [''],
  },  {validator: PasswordValidator});

  /**
   * Submit form data through a service to the server
   */
  public error: any = [];


  onSubmit()
  {
    //console.log(this.resetPasswordForm.value);
    this.reset.resetPassword(this.resetPasswordForm.value)
        .subscribe(
          data => this.handleResetPasswordResponse(data),
          error => this.handleResetPasswordError(error),
        )
  }

  handleResetPasswordResponse(data)
  {
    this.notification.showSuccess("Password reset, not login with new password.", "Success!");
    this.router.navigate(['/login']);
  }

  handleResetPasswordError(error)
  {
    this.error = error.error.errors;
  }

}
