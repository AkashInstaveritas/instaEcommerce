import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  public categories = [];

  constructor(private _catogeriesService: CategoriesService) { }

  ngOnInit(): void {
    this._catogeriesService.getCategories()
    .subscribe(data => this.categories = data);
  }

}
