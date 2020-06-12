import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase';
import { StorageService } from 'src/app/services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';
import { Utilisateur } from './../../interfaces/utilisateur';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nom: string;
  prenom: string;
  dateNaissance: string;
  confidentialite: boolean;
  adresseMail: string;
  genre: string;
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
    if (localStorage.getItem('utilisateur') === null){
      this.authService.getUserList().then(
        (user: Utilisateur) => {
          localStorage.setItem('utilisateur', JSON.stringify(user));
          this.nom = user.nom;
          this.prenom = user.prenom;
          this.confidentialite = user.confidentialite;
          this.dateNaissance = user.dateNaissance;
          this.genre = user.genre;
          const userE = JSON.parse(localStorage.getItem('user'));
          this.adresseMail = userE.email;
          location.reload();
        }
      ).catch(
        (error) => {
          this.error = 'Une erreur est servenue lors du chargement de votre profil';
        }
      );
    } else {
      const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
      this.nom = utilisateur.nom;
      this.prenom = utilisateur.prenom;
      this.confidentialite = utilisateur.confidentialite;
      this.dateNaissance = utilisateur.dateNaissance;
      this.genre = utilisateur.genre;
      const userE = JSON.parse(localStorage.getItem('user'));
      this.adresseMail = userE.email;
    }
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
