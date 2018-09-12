import { Component, OnInit ,OnDestroy,NgZone} from '@angular/core';
declare var M:any;
@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.css']
})
export class TechniciansComponent implements OnInit,OnDestroy{
  private createFormState:boolean=true;
  constructor() { 
  }
  ngOnInit() { 
    this.initFloatingActionButton();
  }
  ngOnDestroy(){

  }


  onTap(){
    this.createFormState=!this.createFormState;
    console.log(this.createFormState);
  }
  initFloatingActionButton(){
    let elems = document.querySelectorAll('.fixed-action-btn');
    let instances = M.FloatingActionButton.init(elems,{
      position:'top'
    });
  }

}
