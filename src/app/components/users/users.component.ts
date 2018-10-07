import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ResponseModel } from '../../models/response.model';
import { User } from '../../models/user.model';
import { Links } from '../../models/links.model';
import { Meta } from '../../models/meta.model';
import {Router} from "@angular/router";

declare var M:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private isUpdate = false;
  private formTitle = "New";
  private responseModel:ResponseModel=new ResponseModel();
  private users:User[];
  private pagination=[];
  public user:User = new User();

  constructor(private service:UserService,private router:Router) { }

  ngOnInit() {
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
    let url = this.getUrl(page);
    this.service.getAllUsers(url).subscribe( 
      data =>{
        this.responseModel=data;
        this.users=this.responseModel.data;
        this.getPaginate();
      },
      error => this.toastMessage(error,"rounded red",3000)

    );
  }

  public update(user:User){
    var birthdate = (<HTMLInputElement>document.getElementById('birthdate')).value;
    this.user.birthdate = birthdate;
      this.service.updateUser(user).subscribe(
        user =>{
          this.toastMessage("successfully updated","rounded green",3000);
          this.getAllUsers();
          this.clearForm();
          this.closeModal();
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
    var birthdate = (<HTMLInputElement>document.getElementById('birthdate')).value;
    this.user.birthdate = birthdate;
    this.service.saveUser(this.user).subscribe(
      res=>{
        this.users.unshift(res.data);
        this.toastMessage("successfully created","rounded green",3000);
        this.clearForm();
        this.closeModal();
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
    this.user = new User();
    this.isUpdate=false;
    this.formTitle = "New";
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
    this.formTitle = "Update";
  }

  goToDetail(id:number){
    //alert(id);
    this.router.navigate(["/users",id]);
  }

  private closeModal() {
    var elem= document.querySelector('.modal');
    var instance = M.Modal.init(elem);
    instance.close(); 
  }

  private getUrl(page){
    if(page ==  null){
      return "users";
    }
    else{
      let last_page = this.responseModel.meta.last_page
      page = page < last_page ? page : last_page; 
      return "users?page="+page;
    }
  }
}
