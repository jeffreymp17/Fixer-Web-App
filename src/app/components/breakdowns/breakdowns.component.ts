import { Component, OnInit,NgZone, ViewChild } from '@angular/core';
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
	@ViewChild('form') form;

	createFormState:boolean=true;
	responseModel:ResponseModel=new ResponseModel();
	categories:Category[];
	category:Category;
	isUpdate:boolean;
	breakdowns:Breakdown[];
	pagination=[];
	breakdown:Breakdown;
	progressHidden:boolean = false;
	formTitle = "New";



	constructor(private categoryService:CategoryService,private breakdownService:BreakdownService,private zone:NgZone) {
		this.breakdown=new Breakdown();

	}

	ngOnInit() {
		this.getAllCategories();
		this.getAllBreakdowns();
		let select = document.querySelectorAll('select');
		let modal = document.querySelectorAll('.modal');
		M.FormSelect.init(select,[]);
		M.Modal.init(modal, []);


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
		this.breakdownService.getAllBreakdowns(page).subscribe(
			data=>{
				this.responseModel=data;
				this.breakdowns=this.responseModel.data;
				this.pagination=Pagination.getPaginate(this.responseModel);
				this.progressHidden = true;
			},
			error => Toast.danger(error,Toast.DURATION_SHORT)
		);
	}

	
	public saveBreakdown(){
		this.breakdownService.saveBreakdown(this.breakdown).subscribe(
			res=>{
				this.breakdowns.unshift(res.data);
          		Toast.success("successfully created",Toast.DURATION_LONG);
				this.clearForm();
				this.closeModal();
			},
			error => Toast.danger(error,Toast.DURATION_LONG)
		);
	}
	
	public actions(event){
		event.preventDefault();
		if(!this.isUpdate){
			this.saveBreakdown();
		}else{
			M.updateTextFields();
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
				this.closeModal();
			},
			error => Toast.danger(error,Toast.DURATION_LONG)

		);
	}

	clearForm(){
    	this.breakdown = new Breakdown();
		this.isUpdate=false;
		this.formTitle = "New";
		this.form.nativeElement.reset()
  	}

	private closeModal() {
		var elem= document.querySelector('.modal');
		var instance = M.Modal.init(elem);
		instance.close(); 
	}	
}
