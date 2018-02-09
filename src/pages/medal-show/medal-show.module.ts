import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedalShowPage } from './medal-show';

@NgModule({
  declarations: [
    MedalShowPage,
  ],
  imports: [
    IonicPageModule.forChild(MedalShowPage),
  ],
})
export class MedalShowPageModule {}
