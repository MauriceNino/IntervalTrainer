import { Injectable } from '@angular/core';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';

@Injectable({ providedIn: 'root' })
export class PushProgressProvider {

  private counter = 1;
  constructor(private localNotifications: LocalNotifications) {
  }

  public updatePushNotification(): void {
    this.counter++;
    this.localNotifications.get(1).then((notification: ILocalNotification) => {
      notification.text = this.counter + 'x';
      notification.progressBar = { value: this.counter };
      this.localNotifications.update(notification);
    }).catch(error => console.log(error));
  }

  public createPushNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Title',
      text: this.counter + 'x',
      progressBar: { value: this.counter },
      sticky: true
    });
  }
}
