import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials, UserData } from '../Interface/Credentials';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + 'Usuario/Login';
  private userDataKey = 'userData';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(credentials: Credentials): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((response) => {
        this.setUserData(response.data);
      }),
      catchError((error) => {
        return throwError(
          () => new Error(error.error.message || 'Ocurrio un error intentalo mas tarde')
        );
      })
    );
  }

  

  private setUserData(userData: UserData): void {
    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
  }

  getUserData(): UserData | null {
    if(typeof window !== 'undefined'){
    const userDataString = localStorage.getItem(this.userDataKey);
    return userDataString ? (JSON.parse(userDataString) as UserData) : null
    }else{
      return null;
    }
  }

  isAuthenticated(): boolean {
    const userData = this.getUserData();
    console.log(userData);
    if(!userData){
      return false;
    }else{
      return true;
    }
  }

  

  logout(): void {
    localStorage.removeItem(this.userDataKey);
    localStorage.removeItem('timer');
    this.router.navigate(['/login']);
   
  }
  
}
