import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetDetailsPage } from './pet-details';

@NgModule({
  declarations: [
    PetDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PetDetailsPage),
  ],
})
export class PetDetailsPageModule {}
