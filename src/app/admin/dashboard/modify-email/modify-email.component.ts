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
  user = null;
  constructor(public auth: AuthService, private router: Router) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
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

  onSubmit(value){
    this.user.updateEmail(value).then(() => {
      this.auth.SignOut('Votre adresse mail a été changée');
    }).catch((error) => {
      console.log(error);
    });
  }
}
