import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ressentir-avant',
  templateUrl: './ressentir-avant.component.html',
  styleUrls: ['./ressentir-avant.component.css']
})
export class RessentirAvantComponent implements OnInit {
  indexS = null;
  ressentie = null;
  ressentieAll = [];
  defaultValue = '';
  defaultValueDate = '';
  date = [];
  text = [];
  constructor(public ngZone: NgZone,
              public router: Router,
              public storage: StorageService) { }

  ngOnInit(): void {
  }

  onClick(ou, date){
    const found  = this.ressentieAll.some( ( text ) => {
      this.indexS = this.ressentieAll.indexOf( ou );
      return text.indexOf( ou ) !== -1 ;
    });
    if ( !found ) {
      this.text.push(ou);
      if (date.length > 0){
        this.ressentieAll.push(ou + ' le ' + date);
        this.date.push(date);
      } else {
        this.ressentieAll.push(ou);
        this.date.push('');
      }
    } else {
      this.date.splice(this.indexS, 1);
      this.text.splice(this.indexS, 1);
      this.ressentieAll.splice(this.indexS, 1);
    }
    this.defaultValue = '';
    this.defaultValueDate = '';
  }

  onSubmit(){
    if (this.storage.testHistorique()){
      const historique = JSON.parse(localStorage.getItem('historique'));
      const historiqueJson = [];
      for (let i = 0; this.text.length > i; i++){
        const json = {
          localisation: this.text[i],
          date: this.date [i]
        };
        historiqueJson.push(json);
      }
      if (historique.ressenti === undefined){
        historique.ressenti = {
          dejaRessenti: true,
          raconte: historiqueJson
        };
      } else {
        historique.ressenti.raconte = historiqueJson;
      }
      localStorage.setItem('historique', JSON.stringify(historique));
      this.ngZone.run(() => {
        this.router.navigate(['perceptions']);
      });
    } else {
      this.storage.redirectToHome();
    }
  }
}
