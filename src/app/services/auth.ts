import { inject, Injectable, signal } from '@angular/core';
import { LoggedUser, User, UserToRegister } from '../interfaces/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../interfaces/apiResponse';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly connectedUserSignal = signal<LoggedUser|null>(null);
  private readonly users = signal<User[]>([]); 
  private readonly http = inject(HttpClient);
  
  constructor(){
    this.loadStoredData();
  }

  private loadStoredData(){
    const storedUser = sessionStorage.getItem('connectedUser');
    if(storedUser) {
      this.connectedUserSignal.set(JSON.parse(storedUser))
    }
    const storedUsers = localStorage.getItem("users");
    if(storedUsers){
      this.users.set(JSON.parse(storedUsers));
    }
  }

  public get connectedUser() {
    return this.connectedUserSignal.asReadonly();
  }

  public get isLoggedIn(){
    return this.connectedUserSignal() !== null;
  }

  getUserByEmail(userEmail: string): User {
    //Attention le resultat peux être undefined
    return this.users().find(user=>user.email==userEmail)!;
  }

  register(user: UserToRegister): Observable<boolean>{ 
    const apiUrl = `${environment.AUTH_API_BASE}/signup`;
    const requestBody = {
          email: user.email,
          pseudo: user.pseudo,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
          cityCode: user.cityCode,
          city: user.city,
          phone: user.phone  };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<ApiResponse<LoggedUser>>(apiUrl, requestBody, { headers }).pipe(
      map((res)=>{
        if(res.code==="200"){
          return true;
        }
        else {
          console.error('Erreur lors du register:');
          return false;
        }
      }
      )
    )
    
    
    
    
    
    
  }

  
 //################################ LOGIN/LOGOUT ###############################
  
 login(userToConnect: User): Observable<boolean> {
  const apiUrl = `${environment.AUTH_API_BASE}/login`;
  const requestBody = { email: userToConnect.email, password: userToConnect.password };
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  
  return this.http.post<ApiResponse<LoggedUser>>(apiUrl, requestBody, { headers }).pipe(
    map((res) => {
      if (res.code === '200') {  
        const userStoreData: LoggedUser = {
          email: res.data.email,
          token: res.data.token,
          roles: res.data.roles || []  
        };
        sessionStorage.setItem('connectedUser', JSON.stringify(userStoreData));
        this.connectedUserSignal.set(userStoreData);
        return true;
      } else {
        console.log("Mot de passe ou email incorrect");
        return false;
      }
    }),
    catchError((error) => {
      console.error('Erreur lors du login:', error);
      return of(false);  
    })
  );
}

  logout(){
    sessionStorage.removeItem('connectedUser');
    this.connectedUserSignal.set(null);
  }

  //########################################## ROLES ######################################

  hasRole(requiredRole: string){
    if(this.connectedUser()?.roles.find(el => el == requiredRole)!==undefined){
      return true
    }
    else{
      return 
    }
  }



  
}
