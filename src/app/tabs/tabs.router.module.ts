import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ]
      },
      {
        path: 'plans',
        children: [
          {
            path: '',
            loadChildren: '../plans/plans.module#PlansPageModule'
          }
        ]
      },
      {
        path: 'workout',
        children: [
          {
            path: '',
            loadChildren: '../workout/workout.module#WorkoutPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/settings',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/settings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
