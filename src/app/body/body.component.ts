import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  isHover = false;
  selected = '';
  constructor(public ngZone: NgZone, public router: Router) { }

  ngOnInit(): void {
  }

  onClick(value){
    this.selected = value;
  }

  onSubmit(){
    const historique = JSON.parse(localStorage.getItem('historique'));
    historique.localisationDouleur  = this.selected;
    localStorage.setItem('historique', JSON.stringify(historique));
    /*this.ngZone.run(() => {
      this.router.navigate(['body']);
    });*/
  }
}
