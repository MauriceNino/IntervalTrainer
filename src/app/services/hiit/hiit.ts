import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Plan } from '../model';

@Injectable({ providedIn: 'root' })
export class HiitProvider {

  constructor(private storage: Storage) {

  }

  private plansArr: Plan[] = [];
  private plansLoaded = false;

  public async getPlans(): Promise<Plan[]> {
    if (!this.plansLoaded) {
      this.plansArr = await this.loadPlans();
    }
    if (this.plansArr != null && this.plansArr.length !== 0) {
      return this.plansArr.slice(0);
    } else {
      return [];
    }
  }

  public async setPlans(plans: Plan[]): Promise<void> {
    return this.savePlans(plans);
  }

  private async loadPlans(): Promise<Plan[]> {
    return this.storage.get('plans');
  }

  private async savePlans(plans: Plan[]): Promise<void> {
    return this.storage.set('plans', plans);
  }

}
