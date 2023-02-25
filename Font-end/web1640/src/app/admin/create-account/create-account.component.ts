import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponentComponent } from './success-dialog-component/success-dialog-component.component';


interface Images {

  FileImage: string | null,

}


@Component({
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  myForm!: FormGroup;

  ngOptionRole = ["Admin", "QMA", "Staff"];
  images: Images = {
    FileImage: null,
  };

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog) {

  } //dependency injection



  ngOnInit() {

    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(9), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      department: ['', Validators.required],
      
    });

    // this.newaccount();
    // this.newAccountForm.reset();

  }


  async CreateNewAccount() {
    //get password from localstorage

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
    // console.log("hii");

    var formData = new FormData();
    formData = this.myForm.getRawValue()
    console.log(formData)
    // formData.append('firstname', this.myForm?.get('FirstName')?.value);
    // formData.append('lastname', this.myForm?.get('LastName')?.value);
    // formData.append('username', this.myForm?.get('UserName')?.value);
    // formData.append('email', this.myForm?.get('Email')?.value);
    // formData.append('role', this.myForm?.get('Role')?.value);
    // formData.append('password', this.myForm?.get('Password')?.value);
    // formData.append('department', this.myForm?.get('Department')?.value);

    
    
    this.api.createNewAccount( formData
    ).subscribe(res => {

      // alert("Login Successful!");
        var data = JSON.parse(res)

        console.log(res);
        console.log(data.data.username);

        if (data.status == 200) {
          
         
          const dialogRef = this.dialog.open(SuccessDialogComponentComponent, {
            data: {
              username: data.data.username,
              email: data.data.email,
              password: this.myForm?.get('password')?.value,
            },
          });
        
          dialogRef.afterClosed().subscribe(() => {
            // Xử lý sau khi dialog đóng lại (nếu cần)
          });
          this.myForm.reset();
          
          this.router.navigate(['/admin/createaccount'])
        
          // this.router.navigate(['/admin'])
        } else if (data.status == 400) {
          console.log("Email or Password or Username is incorrect! Please try again");
        } 
        // else if (user.role == 4) {
        //   this.router.navigateByUrl('/staff');
        // }
        

      



      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        console.log("Email or Password or Username is incorrect! Please try again");
        console.log(error)
        // this.router.navigate(['/login']);
      }

    );


  }


  reloadParent() {
    this.ngOnInit();
  }


}




