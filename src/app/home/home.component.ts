import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  value: any = 0;
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }
  constructor(public authService: AuthService, public ngZone: NgZone, public router: Router) { }

  ngOnInit() {
    this.authService.getUserList().then(
      (user) => {
        this.user = user;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  onSliderChangeEnd(event){
    this.value = event.value;
    console.log(this.value);
  }

  onSubmit(){
    const test = {
      degreAvant: this.value
    };
    localStorage.setItem('historique', JSON.stringify(test));
    this.ngZone.run(() => {
      this.router.navigate(['perceptions']);
    });
  }
}
