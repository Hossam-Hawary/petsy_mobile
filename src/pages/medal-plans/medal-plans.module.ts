import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedalPlansPage } from './medal-plans';

@NgModule({
  declarations: [
    MedalPlansPage,
  ],
  imports: [
    IonicPageModule.forChild(MedalPlansPage),
  ],
})
export class MedalPlansPageModule {}
