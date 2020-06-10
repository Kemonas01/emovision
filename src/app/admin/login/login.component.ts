import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  error = null;
  constructor(public authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.error = params.error;
    });
  }

}
