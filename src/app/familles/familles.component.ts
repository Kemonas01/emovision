import { Component, OnInit, NgZone } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-familles',
  templateUrl: './familles.component.html',
  styleUrls: ['./familles.component.css']
})
export class FamillesComponent implements OnInit {
  emotions = [];
  constructor(public storage: StorageService, public ngZone: NgZone, public router: Router) { }

  ngOnInit() {
    this.storage.getAllEmotions();
    this.getAllEmotions();
  }

  getAllEmotions(){
    this.emotions = JSON.parse(localStorage.getItem('familles'));
  }
}
