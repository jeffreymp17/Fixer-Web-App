import { Component,OnInit,NgZone } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ResponseModel } from '../../models/response.model';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';
import { Pagination } from '../../utils/pagination.util';
import { Toast } from '../../utils/toast.util';

declare var M:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  createFormState:boolean=true;
  responseModel:ResponseModel;
  categories:Category[];
  category:Category;
  isUpdate:boolean;
  materialIcon:string='add';
  fabColor:string='gradient-45deg-green-teal';
  pagination=[];

  constructor(private service:CategoryService,private zone:NgZone) {
    this.category=new Category();
  }

  ngOnInit() {
    this.responseModel =new ResponseModel();
    this.getAllCategories();
  }

  onTap(){
    this.createFormState=!this.createFormState;
    if(!this.createFormState){
      this.materialIcon='close';
      this.fabColor='gradient-45deg-red-pink';
    }else{
      this.materialIcon='add';
      this.fabColor='gradient-45deg-green-teal';
      this.clearForm();
    }
  }
 
  getAllCategories(url=null){
    let page =Pagination.getUrl(url,this.responseModel,"category");
    this.service.getAllCategories(page).subscribe(
      data => {
        this.responseModel=data;
        this.categories=this.responseModel.data;
        this.pagination=Pagination.getPaginate(this.responseModel);
      }
    );
  }

  public saveCategory(){
    this.service.saveCategory(this.category).subscribe(
      res=>{
        this.categories.push(res.data);
        Toast.success("successfully created",Toast.DURATION_LONG);
        this.clearForm();
      },
      error => Toast.danger(error,Toast.DURATION_LONG)
    );
  }
  public deleteCategory(categoryId:number){
    if (confirm("Do you want delete it?")) {
      this.service.deleteCategory(categoryId).subscribe(
        res=>{
          Toast.success("successfully deleted",Toast.DURATION_LONG);
          this.getAllCategories();
        },
        error => Toast.danger(error,Toast.DURATION_LONG)
      );
    }
  }
  public getCategory(categoryId:number){
    this.onTap();
    this.isUpdate=!this.isUpdate;
    this.createFormState=!this.createFormState;
    let auxCategory = new Category();
    this.categories.forEach(category=>{
      if(category.id==categoryId){
        auxCategory=category;
      }
    });
    this.category=auxCategory;
  }

  public updateCategory(category){
    this.isUpdate=!this.isUpdate;
    this.createFormState=!this.createFormState;
    this.service.updateCategory(category).subscribe(
      category=>{
        Toast.success("successfully updated",Toast.DURATION_LONG);
        this.getAllCategories();
        this.clearForm();
      },
      error => Toast.danger(error,Toast.DURATION_LONG)
    );
  }

  public actions(event){
    event.preventDefault();
    if(this.isUpdate){
      M.updateTextFields();
      this.updateCategory(this.category);

    }else{
      this.saveCategory();
    }
  }

  clearForm(){
    this.category = new Category();
    this.isUpdate=false;
  }
}
