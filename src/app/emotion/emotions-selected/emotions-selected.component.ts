import { Component, OnInit, NgZone } from '@angular/core';
import { EmotionService } from 'src/app/services/emotion.service';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-emotions-selected',
  templateUrl: './emotions-selected.component.html',
  styleUrls: ['./emotions-selected.component.scss']
})
export class EmotionsSelectedComponent implements OnInit {
  emotionSelected = [
    {
    emotion: 'Un problème est survenu, veuillez retourner à la page précédente',
    checked: false,
    error: true
    },
  ];
  checked = false;
  error = false;
  lastUrl = '';
  constructor(public emotionService: EmotionService,
              public ngZone: NgZone,
              public router: Router,
              public storage: StorageService) {
                this.router.events
                .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
                .subscribe((events: RoutesRecognized[]) => {
                  this.lastUrl = events[0].urlAfterRedirects;
                  if (sessionStorage.getItem('lasturl') === null){
                    sessionStorage.setItem('lasturl', this.lastUrl);
                  }
                });
               }

  ngOnInit(): void {
    this.getAllEmotionSelected();
  }

  getAllEmotionSelected(){
    this.emotionService.getData().subscribe((data) => {
      if (data !== null){
        this.emotionSelected = data;
      } else {
        this.error = this.emotionSelected[0].error;
      }
    });
  }

  onClick(emotion, index){
    if (this.storage.testHistorique()){
      // tslint:disable-next-line:forin
      for (const i in this.emotionSelected){
        this.emotionSelected[i].checked = false;
      }
      this.emotionSelected[index].checked = true;
      this.checked = true;
      const historique = JSON.parse(localStorage.getItem('historique'));
      historique.emotionRessentie.emotion = emotion;
      localStorage.setItem('historique', JSON.stringify(historique));
    } else {
      this.storage.redirectToHome();
    }
  }

  onSubmit(){
      this.router.navigate(['emotions-echelle']);
  }
  onSubmitError(){
    this.lastUrl = sessionStorage.getItem('lasturl');
    this.router.navigate([this.lastUrl]);
    sessionStorage.removeItem('lasturl');
}
}
