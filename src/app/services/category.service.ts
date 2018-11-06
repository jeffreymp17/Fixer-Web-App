import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {ResponseModel} from '../models/response.model';
import { environment } from '../../environments/environment';
import {ServiceError} from '../utils/serviceError.util';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { 

  }
  
  getCategory(id):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(environment.apiUrl+'category/'+id)
      .pipe(catchError(ServiceError.errorHandler));
  }

  getAllCategories(url):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(environment.apiUrl+url)
      .pipe(catchError(ServiceError.errorHandler));
  }
  saveCategory(category:Category):Observable<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body=JSON.stringify(category);
    console.log(category);
    return this.http.post(environment.apiUrl+'category',category)
      .pipe(catchError(ServiceError.errorHandler));
  }

  deleteCategory(idCategory:number){
    return this.http.delete<Category>(environment.apiUrl+'category/'+idCategory)
      .pipe(catchError(ServiceError.errorHandler));
  }
  updateCategory(category:Category){
    return this.http.put<Category>(environment.apiUrl+'category/'+category.id,category)
      .pipe(catchError(ServiceError.errorHandler));
  }
}
