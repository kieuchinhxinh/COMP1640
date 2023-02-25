import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api.service';

@Component({

  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})
export class AccountManagerComponent implements OnInit {
  

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    
  }

 
}
