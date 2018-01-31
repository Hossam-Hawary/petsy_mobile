import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetListPage } from './pet-list';

@NgModule({
  declarations: [
    PetListPage,
  ],
  imports: [
    IonicPageModule.forChild(PetListPage),
  ],
})
export class PetListPageModule {}
