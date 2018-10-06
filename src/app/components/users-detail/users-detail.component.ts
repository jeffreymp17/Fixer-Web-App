import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
 
  private  userId;
  private route: ActivatedRoute;

  constructor() { }

  ngOnInit() {
  	this.userId = this.route.snapshot.paramMap.get('id');
  }

}
