import { Component, OnInit ,OnDestroy,NgZone} from '@angular/core';
@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit,OnDestroy{
   private createFormState:boolean;
  constructor() { 
  	this.createFormState=true;
  }
  ngOnInit() { 
  }
  ngOnDestroy(){

  }


  onTap(){
    this.createFormState=false;
      	console.log(this.createFormState);
  }

}
