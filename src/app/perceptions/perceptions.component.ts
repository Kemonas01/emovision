import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perceptions',
  templateUrl: './perceptions.component.html',
  styleUrls: ['./perceptions.component.css']
})
export class PerceptionsComponent implements OnInit {

  constructor(public ngZone: NgZone, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmitTelling(){
    this.ngZone.run(() => {
      this.router.navigate(['tell']);
    });
  }

  onSubmitFeeling(){
    this.ngZone.run(() => {
      this.router.navigate(['familles']);
    });
  }

  onSubmit(){
    this.ngZone.run(() => {
      this.router.navigate(['audio']);
    });
  }
}
