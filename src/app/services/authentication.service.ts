import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
import { User } from '../models/user.model';
import { Toast } from '../utils/toast.util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	private loggedIn = new BehaviorSubject<boolean>(this.isUserInSesion());
    private user:User = new User();

    constructor(private http: HttpClient) { }


	get isLoggedIn() {
    	return this.loggedIn.asObservable();
  	}

    login(email: string, password: string) {
        console.log("email",email);
        return this.http.post<any>(environment.apiUrl+"login/", { email: email, password: password })
            .pipe(map(response => {
                this.user = response.data;
                console.log("user",this.user);
                // login successful if there's token in the response
                if (this.user && this.user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(this.user));
                    this.loggedIn.next(true);
                }

                return this.user;
            }))
            .pipe(catchError(this.errorHandler));
    }

    logout(email:string, token:string) {
        return this.http.post<any>(environment.apiUrl+"logout/", { email: email, api_token: token })
        .pipe(catchError(this.errorHandler))
        .subscribe(
            data=>{
                Toast.success(data,Toast.DURATION_SHORT);
                localStorage.removeItem('currentUser');
                this.loggedIn.next(false);
            }, 
            error=> Toast.danger(error,Toast.DURATION_SHORT)
        );        
    }

    errorHandler(httpError: HttpErrorResponse){
       return observableThrowError(httpError.error[0] || "Server error");
    }

    private isUserInSesion(){
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        return false;
    }
}