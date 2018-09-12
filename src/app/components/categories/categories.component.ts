import { Component, OnInit,NgZone,OnDestroy} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ResponseModel} from '../../models/response.model';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit,OnDestroy {
  private createFormState:boolean=true;
  private responseModel:ResponseModel;
  private categories;
  constructor(private service:CategoryService,private zone:NgZone) { }

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
console.log("model",this.responseModel.data);
  	});
  }

}
