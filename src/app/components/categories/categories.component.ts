import { Component, OnInit,NgZone,OnDestroy} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ResponseModel} from '../../models/response.model';
import {Category} from '../../models/category.model';
import  {Observable} from 'rxjs';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit,OnDestroy {
  private createFormState:boolean=true;
  private responseModel:ResponseModel;
  private categories:Category[];
  private category:Category;
  constructor(private service:CategoryService,private zone:NgZone) {
  this.category=new Category(null,null,null);}

  ngOnInit() {
  	this.getAllCategories();
  }
  onTap(){
    this.createFormState=!this.createFormState;
    console.log(this.createFormState);
  }
  ngOnDestroy(){

  }
  getAllCategories(){
  	this.service.getAllCategories().subscribe((data)=>{
  		 this.responseModel=data;
       this.categories=this.responseModel.data;
console.log("model",this.categories);
  	});
  }
 public saveCategory(){
    console.log("Category:",this.category);
    this.service.saveCategory(this.category).subscribe((res=>{
      console.log("data",res);
    }));
  }
  public deleteCategory(idCategory:number){
     this.service.deleteCategory(idCategory).subscribe(
         data => {
          
           return true;
         }
      );
  }

}
