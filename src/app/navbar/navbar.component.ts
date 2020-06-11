import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged = false;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.connecter();
  }

  connecter(){
    if (JSON.parse(localStorage.getItem('user')) !== null){
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

}
