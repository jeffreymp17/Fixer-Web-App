import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

declare var M:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(private service:AuthenticationService, private router:Router) { }

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
      this.service.login(this.email,this.password).subscribe( 
      data =>{
        this.router.navigate(['/']);

        this.toastMessage("Welcome "+data.name,"rounded gradient-45deg-green-teal",2000);
      },
      error => this.toastMessage(error,"rounded red",3000)

    );
  }

  private toastMessage(html:string,type:string,duration:number){
      M.toast({html: html, classes: type,timeRemaining:duration});
  }

}
