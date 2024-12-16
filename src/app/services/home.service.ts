import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiDataPersonUsuario = environment.apiUrl + 'Usuario';
  private apiSaveDataPersonUsuario = environment.apiUrl + 'Person/insert';
  

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPersonUser(): Observable<any> {
    const userData = this.authService.getUserData();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${userData?.token}`,
    });

    return this.http
      .get<any>(this.apiDataPersonUsuario, { headers })
      .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                error.error.message || 'Ocurrio un error intentalo mas tarde'
              )
          );
        })
      );
  }

  addPersonUser(personUser: any): Observable<any> {
    const userData = this.authService.getUserData();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${userData?.token}`,
    });

    return this.http
    .post<any>(this.apiSaveDataPersonUsuario, personUser, { headers })
        .pipe(
        tap((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                error.error.message || 'Ocurrio un error intentalo mas tarde'
              )
          );
        })
      );
  }
}
