import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const api = "http://139.162.47.239/api/";
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
  createNewAccount(formData: FormData){  
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(JSON.stringify(formData));
    const dataUser = JSON.stringify(formData)
    
    
    return this.http.post(api + 'user/register', formData, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
  changePassword(formData: Object){
    let newForm = new FormData();
    const helper = new JwtHelperService();
    const user = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    formData = {...formData, userId: user!.id}
    
    
    console.log(user)
    newForm.append('userId', user.id.toString());
    console.log(newForm.get('userId'));
    console.log(formData);
    
    
    
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.put(api + 'user/change-password'
    , newForm// data minh se gui len
    , {headers:headers, responseType: 'text'} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  ) 
  }//resetPassword
  CreateDeadline(deadline: Object){    
    const userInfo = {deadline: deadline}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'createDeadline', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
}
