import { Component, OnInit,NgZone } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {BreakdownService} from '../../services/breakdown.service';
import {ResponseModel} from '../../models/response.model';
import {Category} from '../../models/category.model';
import  {Observable} from 'rxjs';
import  {Breakdown} from '../../models/breakdown.model';
declare var M:any;

@Component({
	selector: 'app-breakdowns',
	templateUrl: './breakdowns.component.html',
	styleUrls: ['./breakdowns.component.css']
})
export class BreakdownsComponent implements OnInit {
	private createFormState:boolean=true;
	private responseModel:ResponseModel;
	private categories:Category[];
	private category:Category;
	private update:boolean;
	private breakdowns:Breakdown[];
	private materialIcon:string='add';
	private breakdown:Breakdown=new Breakdown(null,null,null);
	constructor(private categoryService:CategoryService,private breakdownService:BreakdownService,private zone:NgZone) {
	}

	ngOnInit() {
		this.initSelectCategory();
		this.getAllCategories();
		this.getAllBreakdowns();
	}
	public getAllCategories(){
		this.categoryService.getAllCategories().subscribe((data)=>{
			this.responseModel=data;
			this.categories=this.responseModel.data;
			console.log("model",this.categories);
		});
	}
	public getAllBreakdowns(){
		this.breakdownService.getAllBreakdowns().subscribe((data)=>{
			let res=new ResponseModel();
			res=data;
			this.breakdowns=res.data;
			console.log("response breakdown:",this.breakdowns);

		})
	}
	public initSelectCategory(){
		document.addEventListener('DOMContentLoaded', function() {
			let elems = document.querySelectorAll('select');
			let instances = M.FormSelect.init(elems);
		});
	}
	public saveBreakdown(){
		console.log('BREAKDOWN:',this.breakdown);
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
	public saveCategory(){
		console.log("Category:",this.category);
		this.breakdownService.saveBreakdown(this.breakdown).subscribe((res=>{
			console.log("data",res);
			this.breakdowns.push(res.data);
			console.log(this.breakdown);
			this.toastMessage("successfully created","rounded",3000);

		}));
	}
	public toastMessage(html:string,type:string,duration:number){
		M.toast({html: html, classes: type,timeRemaining:duration});

	}
	public actions(event){
		event.preventDefault();
		this.saveCategory();
	}
	public deleteBreakdown(idBreakdown:number){
      this.breakdownService.deleteBreakdown(idBreakdown).subscribe((res=>{
        console.log(res);
         this.toastMessage("successfully deleted","rounded",3000);
        this.getAllBreakdowns();
      }));
    }

}
