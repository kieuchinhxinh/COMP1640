import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  status: any;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router) { } //dependency injection

  resetPasswordForm = new FormGroup({
    // oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    reNewPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  onSubmit(data: any) {

    //get password from localstorage
    var account: any = localStorage.getItem('account');
    var oldPw = JSON.parse(account).Password;
   
    // if (this.resetPasswordForm.value.oldPassword != oldPw) {
      
    //   alert("Mật khẩu cũ không đúng");
    //   return false;
    // }
    if (this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.reNewPassword) {
      alert("Mật khẩu mới không trùng khớp");
      return false;
    }
    else {
      this.api.resetPassword(
        data.newPassword,
        data.reNewPassword
      ).subscribe(res => {
        var d = JSON.parse(res); //doi tu json sang object
        console.log("dsadsds" + d.toString());
        alert("Đổi mật khẩu thành công");
        
        // this.router.navigateByUrl('/students');
      },
  
        error => {
            console.log("Error", error);
            alert("Error");
            // this.router.navigateByUrl('/students');
        }
  
      );
      return true;
    }
  }

  ngOnInit() {
  }

}
