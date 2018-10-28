import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private session = new BehaviorSubject(this.isUserInSesion());
  
  public get isInSession(){
      return this.session;
  }
  
  private isUserInSesion(){
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
    }
    return false;
}
  constructor(private http: HttpClient) { }

  login(data):Observable<any>{
    return this.http.post(environment.apiUrl+'login',data)
    		.pipe(catchError(this.errorHandler))    
  }

  logout(data):Observable<any>{
    return this.http.post<any>(environment.apiUrl+"logout/",data)
    .pipe(catchError(this.errorHandler))    
  }

  errorHandler(httpError: HttpErrorResponse){
    return observableThrowError(httpError.error[0] || "Server error");
 }
 
}
