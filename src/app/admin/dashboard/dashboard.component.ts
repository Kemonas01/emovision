import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(public authService: AuthService) {
   }

  ngOnInit(): void {
    this.authService.getUserList().then(
      (user) => {
        this.user = user;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

}
