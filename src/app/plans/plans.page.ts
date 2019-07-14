import { Component, OnInit } from '@angular/core';
import { HiitProvider } from '../services/hiit/hiit';
import { Plan, Iteration } from '../services/model';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { EditPlanPage } from '../edit-plan/edit-plan.page';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  public plansArr: Plan[] = [];

  constructor(public navCtrl: NavController, private provider: HiitProvider, private actionSheet: ActionSheet,
              private modalController: ModalController) {
    this.addTestingStuff()
  }

  ionViewWillEnter() {
    this.provider.getPlans().then(data => this.plansArr = data);
  }

  public openAS(plan: Plan): void {
    const options: ActionSheetOptions = {
      title: 'Edit Plans',
      addCancelButtonWithLabel: 'Cancel',
      addDestructiveButtonWithLabel: 'Delete',
      destructiveButtonLast: true,
      buttonLabels: ['Test 1', 'Test 2']
    }

    this.actionSheet.show(options).then(num => console.log(num));
  }

  public async editPlan(selectedPlan: Plan): Promise<void> {
    const modal = await this.modalController.create({
      component: EditPlanPage,
      componentProps: {allPlans: this.plansArr, plan: selectedPlan}
    });
    return await modal.present();
  }

  public async addPlan(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditPlanPage,
      componentProps: {allPlans: this.plansArr, plan: null}
    });
    return await modal.present();
  }

  public addTestingStuff(): void {
    this.plansArr = [];
    const p: Plan = new Plan();
    p.planName = 'TestPlan1';
    const i: Iteration = new Iteration();
    i.active = 3;
    i.pause = 2;
    i.repeats = 2;
    i.pauseAfter = 20;
    p.iterations.push(i);
    this.plansArr.push(p);
    this.provider.setPlans(this.plansArr);
    console.log(this.plansArr);
  }

  ngOnInit() {
  }

}
