import { throwError as observableThrowError} from 'rxjs';
import {HttpErrorResponse } from '@angular/common/http';
export class ServiceError{

static errorHandler(httpError: HttpErrorResponse){
  	 return observableThrowError(httpError.error[0] || "Server error");
  }
}