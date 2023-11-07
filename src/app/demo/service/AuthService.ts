import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
const AUTH_API = 'http://127.0.0.1:8080/api/v1/auth/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({
    providedIn: 'root'
})
export class AuthService{

    isAuthenticated:boolean=false;
    roles:any;
    username:any;
    accessToken:any;
    constructor(private http: HttpClient, private router : Router) { }
    login(username: string, password: string): Observable<any> {
        let options={
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
        }
        let params = new HttpParams().set("username",username).set("password",password);
        return this.http.post(environment.backendHost+"/auth/login", params,options);
    }

    // register(username: string, email: string, password: string): Observable<any> {
    //     return this.http.post(environment.backendHost+"/auth/login", params);
    // }
    loadProfile(data: any) {
        this.isAuthenticated=true;
        this.accessToken= data["access-token"];
        let decodedJwt:any = jwtDecode(this.accessToken);

        this.username = decodedJwt.sub;
        this.roles = decodedJwt.scope;
        window.localStorage.setItem("jwt-token",this.accessToken);


    }

    logout() {
        this.isAuthenticated=false;
        this.accessToken=undefined;
        this.username=undefined;
        this.roles=undefined;
        window.localStorage.removeItem("access-token");
        this.router.navigateByUrl("/auth/login");
    }

    loadJwtTokenFromLocaleStorage() {
        let token = window.localStorage.getItem("jwt-token");
        if(token){
            this.loadProfile({"access-token":token});
        }
    }
}
