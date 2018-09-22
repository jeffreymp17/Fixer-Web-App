import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ResponseModel} from '../models/response.model';
import {map}from'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAllUsers():Observable<ResponseModel>{
  	return this.http.get<ResponseModel>(environment.apiUrl+"users").pipe(map((res:ResponseModel)=>res));
  }
}
