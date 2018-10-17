import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ResponseModel } from '../../models/response.model';
import { User } from '../../models/user.model';
import { Links } from '../../models/links.model';
import { Meta } from '../../models/meta.model';
import { Router } from "@angular/router";
import { Pagination } from '../../utils/pagination.util';
import { Toast }  from  '../../utils/toast.util';

declare var M:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('form') form;
  private currentUser:User; 
  private isUpdate = false;
  private isMale=false;
  private formTitle = "New";
  private responseModel:ResponseModel=new ResponseModel();
  private users:User[];
  private pagination=[];
  public user:User = new User();

  constructor(private service:UserService,private router:Router) { }

  ngOnInit() {
    this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
  	this.getAllUsers();
    let select = document.querySelectorAll('select');
    let modals = document.querySelectorAll('.modal');
    let datepicker = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(datepicker, {'container': 'body',
      'format':'yyyy-mm-dd','yearRange':35});
    var instances = M.Modal.init(modals, []);
    var instances = M.FormSelect.init(select, []);
  }

  getAllUsers(page=null){
    let url = Pagination.getUrl(page,this.responseModel,"users");
    this.service.getAllUsers(url).subscribe( 
      data =>{
        this.responseModel=data;
        this.users=this.responseModel.data;
        this.pagination = Pagination.getPaginate(this.responseModel);
      },
      error => Toast.danger(error,Toast.DURATION_LONG)
    );
  }

  public update(user:User){
    var birthdate = (<HTMLInputElement>document.getElementById('birthdate')).value;
    this.user.birthdate = birthdate;
      this.service.updateUser(user).subscribe(
        user =>{
          Toast.success("successfully updated",Toast.DURATION_LONG);
          this.getAllUsers();
          this.clearForm();
          this.closeModal();
        },
        error => Toast.danger(error,Toast.DURATION_LONG)

      )
    }
  public actions(event){
      event.preventDefault();
      if(this.isUpdate){
        M.updateTextFields();
        this.update(this.user);
      }else{
        this.save();
      }
    }

  public save(){
    var birthdate = (<HTMLInputElement>document.getElementById('birthdate')).value;
    this.user.birthdate = birthdate;
    this.service.saveUser(this.user).subscribe(
      res=>{
        this.users.unshift(res.data);
          Toast.success("successfully created",Toast.DURATION_LONG);
        this.clearForm();
        this.closeModal();
      },
      error => Toast.danger(error,Toast.DURATION_LONG)

    );
  }

  public delete(userId:number){
    
    if (confirm("do you want delete it?")) {
     this.service.deleteUser(userId).subscribe(
        res=>{
          Toast.success("successfully deleted",Toast.DURATION_LONG);
          this.getAllUsers();
        },
        error => Toast.danger(error,Toast.DURATION_LONG)
      );
    }
      
  }

  public clearForm(){
    this.user = new User();
    this.isUpdate=false;
    this.formTitle = "New";
    this.form.nativeElement.reset()

  }

  genderHandle(event){
    this.user.gender = event.target.value;
  }
  
  public getUser(id:number){
    var auxUser = new User()
    this.users.forEach(function(user:User) {
      if (user.id===id) {
        auxUser = user;
      }
    });
    this.user = auxUser;
    this.isUpdate = !this.isUpdate;
    this.user.gender=="male" ?  this.isMale = true : this.isMale = false;
    this.formTitle = "Update";
  }

  private goToDetail(id:number){
    this.router.navigate(["/users",id]);
  }

  private closeModal() {
    var elem= document.querySelector('.modal');
    var instance = M.Modal.init(elem);
    instance.close(); 
  }

}
