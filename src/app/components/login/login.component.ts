import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast }  from  '../../utils/toast.util';
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
    this.progressHidden = false;
    let authData = { email: this.email, password: this.password, app:"web" };
    this.service.login(authData).subscribe(
      res=> {
          let user = res.data;
          if(user && user.token){
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/']);
            Toast.success("Welcome "+user.name,Toast.DURATION_SHORT);
            this.progressHidden=true;
            this.service.isInSession.next(true);
          }
      },
      error =>{
        Toast.danger(error,Toast.DURATION_SHORT);
        this.progressHidden=true;
      }
    );
  }
}
