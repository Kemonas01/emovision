import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Utilisateur } from './../../interfaces/utilisateur';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  utilisateurForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  confidentialite = false;
  condition = false;
  error = null;
  constructor(public authService: AuthService,
              private formBuilder: FormBuilder) { }
  hide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  prenomFormControl = new FormControl('', [
    Validators.required,
  ]);

  nomFormControl = new FormControl('', [
    Validators.required,
  ]);

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);

  genreFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  genres: Genre[] = [
    {value: 'H', viewValue: 'Homme'},
    {value: 'F', viewValue: 'Femme'},
    {value: 'np', viewValue: 'Je ne souhaite pas préciser'}
  ];

  ngOnInit() {
  }

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
