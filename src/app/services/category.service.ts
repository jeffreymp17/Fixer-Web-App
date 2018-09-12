import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {Meta} from '../models/meta.model';
import {ResponseModel} from '../models/response.model';
import {Links} from '../models/links.model';
import {Date} from '../models/date.model';
import { environment } from '../../environments/environment';
import {map}from'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { 

  }
  getCategory(idCategory:any):Observable<any>{
      return this.http.get<any>(environment.apiUrl+"category/"+idCategory).pipe(map((res)=>{
           return new Category(res.data.id
           	,res.data.description
           	,new Date(res.data.created_at.date,res.data.created_at.timezone_type,res.data.created_at.timezone));
      
       }));
  }
  getAllCategories():Observable<ResponseModel>{
      return this.http.get<ResponseModel>(environment.apiUrl+"category").pipe(map((res:ResponseModel)=>res));
  }
}
