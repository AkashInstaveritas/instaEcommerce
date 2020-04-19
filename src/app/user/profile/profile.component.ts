import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userData: any = [];
  public error: any = [];

  constructor
  (
    private fb: FormBuilder,
    private profile: UserService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUserProfile();

  }

  getUserProfile()
  {
    this.profile.getProfile()
    .subscribe(data =>
    {
      this.profileUpdateForm.setValue({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone,
        password: '',
        password_confirmation: '',
      });
    })
  }



  profileUpdateForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: [''],
    password_confirmation: [''],
  });



  onSubmit()
  {
    //console.log(this.registrationForm.value);
    this.profile.updateProfile(this.profileUpdateForm.value)
        .subscribe(
          data => this.handleSignUpResponse(data),
          error => this.handleSignUpError(error),
        )
  }

  handleSignUpResponse(data)
  {

    this.getUserProfile();
    this,this.notification.showSuccess(data.message, "Success!");
  }

  handleSignUpError(error)
  {
    this.error = error.error.errors;
  }


}
