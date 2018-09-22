import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ResponseModel } from '../../models/response.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

declare var M:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private responseModel:ResponseModel;
  private users:User[];

  constructor(private service:UserService) { }

  ngOnInit() {
  	this.getAllUsers();
  }
 getAllUsers(){
      this.service.getAllUsers().subscribe((data)=>{
        this.responseModel=data;
        this.users=this.responseModel.data;
        console.log('model',this.users);
      });
    }
}
