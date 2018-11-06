import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import {ResponseModel} from '../models/response.model';
import { environment } from '../../environments/environment';
import {ServiceError} from '../utils/serviceError.util';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getAllOrders(url):Observable<ResponseModel>{
    return this.http.get<ResponseModel>(environment.apiUrl+url)
      .pipe(catchError(ServiceError.errorHandler));
  }
}
