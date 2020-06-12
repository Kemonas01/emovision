import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent implements OnInit {
  /**
   * Les informations de l'utilisateur
   */
  user = null;
  /**
   * Le mot de passe et l'adresse mail de l'utilisateur
   */
  credential = null;
  /**
   * Boolean du mot de passe caché ou non
   */
  hide = true;
  constructor(public auth: AuthService) { }
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
   * Permet de modifer le mot de passe de l'utilisateur lors de la soumissions du bouton et le déconnecte
   * @param oldPassword le mot de passe rentré par l'utilisateur pour se re-auth
   * @param newPassword le nouveau mot de passe
   */
  onSubmit(oldPassword, newPassword){
    this.credential = firebase.auth.EmailAuthProvider.credential(this.user.email, oldPassword);
    this.user.reauthenticateWithCredential(this.credential).then(() => {
      this.user.updatePassword(newPassword).then(() => {
        this.auth.SignOut('votre mot de passe a bien été modifié');
      }).catch((error) => {
      });
    }).catch((t) => {
    });
  }
}
