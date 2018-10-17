import { Component, OnInit,NgZone } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { BreakdownService } from '../../services/breakdown.service';
import { ResponseModel } from '../../models/response.model';
import { Category } from '../../models/category.model';
import { Observable } from 'rxjs';
import { Breakdown } from '../../models/breakdown.model';
import { Pagination } from '../../utils/pagination.util';
import { Toast }  from  '../../utils/toast.util';

declare var M:any;

@Component({
	selector: 'app-breakdowns',
	templateUrl: './breakdowns.component.html',
	styleUrls: ['./breakdowns.component.css']
})
export class BreakdownsComponent implements OnInit {

	private createFormState:boolean=true;
	private responseModel:ResponseModel=new ResponseModel();
	private categories:Category[];
	private category:Category;
	private isUpdate:boolean;
	private breakdowns:Breakdown[];
	private materialIcon:string='add';
	private fabColor:string='gradient-45deg-green-teal';
	private pagination=[];
	public breakdown:Breakdown;


	constructor(private categoryService:CategoryService,private breakdownService:BreakdownService,private zone:NgZone) {
		this.breakdown=new Breakdown();

	}

	ngOnInit() {
		this.getAllCategories();
		this.initSelectCategory();
		this.getAllBreakdowns();
	}
	public getAllCategories(){
		this.categoryService.getAllCategories("category").subscribe(
			data=>{
				this.responseModel=data;
				this.categories=this.responseModel.data;
			}
		);
	}
	public getAllBreakdowns(url=null){
		let page =Pagination.getUrl(url,this.responseModel,"breakdown");
		this.breakdownService.getAllBreakdowns(page).subscribe((data)=>{
			this.responseModel=data;
			this.breakdowns=this.responseModel.data;
			this.pagination=Pagination.getPaginate(this.responseModel);
		});
	}
	public initSelectCategory(){
		let elems = document.querySelectorAll('select');
		let instances = M.FormSelect.init(elems,[]);
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
	public saveBreakdown(){
		this.breakdownService.saveBreakdown(this.breakdown).subscribe(
			res=>{
				this.breakdowns.push(res.data);
          		Toast.success("successfully created",Toast.DURATION_LONG);
				this.clearForm();
			},
			error => Toast.danger(error,Toast.DURATION_LONG)

		);
	}
	
	public actions(event){
		event.preventDefault();
		if(!this.isUpdate){
			this.saveBreakdown();
		}else{
      		this.updateBreakdown(this.breakdown);
		}
	}
	public deleteBreakdown(idBreakdown:number){
		if (confirm("Do you want delete it?")) {
			this.breakdownService.deleteBreakdown(idBreakdown).subscribe(
				res=>{
          			Toast.success("successfully deleted",Toast.DURATION_LONG);
					this.getAllBreakdowns();
				},
				error => Toast.danger(error,Toast.DURATION_LONG)
			);
		}
	}
	public getBreakdown(breakdownId:number){
		this.onTap();
		this.isUpdate=!this.isUpdate;
		let auxBreakdown=new Breakdown();
		this.breakdowns.forEach((breakdown)=>{
            if(breakdown.id==breakdownId){
            	auxBreakdown=breakdown;
            }
		});
		this.breakdown=auxBreakdown;
	}
	public updateBreakdown(breakdown:Breakdown){
    	this.breakdownService.updateBreakdown(breakdown).subscribe(
    		res=>{
       			this.getAllBreakdowns();
          		Toast.success("successfully updated",Toast.DURATION_LONG);
				this.clearForm();
			},
			error => Toast.danger(error,Toast.DURATION_LONG)

		);
	}

	clearForm(){
    	this.breakdown = new Breakdown();
    	this.isUpdate=false;
  	}

}
