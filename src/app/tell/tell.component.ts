import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tell',
  templateUrl: './tell.component.html',
  styleUrls: ['./tell.component.css']
})
export class TellComponent implements OnInit {
  valueText = '';
  modification = false;
  constructor(public ngZone: NgZone, public router: Router) { }

  ngOnInit(): void {
    this.valueText = JSON.parse(localStorage.getItem('historique')).temoignage;
    if (this.valueText) {
      this.modification = (this.valueText.length === 0) ? false : true;
      console.log(this.modification);
    }
  }
  onSubmit(text){
    const historique = JSON.parse(localStorage.getItem('historique'));
    historique.temoignage = text;
    localStorage.setItem('historique', JSON.stringify(historique));
    if (this.modification){
      this.ngZone.run(() => {
        this.router.navigate(['audio']);
      });
    } else {
      this.ngZone.run(() => {
        this.router.navigate(['tell']);
      });
    }
  }
}
