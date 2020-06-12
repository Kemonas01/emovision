import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged = false;
  showInstallButton = false;
  deferredPrompt = null;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.connecter();
  }

  connecter(){
    console.log(this.auth.isLoggedIn);
    this.logged = this.auth.isLoggedIn;
  }

}
