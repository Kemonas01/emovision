import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from './../../interfaces/utilisateur';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  utilisateurForm: FormGroup;
  utilisateurs: Utilisateur[] = [];

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder) { }

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
