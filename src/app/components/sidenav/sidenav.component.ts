import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  currentUser:User; 
  constructor(private router:Router) {
  }

  ngOnInit() {
	  this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
  }
  
}
