import { Injectable } from '@angular/core';
import { UserModel }  from '../model/userModel'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {
  user: UserModel[] = [];
  private urlApi = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient

  ) { }


  public crearServUsuario(user: UserModel): Observable<UserModel> {
    console.log(user);
    return this.http.post<UserModel>(this.urlApi, user);
  }
  public consultarTodas(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.urlApi);
  }

  public consultarPorId(id: any): Observable<UserModel> {
    return this.http.get<UserModel>(this.urlApi + '/' + id);
  }

  public updateServUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(this.urlApi + '/' + user.id, user);
  }

  public deletePorId(user: UserModel): Observable<UserModel> {
    return this.http.delete<UserModel>(this.urlApi + '/' + user.id);
  }



}
