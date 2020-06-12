import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-modify-email',
  templateUrl: './modify-email.component.html',
  styleUrls: ['./modify-email.component.css']
})
export class ModifyEmailComponent implements OnInit {
  /**
   * Les informations de l'utilisateur
   */
  user = null;
  /**
   * Le mot de passe et l'adresse mail de l'utilisateur
   */
  credential = null;
  /**
   * Les erreurs si il en a une
   */
  error = null;
  /**
   * Boolean du mot de passe caché ou non
   */
  hide = true;
  /**
   * FormControl de l'email: permet d'avoir un contrôle de l'input de l'email et gère les erreurs
   */
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor(public auth: AuthService, private router: Router) { }
  /**
   * Lors du lancement de la page: initialise les informations de l'utilisateurs
   */
  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        // No user is signed in.
      }
    });
  }
  /**
   * Permet de modifer l'adresse mail de l'utilisateur lors de la soumissions du bouton et le déconnecte
   * @param password le mot de passe rentré par l'utilisateur pour se re-auth
   * @param newMail la nouvelle adresse
   */
  onSubmit(password, newMail){
    this.credential = firebase.auth.EmailAuthProvider.credential(this.user.email, password);
    this.user.reauthenticateWithCredential(this.credential).then(() => {
      this.user.updateEmail(newMail).then(() => {
        this.auth.SignOut('Votre adresse mail a été changée');
      }).catch((error) => {
        this.error = 'Une erreur est survenue lors du changement du mot de passe';
      });
    }).catch((t) => {
      this.error = 'Votre mot de passe est incorrecte';
    });
  }
}
