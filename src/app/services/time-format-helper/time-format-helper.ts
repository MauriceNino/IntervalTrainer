import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimeFormatHelperProvider {
  constructor() {
  }

  public static getCurrentCounterText(currentTime: number, passedSecondsInTimer: number): string {
    return TimeFormatHelperProvider.createTimeStringFromSeconds(currentTime - passedSecondsInTimer);
  }

  public static getNextRythmText(currentTime: number, currentStepPause: boolean, nextStepEnd: boolean): string {
    if (currentStepPause) {
      if (nextStepEnd) {
        return 'Danach: Ende';
      } else {
        return `Danach: ${currentTime}s Aktiv`;
      }
    } else {
      return `Danach: ${currentTime}s Pause`;
    }
  }

  public static createTimeStringFromSeconds(seconds: number): string {
    return `${('0' + Math.floor((seconds) / 60)).slice(-2)}:${('0' + (seconds) % 60).slice(-2)}`;
  }

  public static createCurrentRythmText(currentActiveTime: number, currentPauseTime: number): string {
    return `Aktiv: ${currentActiveTime}s | Pause: ${currentPauseTime}s`;
  }
}
