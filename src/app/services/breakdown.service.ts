import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError,Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {Meta} from '../models/meta.model';
import {ResponseModel} from '../models/response.model';
import {Links} from '../models/links.model';
import {Date} from '../models/date.model';
import { environment } from '../../environments/environment';
import {map}from'rxjs/operators';
import {Breakdown} from '../models/breakdown.model';
import { catchError } from 'rxjs/operators';
import {ServiceError} from '../utils/serviceError.util';
@Injectable({
  providedIn: 'root'
})
export class BreakdownService {

  constructor(private http: HttpClient) { }



  getAllBreakdowns(url):Observable<ResponseModel>{
  	return this.http.get<ResponseModel>(environment.apiUrl+url).pipe(map((res:ResponseModel)=>res));
  }
   saveBreakdown(breakdown:Breakdown):Observable<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body=JSON.stringify(breakdown);
    return this.http.post(environment.apiUrl+'breakdown',breakdown).pipe(map((res=>res)));
  }
   deleteBreakdown(idBreakdown:number){
    return this.http.delete<Category>(environment.apiUrl+'breakdown/'+idBreakdown).pipe(map((res)=>{
    }));
  }
  updateBreakdown(breakdown:Breakdown){
       return this.http.put<Breakdown>(environment.apiUrl+'breakdown/'+breakdown.id,breakdown)
            .pipe(catchError(ServiceError.errorHandler
            ));
  }
  getBreakdown(idBreakdown:number){
     return this.http.get<Breakdown>(environment.apiUrl+"breakdown/"+idBreakdown)
     .pipe(catchError(ServiceError.errorHandler));
  }
  
}
