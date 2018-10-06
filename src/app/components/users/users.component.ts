import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ResponseModel } from '../../models/response.model';
import { User } from '../../models/user.model';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';

declare var M:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private tableColumn = 's12';
  private fabIcon  =  'person_add';
  private fabColor  = 'green';
  private isUpdate = false;
  private isHiddenForm:boolean = true;
  private responseModel:ResponseModel;
  private users:User[];
  private pagination=[];
  public user:User = new User();

  constructor(private service:UserService,private router:Router) { }

  ngOnInit() {
  	this.getAllUsers();
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, []);

  }
  getAllUsers(url=null){
    url = url==null ? "users" : "users?page="+url;
    this.service.getAllUsers(url).subscribe( 
      data =>{
        this.responseModel=data;
        this.users=this.responseModel.data;
        this.getPaginate();
      },
      error => this.toastMessage(error,"rounded red",3000)

    );
  }
  onTap(){
    this.isHiddenForm=!this.isHiddenForm;
    if(!this.isHiddenForm){
      this.fabIcon     ='close';
      this.fabColor    ='red';
      this.tableColumn = 's8';
      !this.isUpdate ? this.user = new User() : "";
    }else{
      this.fabIcon     ='person_add';
      this.fabColor    ='green';
      this.tableColumn = 's12';
      this.isUpdate = false;
    }
  }

  public update(user:User){
      this.isHiddenForm=!this.isHiddenForm;
      this.service.updateUser(user).subscribe(
        user =>{
          this.toastMessage("successfully updated","rounded red",3000);
          this.getAllUsers();
          this.clearForm();
        },
        error => this.toastMessage(error,"rounded red",3000)

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
    this.service.saveUser(this.user).subscribe(
      res=>{
        this.users.unshift(res.data);
        this.toastMessage("successfully created","rounded green",3000);
        this.clearForm()
      },
      error => {
        this.toastMessage(error,"rounded red",3000);
      }
    );
  }

  public delete(userId:number){
      this.service.deleteUser(userId).subscribe(
        res=>{
          console.log('Delete',res);
          this.toastMessage("successfully deleted","rounded green",3000);
          this.getAllUsers();
        },
        error => {
          this.toastMessage(error,"rounded red",3000);
        }
      );
    }

  public toastMessage(html:string,type:string,duration:number){
      M.toast({html: html, classes: type,timeRemaining:duration});
  }

  public clearForm(){
    this.onTap();
    this.user = new User();
  }

  public getPaginate(){
    this.pagination =[];    
    for (var i = 1; i <= this.responseModel.meta.last_page; ++i) {
      this.pagination.push(i);
    }
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
    this.onTap()
  }

  goToDetail(id:number){
    //alert(id);
    this.router.navigate(["/users",id]);
  }
}
