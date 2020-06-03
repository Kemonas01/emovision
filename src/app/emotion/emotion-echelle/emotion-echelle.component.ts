import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emotion-echelle',
  templateUrl: './emotion-echelle.component.html',
  styleUrls: ['./emotion-echelle.component.css']
})
export class EmotionEchelleComponent implements OnInit {
  emotionSelected = null;
  value: any = 0;
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }
  constructor(public ngZone: NgZone, public router: Router) { }

  ngOnInit(): void {
    this.getEmotionSelected();
  }

  onSliderChangeEnd(event){
    this.value = event.value;
  }

  getEmotionSelected(){
    const historique = JSON.parse(localStorage.getItem('historique'));
    this.emotionSelected = historique.emotionRessentie.emotion;
  }

  onSubmit(){
    const historique = JSON.parse(localStorage.getItem('historique'));
    historique.emotionRessentie.echelle = this.value;
    localStorage.setItem('historique', JSON.stringify(historique));
    this.ngZone.run(() => {
      this.router.navigate(['perceptions']);
    });
  }
}
