import { Routes,RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BreakdownsComponent } from './components/breakdowns/breakdowns.component';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard, LoginGuard } from './auth/auth.guard';

const appRoutes:Routes=[

	{ path:'',component:HomeComponent, canActivate:[AuthGuard]},
	{ path:"categories",component:CategoriesComponent,canActivate:[AuthGuard] },
	{ path:"breakdowns",component:BreakdownsComponent,canActivate:[AuthGuard] },
	{ path:"users",component:UsersComponent,canActivate:[AuthGuard] },
	{ path:"users/:id",component:UsersDetailComponent,canActivate:[AuthGuard] },
	{ path:"dashboard", component:DashboardComponent,canActivate:[AuthGuard] },
	{ path:"login", component:LoginComponent, canActivate:[LoginGuard]},

	    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
export const routes:ModuleWithProviders=RouterModule.forRoot(appRoutes);
