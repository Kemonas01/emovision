import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  /**
   * La zone séléctionner sur le SVG
   */
  selected = '';
  /**
   * Si le bouton est cliquer ou non pour dos ou face
   */
  divSvgDos = false;
  /**
   * L'input de l'utilisateur
   */
  sensation = '';
  constructor(public ngZone: NgZone,
              public router: Router,
              public storage: StorageService
              ) { }

  /**
   * Initialise les variable sensation et selected si il y a un localStorage
   */
  ngOnInit(): void {
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      if (historique.douleur !== undefined){
        this.sensation = historique.douleur.sensation;
        this.selected = historique.douleur.localisation;
      }
    }
  }
  /**
   * Initialise selected lors d'un click sur le SVG
   */
  onClick(value){
    this.selected = value;
  }

  onSubmit(sensasationDouleur){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      historique.douleur  = {
        localisation: this.selected,
        sensation: sensasationDouleur
      };
      localStorage.setItem('historique', JSON.stringify(historique));
      this.ngZone.run(() => {
        this.router.navigate(['ressentir']);
      });
    } else {
      this.storage.redirectToHome();
    }
  }
  /**
   * Lors de la soumission du bouton dos/face: permet de modifier la valeur de divSvgDos en fonction du click
   */
  onSubmitDF(){
    this.divSvgDos = this.divSvgDos ? false : true;
  }
}
