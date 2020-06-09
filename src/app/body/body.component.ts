import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  isHover = false;
  selected = '';
  divSvgDos = false;
  constructor(public ngZone: NgZone, public router: Router) { }

  ngOnInit(): void {
  }

  onClick(value){
    this.selected = value;
  }

  onSubmit(sensasationDouleur){
    const historique = JSON.parse(localStorage.getItem('historique'));
    historique.douleur  = {
      localisation: this.selected,
      sensation: sensasationDouleur
    };
    localStorage.setItem('historique', JSON.stringify(historique));
    this.ngZone.run(() => {
      this.router.navigate(['ressentir']);
    });
  }

  onSubmitDF(){
    this.divSvgDos = this.divSvgDos ? false : true;
  }
}
