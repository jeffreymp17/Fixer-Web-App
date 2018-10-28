import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data):Observable<any>{
    return this.http.post(environment.apiUrl+'login',data)
    		.pipe(catchError(this.errorHandler))    
  }

  errorHandler(httpError: HttpErrorResponse){
    return observableThrowError(httpError.error[0] || "Server error");
 }
}
