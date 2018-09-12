import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routes} from './app.router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TechniciansComponent,
    CategoriesComponent
  ],
  imports: [
   routes,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
