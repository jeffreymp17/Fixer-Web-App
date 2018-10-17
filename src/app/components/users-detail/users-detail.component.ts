import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseModel } from '../../models/response.model';
import { User } from  '../../models/user.model';

declare var M:any;

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
 
  private  userId;
  selectedFile: File;
  public user:User = new User();
  private responseModel:ResponseModel=new ResponseModel();
  @ViewChild('form') form;

  constructor(private service:UserService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.userId = this.route.snapshot.params.id;
  	this.getUser(this.userId);
    let modals = document.querySelectorAll('.modal');
    var instances = M.Modal.init(modals, []);
  }



  getUser(id:number){
    this.service.getUser(id).subscribe( 
      data =>{
        this.responseModel=data;
        this.user = this.responseModel.data;
        let year =  this.user.created_at != null ? this.user.created_at.date.split(" "):[];
        this.user.created_at.date = year[0];
        console.log("USER",this.user);

      },
      error => this.toastMessage(error,"rounded red",3000)

    );
  }

  toastMessage(html:string,type:string,duration:number){
      M.toast({html: html, classes: type,timeRemaining:duration});
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('picture', this.selectedFile, this.selectedFile.name);
    
    this.service.uploadPicture(this.user.id,uploadData).subscribe( 
      data => {
       this.toastMessage("Picture updated", "rounded green",3000);
       this.closeModal();
       this.getUser(this.user.id);
       this.clearForm();
      },
      error => this.toastMessage(error,"rounded red",3000)
    );
  }
  private closeModal() {
    var elem= document.querySelector('.modal');
    var instance = M.Modal.init(elem);
    instance.close(); 
  }
  private clearForm(){
    this.form.nativeElement.reset()
  }
}
