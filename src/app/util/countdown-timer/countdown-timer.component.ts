import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
  @Input() redirectURL!: string;
  @Input() time!: number;

  dateNow!: Date;
  dDay!: Date;
  private subscription: Subscription = new Subscription;
  public timeDifference!: number;
  timer = "";
  timerColor = "white"

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("Countdown started for " + this.time)
    this.dateNow = new Date();
    this.dDay = new Date(this.dateNow.getTime() + this.time * 60000);
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;


  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    let secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    let minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.timer = `${minutesToDday}`.padStart(2, '0') + ":" + `${secondsToDday}`.padStart(2, '0');
    if (secondsToDday <= 10 && minutesToDday == 0) {
      this.timerColor = "#F93154"
    }
    if (secondsToDday <= 0 && minutesToDday <= 0) {
      this.subscription.unsubscribe();
      this.router.navigateByUrl(this.redirectURL)
    }
  }

}
