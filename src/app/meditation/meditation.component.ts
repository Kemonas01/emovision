import { Component, OnInit, NgZone } from '@angular/core';
import { AudioService } from '../services/audio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.css']
})
export class MeditationComponent implements OnInit {

  constructor(public audio: AudioService, public ngZone: NgZone, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.audio.stop();
    this.ngZone.run(() => {
      this.router.navigate(['home', 1]);
    });
  }
}
