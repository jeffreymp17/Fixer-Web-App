import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {ServiceError} from '../utils/serviceError.util';

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
        return true;
    }
    return false;
}
  constructor(private http: HttpClient) { }

  login(data):Observable<any>{
    return this.http.post(environment.apiUrl+'login',data)
    		.pipe(catchError(ServiceError.errorHandler))    
  }

  logout(data):Observable<any>{
    return this.http.post<any>(environment.apiUrl+"logout",data)
      .pipe(catchError(ServiceError.errorHandler))    
  }
 
}
