import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routes} from './app.router';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { BreakdownsComponent } from './components/breakdowns/breakdowns.component';
import { UsersComponent } from './components/users/users.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TechniciansComponent,
    CategoriesComponent,
    BreakdownsComponent,
    UsersComponent,
  ],
  imports: [
   routes,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
