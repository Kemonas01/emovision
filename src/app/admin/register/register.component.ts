import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Utilisateur } from './../../interfaces/utilisateur';
import {ErrorStateMatcher} from '@angular/material/core';
/**
 * Class permettant de faire fonctionner les erreurs de material design
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
/**
 * L'interface des genre
 */
interface Genre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * La confidentialite
   */
  confidentialite = false;
  /**
   * Boolen des conditions d'utilisation
   */
  condition = false;
  /**
   * Stock un erreur en string
   */
  error = null;
  /**
   * Boolean du mot de passe, savoir si on le voit ou non
   */
  hide = true;

  /**
   * Contrôleur de l'email
   */
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  /**
   * Contrôleur du mot de passe
   */
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  /**
   * Contrôleur du prénom
   */
  prenomFormControl = new FormControl('', [
    Validators.required,
  ]);
  /**
   * Contrôleur du nom
   */
  nomFormControl = new FormControl('', [
    Validators.required,
  ]);
  /**
   * Contrôleur de la date de naissance
   */
  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  /**
   * Contrôleur des genres
   */
  genreFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  /**
   * Les genres
   */
  genres: Genre[] = [
    {value: 'H', viewValue: 'Homme'},
    {value: 'F', viewValue: 'Femme'},
    {value: 'np', viewValue: 'Je ne souhaite pas préciser'}
  ];
  constructor(public authService: AuthService,
              private formBuilder: FormBuilder) { }


  ngOnInit() {
  }

  /**
   * Lors de la soumissions: Regarde si tous les contrôleurs sont valides et créer un utilisateurs dans la base de donné
   * @param mail l'adresse mail
   * @param mdp le mot de passe
   * @param prenom le prénom
   * @param nom le nom
   * @param dateNais la date de naissance
   * @param genre le genre
   * @param confidentialite la confidentialite
   */
  onSubmitUtilisateurForm(mail, mdp, prenom, nom, dateNais, genre, confidentialite){
    if (this.genreFormControl.valid
        && this.nomFormControl.valid
        && this.dateFormControl.valid
        && this.prenomFormControl.valid
        && this.passwordFormControl.valid
        && this.emailFormControl.valid
        && this.condition === true
        ){
      this.authService.SignUp(mail, mdp, prenom, nom, dateNais, genre, confidentialite);
    } else {
      if (this.condition === false){
        this.error = 'Vous devez accepter les conditions d\'utilisations';
      } else {
        this.error = 'Vous devez renseigner tous les champs requis';
      }
    }
  }
}
