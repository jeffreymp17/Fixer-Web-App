import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { BreakdownsComponent } from './components/breakdowns/breakdowns.component';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard, LoginGuard } from './auth/auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CategoriesComponent,
    BreakdownsComponent,
    UsersComponent,
    UsersDetailComponent,
    SidenavComponent,
    DashboardComponent,
    LoginComponent,
    OrdersComponent,
  ],
  imports: [
   routes,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAO6rA_zsvfBtNmobVDRAjtzo54Gq_sSA4",
      authDomain: "fixer-cr.firebaseapp.com",
      storageBucket: "fixer-cr.appspot.com",
      projectId: "fixer-cr",
    }),
    AngularFireStorageModule
  ],
  providers: [
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
