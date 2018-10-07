import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseModel } from '../../models/response.model';
import { User } from  '../../models/user.model';

declare var M:any;

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
 
  private  userId;
  public user:User = new User();
  private responseModel:ResponseModel=new ResponseModel();


  constructor(private service:UserService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.userId = this.route.snapshot.params.id;
  	this.getUser(this.userId);
  }

  getUser(id:number){
    this.service.getUser(id).subscribe( 
      data =>{
        this.responseModel=data;
        this.user = this.responseModel.data;
        let year =  this.user.created_at != null ? this.user.created_at.date.split(" "):[];
        this.user.created_at.date = year[0];
        console.log("USER",this.user);

      },
      error => this.toastMessage(error,"rounded red",3000)

    );
  }

  toastMessage(html:string,type:string,duration:number){
      M.toast({html: html, classes: type,timeRemaining:duration});
  }

}
