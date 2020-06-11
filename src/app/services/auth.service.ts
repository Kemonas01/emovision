import { Injectable, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  userData: any; // Save logged in user data
  userId: string;
  utilisateurs: any = null;
  error: string;


  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning

  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.userId = user.uid;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.userId = result.user.uid;
        this.SetUserData(result.user);
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        this.error = 'Votre mot de passe ou votre adresse mail ne sont pas valides';
      });
  }

  // Sign up with email/password
  SignUp(email, password, userPrenom, userNom, userDateNaissance, userGenre, userConfidentialite) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.userId = result.user.uid;
        const test = {
          nom: userNom,
          prenom: userPrenom,
          dateNaissance: userDateNaissance,
          genre: userGenre,
          confidentialite: userConfidentialite,
        };
        this.createUtilisateur(test);
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
      });
  }

  AnonymousAuth(){
    return firebase.auth().signInAnonymously()
    .then((result) => {
      this.userId = result.user.uid;
      console.log(this.userId);
    });
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    await firebase.auth().currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Vous avez reçu un mail');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Facebook
  FacebookAuth(){
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
       this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error);
    });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut(message) {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('historique');
      localStorage.removeItem('utilisateur');
      this.router.navigate(['login', {error: message}]);
    });
  }

  // Get all list of user and return the current user data
  getUserList(){
      const test = JSON.parse(localStorage.getItem('user')).uid;
      return new Promise(
        (resolve, reject) => {
          firebase.database().ref('/utilisateurs/' + test).once('value').then(
            (data) => {
              resolve(data.val());
            }
          ).catch(
            (error) => {
              reject(error);
              location.reload();
            }
          );
        }
      );
  }

  // Create user Information on database
  createUtilisateur(test){
    firebase.database().ref(`utilisateurs/${this.userId}`).set(test);
  }

  createHistorique(data){
    firebase.database().ref(`historiques/${this.userId}`).push(data);
  }

}
