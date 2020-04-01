import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  public categories = [];
  public loggedIn: boolean;

  constructor
  (
    private _catogeriesService: CategoriesService,
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService
  ) { }

  ngOnInit(): void {
    this._catogeriesService.getCategories()
    .subscribe(data => this.categories = data);

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent)
  {
    event.preventDefault();

    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigate(['/logIn']);
  }

}
