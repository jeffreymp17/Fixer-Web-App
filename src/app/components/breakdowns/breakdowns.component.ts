import { Component, OnInit,NgZone } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {BreakdownService} from '../../services/breakdown.service';
import {ResponseModel} from '../../models/response.model';
import {Category} from '../../models/category.model';
import  {Observable} from 'rxjs';
import  {Breakdown} from '../../models/breakdown.model';
import {PaginationUtils} from '../../utils/Pagination';
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
	private update:boolean;
	private breakdowns:Breakdown[];
	private materialIcon:string='add';
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
		this.categoryService.getAllCategories().subscribe((data)=>{
			this.responseModel=data;
			this.categories=this.responseModel.data;
			console.log("model",this.categories);
		});
	}
	public getAllBreakdowns(url=null){
		let page =PaginationUtils.getUrl(url,this.responseModel,"breakdown");
		this.breakdownService.getAllBreakdowns(page).subscribe((data)=>{
			this.responseModel=data;
			this.breakdowns=this.responseModel.data;
			PaginationUtils.getPaginate(this.responseModel);
			console.log("response:",this.responseModel);

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
			this.toastMessage("successfully created","rounded gradient-45deg-green-teal",3000);

		}));
	}
	public toastMessage(html:string,type:string,duration:number){
		M.toast({html: html, classes: type,timeRemaining:duration});

	}
	public actions(event){
		event.preventDefault();
		if(!this.update){
		this.saveCategory();
	}else{
      this.updateBreakdown(this.breakdown);
	}
	}
	public deleteBreakdown(idBreakdown:number){
		this.breakdownService.deleteBreakdown(idBreakdown).subscribe((res=>{
			console.log(res);
			this.toastMessage("successfully deleted","rounded gradient-45deg-green-teal",3000);
			this.getAllBreakdowns();
		}));
	}
	public getBreakdown(breakdownId:number){
		this.onTap();
		this.update=!this.update;
		let auxBreakdown=new Breakdown();
		this.breakdowns.forEach((breakdown)=>{
            if(breakdown.id==breakdownId){
            	auxBreakdown=breakdown;
            }
		});
		this.breakdown=auxBreakdown;
		console.log("aux",this.breakdown);
	}
	public updateBreakdown(breakdown:Breakdown){
       this.breakdownService.updateBreakdown(breakdown).subscribe((res=>{
       	console.log("UPDATING BREAKDWON:",res);
       	this.getAllBreakdowns();
        this.toastMessage("successfully updated","rounded gradient-45deg-green-teal",3000);

       }));
	}

}
