import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';




@NgModule({
  declarations: [MainNavComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MainNavComponent, FooterComponent]
})
export class CoreModule { }
