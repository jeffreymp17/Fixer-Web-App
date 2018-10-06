import { Component, OnInit,NgZone,OnDestroy} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ResponseModel} from '../../models/response.model';
import {Category} from '../../models/category.model';
import  {Observable} from 'rxjs';
declare var M:any;

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
  private update:boolean;
  private materialIcon:string='add';
  constructor(private service:CategoryService,private zone:NgZone) {
    this.category=new Category(null,null,null);}

    ngOnInit() {
      this.getAllCategories();
    }
    onTap(){
      this.createFormState=!this.createFormState;
      if(!this.createFormState){
        this.materialIcon='close';
      }else{
        this.materialIcon='add';
      }
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
        this.categories.push(res.data);
        console.log(this.categories);
        this.toastMessage("successfully created","rounded",3000);

      }));
    }
    public deleteCategory(idCategory:number){
      this.service.deleteCategory(idCategory).subscribe((res=>{
        console.log(res);
        this.toastMessage("successfully deleted","rounded",3000);
        this.getAllCategories();
      }));
    }
    public getCategory(idCategory:number){
      this.update=!this.update;
      this.createFormState=!this.createFormState;
      this.service.getCategory(idCategory).subscribe((category=>{
        console.log(category);
        this.category=category;
      }))
    }
    public updateCategory(category){
      this.update=!this.update;
      this.createFormState=!this.createFormState;
      this.service.updateCategory(category).subscribe((category=>{
        console.log("updated:",category);
        this.toastMessage("successfully updated","rounded",3000);
        this.getAllCategories();
      }))
    }
    public actions(event){
      event.preventDefault();
      if(this.update){
        console.log("update",this.category);
        M.updateTextFields();
        this.updateCategory(this.category);

      }else{
        this.saveCategory();
      }
    }
    public toastMessage(html:string,type:string,duration:number){
      M.toast({html: html, classes: type,timeRemaining:duration});

    }

  }
