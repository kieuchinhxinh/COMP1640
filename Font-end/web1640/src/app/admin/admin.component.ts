import { AfterViewInit, Component } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit {

  ngOptionRole = ["Admin", "Staff", "QMA"];



  ngAfterViewInit(): void {
    const socialListScrollbar = new PerfectScrollbar('.dashboard-social-list');
    const topCountriesScrollbar = new PerfectScrollbar('.dashboard-top-countries');
  }
}
