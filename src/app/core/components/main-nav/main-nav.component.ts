import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';



@Component({
  selector: 'app-main-nav',
  templateUrl: `main-nav.component.html`,
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  public categories: any = [];
  public mainCategories: any = [];
  public loggedIn: boolean;
  public touchedSubcategory: boolean = false;

  constructor
  (
    private _catogeriesService: CategoriesService,
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private _subCategories: SubCategoriesService,
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


  getSubCategories(event: MouseEvent, id)
  {
    event.preventDefault();
    this.touchedSubcategory = true;

    this._subCategories.getSubCategories(id)
    .subscribe(data => this.mainCategories = data);

  }

  getProducts(event: MouseEvent, id)
  {
    event.preventDefault();


    this.router.navigate(['/products/' + id]);
  }

  subDataDisappear(event: MouseEvent)
  {
    this.touchedSubcategory = false;
  }

}
