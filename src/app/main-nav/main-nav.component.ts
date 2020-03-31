import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { AuthService } from '../Service/auth.service';

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
    private Auth: AuthService
  ) { }

  ngOnInit(): void {
    this._catogeriesService.getCategories()
    .subscribe(data => this.categories = data);

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

}
