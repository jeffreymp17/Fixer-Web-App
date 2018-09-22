import {Routes,RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import{TechniciansComponent} from './components/technicians/technicians.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {BreakdownsComponent} from './components/breakdowns/breakdowns.component';
import { UsersComponent } from './components/users/users.component';

const appRoutes:Routes=[
{path:'',redirectTo:'/home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:"technicians",component:TechniciansComponent},
{path:"categories",component:CategoriesComponent},
{path:"breakdowns",component:BreakdownsComponent},
{path:"users",component:UsersComponent}
];
export const routes:ModuleWithProviders=RouterModule.forRoot(appRoutes);
