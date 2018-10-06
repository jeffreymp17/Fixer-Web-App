import { Routes,RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BreakdownsComponent } from './components/breakdowns/breakdowns.component';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes:Routes=[
	{ path:'',redirectTo:'/home',pathMatch:'full' },
	{ path:'home',component:HomeComponent },
	{ path:"categories",component:CategoriesComponent },
	{ path:"breakdowns",component:BreakdownsComponent },
	{ path:"users",component:UsersComponent },
	{ path:"users/:id",component:UsersDetailComponent },
	{ path:"dashboard", component:DashboardComponent }
];
export const routes:ModuleWithProviders=RouterModule.forRoot(appRoutes);
