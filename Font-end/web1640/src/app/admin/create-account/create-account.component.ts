import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';


interface Images {

  FileImage: string | null,

}


interface NewAccounts {

  Firstname: string | null,
  Lastname: string | null,
  Email: string | null,
  Password: string | null,
  Role: string | null,
  Departmant: string | null,


}

@Component({
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  ngOptionRole = ["Admin", "Staff", "QMA"];
  images: Images = {
    FileImage: null,
  };


  newAccount: NewAccounts = {
    Firstname: null,
    Lastname: null,
    Email: null,
    Password: null,
    Role: null,
    Departmant: null,



  };

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router) {

  } //dependency injection



  ngOnInit(): void {

    // this.newaccount();
    // this.newAccountForm.reset();

  }
  createAccountForm = new FormGroup({
    FileImage: new FormControl(''),
    Firstname: new FormControl(''),
    Lastname: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    Role: new FormControl(''),
    Departmant: new FormControl(''),


  })

  createNewAccount = new FormGroup({
    FileImage: new FormControl(''),
    Firstname: new FormControl(''),
    Lastname: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
    Role: new FormControl(''),
    Departmant: new FormControl(''),




  }
  )
  CreateNewAccount(data: any) {
    //get password from localstorage
    var account: any = localStorage.getItem('account');
    var phone = JSON.parse(account).Phone;
    console.log("dsadsds" + phone);

    this.account = {
      
      Firstname: data.Firstname,
      Lastname: data.Lastname,
      Email: data.Email,
      Password: data.Password,
      Role: data.Role,
      Departmant: data.Departmant,
      
    }





    // if(this.loginForm.invalid){
    //     return false;
    // } 
    // truyen du lieu vao form
    // console.log(data.phone, data.password);
    // this.router.navigateByUrl('/students');

    // return true;
    // console.log(
    //  this.resetPasswordForm.value);
    // if (this.resetPasswordForm.value.oldPassword != oldPw) {

    //   alert("Mật khẩu cũ không đúng");
    //   return false;
    // }
    // else if (this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.reNewPassword) {
    //   alert("Mật khẩu mới không trùng khớp");
    //   return false;
    // }
    // else {
    console.log("hii");
    this.api.createNewAccount(this.account
    ).subscribe(res => {

      var d = JSON.parse(res); //doi tu json sang object
      const helper = new JwtHelperService();
      console.log("okeee", d.account)
      const decoedToken = helper.decodeToken(d.account);
      console.log("okeee", d.account)
      console.log("d", decoedToken);

      alert("Tạo tài khoản thành công. Đã gửi Email cho sinh viên");

      // this.router.navigateByUrl('/students/profilestudent');
      this.router.navigateByUrl('/admissions');
    },

      error => {
        console.log("Error", error);
        alert("Error");
        this.router.navigateByUrl('/admissions/registeraccount');
      }

    );


  }
  account: NewAccounts = {
  
    Firstname: null,
    Lastname: null,
    Email: null,
    Password: null,
    Role: null,
    Departmant: null,


  };

  reloadParent() {
    this.ngOnInit();
  }


}




