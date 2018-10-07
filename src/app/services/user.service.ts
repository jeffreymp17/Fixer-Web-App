import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse
,HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAllUsers(url):Observable<ResponseModel>{
  	return this.http.get<ResponseModel>(environment.apiUrl+url)
  			.pipe(catchError(this.errorHandler));
  }

  getUser(id):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(environment.apiUrl+'users/'+id)
        .pipe(catchError(this.errorHandler));
  }

  saveUser(user:User):Observable<any>{
    console.log("USER",user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body=JSON.stringify(user);
    return this.http.post(environment.apiUrl+'users',user)
    		.pipe(catchError(this.errorHandler))    
  }
  deleteUser(userId:number){
    return this.http.delete<User>(environment.apiUrl+'users/'+userId)
          .pipe(catchError(this.errorHandler));
  }
  updateUser(user:User){
    return this.http.put<User>(environment.apiUrl+'users/'+user.id,user)
            .pipe(catchError(this.errorHandler));
  }
  errorHandler(httpError: HttpErrorResponse){
  	 return observableThrowError(httpError.error[0] || "Server error");
  }
}
