import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/registration.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  constructor
  (
    private fb: FormBuilder,
    private reset: RegistrationService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Create gettters for password reset email
   **/

  get email()
  {
    return this.requestResetForm.get('email');
  }


  requestResetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  /**
   * Submit form data through a service to the server
   */

  public error: any = [];


  onSubmit()
  {
    //console.log(this.registrationForm.value);
    this.reset.sendPasswordResetLink(this.requestResetForm.value)
        .subscribe(
          data => this.handleRequestEmailResponse(data),
          error => this.handleRequestEmailError(error),
        )
  }

  handleRequestEmailResponse(data)
  {
    this.notification.showSuccess(data.message, "Success!");
    this.requestResetForm.reset();;

  }

  handleRequestEmailError(error)
  {
    //this.error = error.error.error;
    console.log(error);
    this.notification.showError(error.error, "Error!");
  }


}
