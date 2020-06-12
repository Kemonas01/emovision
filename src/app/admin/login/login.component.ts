import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * Boolean du mot de passe caché ou non
   */
  hide = true;
  /**
   * Les erreurs en string
   */
  error = null;
  constructor(public authService: AuthService,
              private route: ActivatedRoute) { }
  /**
   * Lors du lancement de la page: récupère l'erreur si il y en a une
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.error = params.error;
    });
  }

}
