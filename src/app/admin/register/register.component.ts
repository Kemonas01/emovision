import { Component, OnInit } from '@angular/core';
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

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder) { }
  hide = true;
   emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  genres: Genre[] = [
    {value: 'H', viewValue: 'Homme'},
    {value: 'F', viewValue: 'Femme'},
    {value: 'none', viewValue: 'Je ne souhaite pas précisé'}
  ];

  ngOnInit() {
    this.initUtilisateursForm();
    this.authService.getUserList();
  }

  initUtilisateursForm(){
    this.utilisateurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      genre: ['', Validators.required],
      confidentialite: [false],
    });
  }

  onSubmitUtilisateurForm(){
    const newUtilisateur: Utilisateur = this.utilisateurForm.value;
    // tslint:disable-next-line:max-line-length
    newUtilisateur.confidentialite = this.utilisateurForm.get('confidentialite').value ? this.utilisateurForm.get('confidentialite').value : false;
    this.authService.createUtilisateur(newUtilisateur);
  }
}
