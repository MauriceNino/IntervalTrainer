import { Component, OnInit } from '@angular/core';
import { HiitProvider } from '../services/hiit/hiit';
import { Plan } from '../services/model';
import { PushProgressProvider } from '../services/push-progress/push-progress';
import { TimeFormatHelperProvider } from '../services/time-format-helper/time-format-helper';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {
  public plansArr: Plan[] = [];
  public currentSelectedId = -1;
  public currentSelectedPlan: Plan;

  public currentRythmText = 'Aktiv: -- | Pause: --';
  public currentCounterText = '--:--';
  public nextRythmText = 'Danach: -- Pause';

  public planPlaying = false;
  public planLocked = false;
  public passedSecondsInTimer = 0;

  // Plan iteration globals for when a timer got started
  // TODO: Export to service
  public timer: any;
  public planIterator: {time: number, isPause: boolean}[] = [];
  public currentStepInPlanIterator = 0;
  public planValid = false;


  constructor(public provider: HiitProvider, public progress: PushProgressProvider) {

  }

  // TODO Find right function, so new lists get loaded without restart
  ionViewWillEnter() {
    this.provider.getPlans().then(data => this.plansArr = data);
  }

  public updateTimersOnPage(): void {
    const currentActiveTime: number = this.getCurrentActiveTime();
    const currentPauseTime: number = this.getCurrentPauseTime();
    const currentStepPause: boolean = this.isCurrentStepPause();

    this.currentRythmText = TimeFormatHelperProvider.createCurrentRythmText(currentActiveTime, currentPauseTime);

    const currentCounterTime = currentStepPause ? currentPauseTime : currentActiveTime;
    this.currentCounterText = TimeFormatHelperProvider.getCurrentCounterText(currentCounterTime, this.passedSecondsInTimer);

    const nextRythmTime = currentStepPause ? currentActiveTime : currentPauseTime;
    this.nextRythmText = TimeFormatHelperProvider.getNextRythmText(nextRythmTime, currentStepPause,
        this.currentStepInPlanIterator >= this.planIterator.length - 1);
  }

  private isCurrentStepPause(): boolean {
    return this.planIterator[this.currentStepInPlanIterator].isPause;
  }

  private getCurrentPauseTime(): number {
    // If the current step in the iteration is a pause, return its time
    if (this.planIterator[this.currentStepInPlanIterator].isPause) {
      return this.planIterator[this.currentStepInPlanIterator].time;
    } else if (this.planIterator.length > this.currentStepInPlanIterator) {
      return this.planIterator[this.currentStepInPlanIterator + 1].time;
    } else {
      return 0;
    }
  }

  private getCurrentActiveTime(): number {
    if (this.planIterator[this.currentStepInPlanIterator].isPause) {
      // TODO: Check if redudndant? If the current step is a Pause, it should be >0 too
      // because the first step (0) is always a Active
      if (this.currentStepInPlanIterator > 0) {
        return this.planIterator[this.currentStepInPlanIterator - 1].time;
      } else {
        return 0;
      }
    } else {
      return this.planIterator[this.currentStepInPlanIterator].time;
    }
  }

  public planSelected(plan: Plan, id: number): void {
    this.makePlanSelected(id, plan);
    this.resetEverythingToDefaults();

    this.checkIfPlanIsValid(plan);

    if (this.isPlanValid()) {
      this.createIteratorFromPlan(plan);
    }

    this.updateTimersOnPage();
  }

  private createIteratorFromPlan(plan: Plan) {
    plan.iterations.forEach(iteration => {
      // For every iteration in the plan, check if the iteration repeats itself
      // -> If so, push it in the iteration the amount of times it repeats
      for (let i = 0; i < iteration.repeats; i++) {
        this.planIterator.push({ time: iteration.active, isPause: false });
        this.planIterator.push({ time: iteration.pause, isPause: true });
      }
    });
  }

  private checkIfPlanIsValid(plan: Plan) {
    // If plan is not empty, it is valid
    if (plan.iterations.length == 0) {
      this.planValid = false;
    } else {
      this.planValid = true;
    }
  }

  private resetEverythingToDefaults() {
    clearInterval(this.timer);
    this.currentStepInPlanIterator = 0;
    this.passedSecondsInTimer = 0;
    this.planPlaying = false;
  }

  private makePlanSelected(id: number, plan: Plan) {
    this.currentSelectedId = id;
    this.currentSelectedPlan = plan;
    this.planIterator = [];
  }

  public playPauseClick(): void {
    if (!this.planLocked) {
      this.planPlaying = !this.planPlaying;

      this.progress.createPushNotification();
      console.log('playPauseClick - create');

      if (this.planPlaying) {
        this.timer = setInterval(() => this.timerJob(), 1000);
      } else {
        clearInterval(this.timer);
      }
    }
  }

  private timerJob(): any {
    this.incrementPassedSecondsInTimer();

    if (this.isCurrentStepInIteratorFinished()) {
      this.incrementStepInPlanIterator();
    } else {
      this.updateTimersOnPage();
      this.progress.updatePushNotification();
      console.log('timerJob - update');
    }
  }

  private incrementStepInPlanIterator() {
    this.passedSecondsInTimer = 0;
    this.currentStepInPlanIterator += 1;

    this.playSound();

    if (this.currentStepInPlanIterator >= this.planIterator.length) {
      this.resetEverythingToDefaults();
      this.setEverythingToEnd();

      this.progress.createPushNotification();
      console.log('incrementStepInPlanIterator - create');
    } else {
      this.updateTimersOnPage();
      this.progress.updatePushNotification();
      console.log('incrementStepInPlanIterator - update');
    }
  }

  private playSound() {
    const audioAsset = new Audio('assets/audio/beep-09.mp3');
    audioAsset.play();
  }

  private setEverythingToEnd() {
    this.currentRythmText = '--';
    this.currentCounterText = 'ENDE';
    this.nextRythmText = '--';
  }

  private isCurrentStepInIteratorFinished() {
    return this.passedSecondsInTimer >= this.planIterator[this.currentStepInPlanIterator].time;
  }

  private incrementPassedSecondsInTimer() {
    this.passedSecondsInTimer += 1;
  }

  public lockClick(): void {
    this.planLocked = !this.planLocked;
  }

  private isPlanValid(): boolean {
    return this.planValid;
  }
  
  ngOnInit() {
  }

}
