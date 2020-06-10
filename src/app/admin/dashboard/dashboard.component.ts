import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nom: '';
  prenom: '';
  dateNaissance: '';
  confidentialite: '';
  adresseMail: '';
  genre = '';
  error = null;
  constructor(public authService: AuthService,
              public storage: StorageService,
              private route: ActivatedRoute,
              private router: Router) {
   }

  ngOnInit(): void {
    this.getUserList();
    this.route.params.subscribe(params => {
      this.error = params.error;
    });
  }

  getUserList(){
      this.authService.getUserList().then(
        (user) => {
          localStorage.setItem('utilisateur', JSON.stringify(user));
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
      const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
      this.nom = utilisateur.nom;
      this.prenom = utilisateur.prenom;
      this.confidentialite = utilisateur.confidentialite;
      this.dateNaissance = utilisateur.dateNaissance;
      this.genre = utilisateur.genre;
      const userE = JSON.parse(localStorage.getItem('user'));
      this.adresseMail = userE.email;
  }

  onSubmitModifyEmail(){
    this.router.navigate(['modify-email']);
  }

  onSubmitModifyPassword(){
    this.router.navigate(['modify-password']);
  }

  onSubmitModifyProfile(){
    this.router.navigate(['modify-profile']);
  }
}
