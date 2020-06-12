import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

interface Genre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {
  /**
   * Les options des genres
   */
  genres: Genre[] = [
    {value: 'H', viewValue: 'Homme'},
    {value: 'F', viewValue: 'Femme'},
    {value: 'np', viewValue: 'Je ne souhaite pas préciser'}
  ];

  utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
  confidentialite = this.utilisateur.confidentialite;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  /**
   * Lors de la soumission, permet de modifier les informations de l'utilisateur dans la base de donnée et le déconnecte
   * @param pre le prénom
   * @param nm le nom
   * @param gen le genre
   */
  onSubmit(pre, nm, gen){
    const utilisateur = {
      prenom: pre,
      nom: nm,
      genre: gen,
      confidentialite: this.confidentialite,
      dateNaissance: this.utilisateur.dateNaissance
    };
    this.auth.createUtilisateur(utilisateur);
    localStorage.removeItem('utilisateur');
    this.auth.SignOut('Vos informations ont été modifié');
  }
}
