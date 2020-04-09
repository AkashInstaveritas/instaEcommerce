import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/password.validator';
import { RegistrationService } from 'src/app/registration.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor
  (
    private fb: FormBuilder,
    private _registrationService: RegistrationService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
    ) { }



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
  showMsg: boolean = false;
  errMsg = [];
  public error: any = [];


  onSubmit()
  {
    //console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
        .subscribe(
          data => this.handleSignUpResponse(data),
          error => this.handleSignUpError(error),
        )
  }

  handleSignUpResponse(data)
  {
    this.Token.handle(data.token);
    this.Auth.changeAuthStatus(true);
    this.router.navigate(['/my-profile']);
  }

  handleSignUpError(error)
  {
    this.error = error.error.errors;
  }


  /**
   *
   * Login Form Validation and submission
   **/

  // Create gettters for login controls

  get loginEmail()
  {
    return this.loginForm.get('email');
  }

  get loginPassword()
  {
    return this.loginForm.get('password');
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  errorMsg: boolean = false;

  onLoginSubmit()
  {
    this._registrationService.login(this.loginForm.value)
        .subscribe(
          data => this.handleLoginResponse(data),
          error => this.errorMsg= true,
        )
  }

  handleLoginResponse(data)
  {
    this.Token.handle(data.token);
    this.Auth.changeAuthStatus(true);
    this.router.navigate(['/my-profile']);
  }



}

