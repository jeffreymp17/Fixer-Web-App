import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseModel } from '../../models/response.model';
import { User } from  '../../models/user.model';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Toast }  from  '../../utils/toast.util';

declare var M:any;

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
 
  userId;
  selectedFile: File;
  public user:User = new User();
  responseModel:ResponseModel=new ResponseModel();
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  isHidden: Boolean = true;

  @ViewChild('form') form;

  constructor(private service:UserService, 
              private route: ActivatedRoute,
              private afStorage: AngularFireStorage) { }

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

  fireBaseUpload(){
    this.isHidden = false;
    Toast.info("Updating...");
    this.ref = this.afStorage.ref(this.userId+"");
    this.task = this.ref.put(this.selectedFile);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.closeModal();

    this.uploadProgress.subscribe(data=>{
      if(data == 100) 
        this.ref.getDownloadURL().subscribe(
          url=>{
            this.isHidden = true;
            this.user.picture = url;
            this.update(this.user);
          }
        );
    });
  }

  public update(user:User){
    this.service.updateUser(user).subscribe(
      user =>{
        Toast.success("successfully updated",Toast.DURATION_SHORT);
        
      },
      error => Toast.danger(error,Toast.DURATION_LONG)
    )
  }
  private closeModal() {
    var elem= document.querySelector('.modal');
    var instance = M.Modal.init(elem);
    instance.close(); 
  }
  clearForm(){
    this.form.nativeElement.reset()
  }
}
