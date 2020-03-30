import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { PasswordValidator } from '../shared/password.validator';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) { }



  ngOnInit(): void {}

  /**
   * Create gettters for registation controls
   **/
  get name()
  {
    return this.registrationForm.get('name');
  }

  get email()
  {
    return this.registrationForm.get('email');
  }

  get phone()
  {
    return this.registrationForm.get('phone');
  }

  get password()
  {
    return this.registrationForm.get('password');
  }

  get password_confirmation()
  {
    return this.registrationForm.get('password_confirmation');
  }
  /**
   * End getters list
   **/

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: [''],
  },  {validator: PasswordValidator});

  /**
   * Submit form data through a service to the server
   */
  onSubmit()
  {
    //console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
        .subscribe(
          response => console.log('Success!', response),
          error => console.log('Error!', error),
        )
  }
}

