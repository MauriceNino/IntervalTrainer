import { Component, OnInit } from '@angular/core';
import { Plan, Iteration } from '../services/model';
import { NavParams, ActionSheetController, ModalController } from '@ionic/angular';
import { HiitProvider } from '../services/hiit/hiit';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.page.html',
  styleUrls: ['./edit-plan.page.scss'],
})
export class EditPlanPage implements OnInit {
  public plansArr: Plan[] = [];
  public selPlan: Plan = new Plan();
  private add = false;

  constructor(public navParams: NavParams, public modalCtrl: ModalController,
              private provider: HiitProvider, public actionSheetCtrl: ActionSheetController) {
    this.selPlan = this.navParams.get('plan');
    if (this.selPlan === null) {
      this.selPlan = new Plan();
      this.add = true;
    }
    this.plansArr = this.navParams.get('allPlans');
  }

  public delete(iteration: Iteration): void {
    this.selPlan.iterations.splice(this.selPlan.iterations.indexOf(iteration), 1);
    this.provider.setPlans(this.plansArr);
  }

  public addIteration(): void {
    this.selPlan.iterations.push(new Iteration());
  }

  public savePlan(): void {
    if (this.add) { this.plansArr.push(this.selPlan); }
    this.provider.setPlans(this.plansArr);
    this.modalCtrl.dismiss();
  }

  public moveUp(iteration: Iteration): void {
    const index: number = this.selPlan.iterations.indexOf(iteration);
    if (index != 0) {
      this.selPlan.iterations[index] = this.selPlan.iterations[index - 1];
      this.selPlan.iterations[index - 1] = iteration;
    }
  }

  public moveDown(iteration: Iteration): void {
    const index: number = this.selPlan.iterations.indexOf(iteration);
    if (index < this.selPlan.iterations.length - 1) {
      this.selPlan.iterations[index] = this.selPlan.iterations[index + 1];
      this.selPlan.iterations[index + 1] = iteration;
    }
  }

  ngOnInit() {
  }

}
