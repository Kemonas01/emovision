import { Component, OnInit, NgZone } from '@angular/core';
import { EmotionService } from 'src/app/services/emotion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emotions-selected',
  templateUrl: './emotions-selected.component.html',
  styleUrls: ['./emotions-selected.component.css']
})
export class EmotionsSelectedComponent implements OnInit {
  emotionSelected = null;
  constructor(public emotionService: EmotionService,
              public ngZone: NgZone,
              public router: Router) { }

  ngOnInit(): void {
    this.getAllEmotionSelected();
    console.log(this.emotionSelected);
  }

  getAllEmotionSelected(){
    this.emotionService.getData().subscribe((data) => {
      this.emotionSelected = data;
    });
  }

  onClick(emotion){
    const historique = JSON.parse(localStorage.getItem('historique'));
    historique.emotionRessentie.emotion = emotion;
    localStorage.setItem('historique', JSON.stringify(historique));
  }

  onSubmit(){
      this.router.navigate(['emotions-echelle']);
  }
}
