import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent implements OnInit {
  user = null;
  credential = null;
  hide = true;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log('test');
      } else {
        // No user is signed in.
        console.log('lol');
      }
    });
  }

  onSubmit(oldPassword, newPassword){
    this.credential = firebase.auth.EmailAuthProvider.credential(this.user.email, oldPassword);
    this.user.reauthenticateWithCredential(this.credential).then(() => {
      this.user.updatePassword(newPassword).then(() => {
        this.auth.SignOut('votre mot de passe a bien été modifié');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((t) => {
        console.log(t);
    });
  }
}
