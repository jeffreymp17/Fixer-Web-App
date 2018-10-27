import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {ResponseModel} from '../models/response.model';
import {Links} from '../models/links.model';
import {Date} from '../models/date.model';
import { environment } from '../../environments/environment';
import {map}from'rxjs/operators';
import {ServiceError} from '../utils/serviceError.util';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class Login {

  constructor(private http: HttpClient) { 

  }
  
  login(data):Observable<any>{
    console.log("Data",data);
    return this.http.post(environment.apiUrl+'login/',data)
      .pipe(catchError(ServiceError.errorHandler));
  }
}
