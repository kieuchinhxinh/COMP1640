import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
const api = "http://143.42.74.14:8888/api/";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  login(email:string='', password:string=''): Observable<any>{    
    var userInfo = { email:email, password:password }
    var dataJson = JSON.stringify(userInfo);
    console.log(userInfo);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post(api + 'user/login'
    , dataJson// data minh se gui len
    , {headers: headers} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  ) 
  }//l
  // getAll():Observable<Account[]>{
  //   return this.http.get<Account[]>(api).pipe(
  //   )
  // }

  getAnAcount(email:string=''){    
    const userInfo = { email:email}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'getAnAcount', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
  testtestNewAccount(email: string='', testtestNewAccount: Object){    
    const userInfo = { email: email, newaccount: testtestNewAccount}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'testtestNewAccount', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
  createNewAccount(account: Object){    
    const userInfo = {account: account}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'createNewStudent', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
  resetPassword(newPassword:string='', reNewPassword:string=''): Observable<any>{
    var account: any = localStorage.getItem('account')
    var email = JSON.parse(account).email;
    console.log(email);
    const password = {email: email,newPassword:newPassword, reNewPassword: reNewPassword }
    console.log(password);
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'changePassword'
    , password// data minh se gui len
    , {headers:headers, responseType: 'text'} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  ) 
  }//resetPassword
}
