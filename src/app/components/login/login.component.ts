import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

declare var M:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  progressHidden:boolean = true;

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit() {
  	const body = document.getElementsByTagName('body')[0];
    body.classList.add('gradient-90deg-cyan-light-green');
  }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('gradient-90deg-cyan-light-green');
  }

  actions(event){
    event.preventDefault();
    M.updateTextFields();
    this.login();
  }

  login(){
    let authData = { email: this.email, password: this.password, app:"web" };
    this.service.login(authData).subscribe(
      res=> {
          console.log(res.data);
      },
      error=> console.log(error)
    );
  }
  /*login(){
    this.progressHidden = false;
    let data = { email: this.email, password: this.password, app:"web" };
    this.service.login(data).subscribe(
      data => {
        let user = data.data;
        console.log("user",user);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.service.getLoggedIn.next(true);

          this.router.navigate(['/']);
          this.toastMessage("Welcome "+user.name,"rounded gradient-45deg-green-teal",2000);
          this.progressHidden=true;
        }
      },
      error =>{
        this.toastMessage(error,"rounded red",3000);
        this.progressHidden=true;
      }
    );
  }*/

}
