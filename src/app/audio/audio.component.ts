import { Component, OnInit } from '@angular/core';
import { Track } from './../interfaces/track';
import { Howl } from 'howler';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
  track: Track[] = [{
    name: 'test',
    path: '../../assets/tracks/audio.mp3'
  }];

  player: Howl = null;
  activeTrack: Track = null;
  isPlaying = false;
  lunch = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  start(track: Track) {
    this.lunch = true;
    if (this.player) {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
      },
      onend: () => {
        this.player.stop();
      }
    });
    this.player.play();
  }

  togglePlayer(pause){
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  stop(){
    this.player.stop();
    this.isPlaying = false;
    this.lunch = false;
  }

  next() {
    const index = this.track.indexOf(this.activeTrack);
    if (index !== this.track.length - 1) {
      this.start(this.track[index + 1]);
    } else {
      this.start(this.track[0]);
    }
  }

  prev() {
    const index = this.track.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.track[index - 1]);
    } else {
      this.start(this.track[this.track.length - 1]);
    }
  }

  openModal(){
    this.dialog.open(AudioDialogComponent)
  }
}

@Component({
  selector: 'app-audio-dialog',
  templateUrl: './audio-dialog.component.html',
  styleUrls: ['./audio.component.css']
})

export class AudioDialogComponent {}
