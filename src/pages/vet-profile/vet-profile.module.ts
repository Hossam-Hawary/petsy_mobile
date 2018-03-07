import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VetProfilePage } from './vet-profile';

@NgModule({
  declarations: [
    VetProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(VetProfilePage),
  ],
})
export class VetProfilePageModule {}
