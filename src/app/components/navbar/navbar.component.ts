import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Toast }  from  '../../utils/toast.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser:User; 
  constructor(private service:AuthService) { }

  ngOnInit() {
  	this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(){
    let authData = { email: this.currentUser.email, api_token: this.currentUser.token };
  	this.service.logout(authData).subscribe(
      res=>{
        Toast.success(res,Toast.DURATION_SHORT);
        localStorage.removeItem('currentUser');
        this.service.isInSession.next(false);
      },
      error=> Toast.danger(error,Toast.DURATION_SHORT)
    );
  }
}
