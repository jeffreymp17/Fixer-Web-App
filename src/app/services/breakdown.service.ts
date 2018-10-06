import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {Meta} from '../models/meta.model';
import {ResponseModel} from '../models/response.model';
import {Links} from '../models/links.model';
import {Date} from '../models/date.model';
import { environment } from '../../environments/environment';
import {map}from'rxjs/operators';
import {Breakdown} from '../models/breakdown.model';

@Injectable({
  providedIn: 'root'
})
export class BreakdownService {

  constructor(private http: HttpClient) { }



  getAllBreakdowns():Observable<ResponseModel>{
  	return this.http.get<ResponseModel>(environment.apiUrl+'breakdown').pipe(map((res:ResponseModel)=>res));
  }
   saveBreakdown(breakdown:Breakdown):Observable<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body=JSON.stringify(breakdown);
    console.log("in service:",body);
    return this.http.post(environment.apiUrl+'breakdown',breakdown).pipe(map((res=>res)));
  }
   deleteBreakdown(idBreakdown:number){
    return this.http.delete<Category>(environment.apiUrl+'breakdown/'+idBreakdown).pipe(map((res)=>{
    }));
  }
}
