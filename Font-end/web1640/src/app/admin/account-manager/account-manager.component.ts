import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';

@Component({

  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})

export class AccountManagerComponent implements OnInit {


  page?: number;
  limit?: number;
  accounts?: any[];

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }
  
  
  ngOnInit() {

    // this.api.get<any[]>('http://your-api-url/accounts', {
    //       params: {
    //         page: this.pageNumber.toString(),
    //         limit: this.pageSize.toString()
    //       }
    //     }).subscribe(accounts => this.accounts = accounts);
    //   });
    // }

    
      // confirm("Đăng nhập thành công");

      this.route.queryParams.subscribe(params => {
        this.page = +params['page'] || 1;
        this.limit = +params['limit'] || 5;
        //Lấy danh sách tài khoản từ API
        this.api.getUsers(this.page.toString(), this.limit.toString()).subscribe((data: any) => {
          console.log(data)
          var d = JSON.parse(data);
          this.accounts = d.data.listUser;

          console.log()
        },
        error => {
          console.log(error);
        }
        
        );
      });




      

  

    // this.route.queryParams.subscribe(params => {
    //   this.pageNumber = +params['page'] || 1;
    //   this.pageSize = +params['limit'] || 10;
    //   // Lấy danh sách tài khoản từ API
    //   this.http.get<any[]>('http://your-api-url/accounts', {
    //     params: {
    //       page: this.pageNumber.toString(),
    //       limit: this.pageSize.toString()
    //     }
    //   }).subscribe(accounts => this.accounts = accounts);
    // });
  }

  
  


  
  

  

 
}
