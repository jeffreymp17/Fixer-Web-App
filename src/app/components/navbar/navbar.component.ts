import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private currentUser:User; 
  constructor(private service:AuthenticationService) { }

  ngOnInit() {
  	this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));

  }

  logout(){
  	this.service.logout(this.currentUser.email,this.currentUser.token);
  }
}
